import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { api } from '../services/api';
import SpotlightCard from '../components/ui/SpotlightCard';
import TiltedCard from '../components/ui/TiltedCard';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    const fetchProductData = async () => {
      setLoading(true);
      try {
        const productData = await api.getProduct(id);
        setProduct(productData);

        // Fetch related products from the same category
        if (productData?.category) {
          const categoryProducts = await api.getProductsByCategory(
            productData.category
          );
          const filtered = categoryProducts.filter(
            (p) => p.id !== parseInt(id)
          );
          setRelatedProducts(filtered.slice(0, 4));
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProductData();
    }
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      for (let i = 0; i < quantity; i++) {
        addToCart(product);
      }
      alert(`${quantity} ${quantity === 1 ? 'item' : 'items'} added to cart!`);
    }
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate('/cart');
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <span
          key={i}
          className='star filled'
        >
          ★
        </span>
      );
    }

    if (hasHalfStar) {
      stars.push(
        <span
          key='half'
          className='star half'
        >
          ★
        </span>
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <span
          key={`empty-${i}`}
          className='star empty'
        >
          ★
        </span>
      );
    }

    return stars;
  };

  if (loading) {
    return <div className='loading'>Loading product...</div>;
  }

  if (!product) {
    return (
      <div className='error-container'>
        <h2>Product not found</h2>
        <Link
          to='/products'
          className='back-link'
        >
          ← Back to Products
        </Link>
      </div>
    );
  }

  return (
    <div className='product-detail-page'>
      <div className='container'>
        {/* Breadcrumb */}
        <nav className='breadcrumb'>
          <Link to='/'>Home</Link>
          <span>/</span>
          <Link to='/products'>Products</Link>
          <span>/</span>
          <Link to={`/products?category=${product.category}`}>
            {product.category}
          </Link>
          <span>/</span>
          <span>{product.title}</span>
        </nav>

        {/* Product Main Section */}
        <div className='product-main'>
          <div className='product-images'>
            <div className='main-image-card'>
              <div className='main-image'>
                <img
                  src={product.image}
                  alt={product.title}
                  onError={(e) => {
                    e.target.src = '/placeholder-image.jpg';
                  }}
                />
              </div>
            </div>

            {/* Thumbnail images (for future multiple images) */}
            <div className='thumbnail-images'>
              <div
                className={`thumbnail ${selectedImage === 0 ? 'active' : ''}`}
                onClick={() => setSelectedImage(0)}
              >
                <img
                  src={product.image}
                  alt={product.title}
                />
              </div>
            </div>
          </div>

          <div className='product-info'>
            <div className='product-header'>
              <h1>{product.title}</h1>
              <div className='product-rating'>
                <div className='stars'>
                  {renderStars(product.rating?.rate || 4)}
                </div>
                <span className='rating-text'>
                  {product.rating?.rate} ({product.rating?.count} reviews)
                </span>
              </div>
            </div>

            <div className='product-price'>
              <span className='current-price'>${product.price}</span>
              <span className='original-price'>
                ${(product.price * 1.2).toFixed(2)}
              </span>
              <span className='discount'>17% OFF</span>
            </div>

            <div className='product-description'>
              <h3>Description</h3>
              <p>{product.description}</p>
            </div>

            <div className='product-category'>
              <span className='category-label'>Category:</span>
              <Link
                to={`/products?category=${product.category}`}
                className='category-link'
              >
                {product.category}
              </Link>
            </div>

            <div className='product-actions'>
              <div className='quantity-selector'>
                <label>Quantity:</label>
                <div className='quantity-controls'>
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    -
                  </button>
                  <span>{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)}>+</button>
                </div>
              </div>

              <div className='action-buttons'>
                <button
                  className='add-to-cart-btn'
                  onClick={handleAddToCart}
                >
                  Add to Cart
                </button>
                <button
                  className='buy-now-btn'
                  onClick={handleBuyNow}
                >
                  Buy Now
                </button>
              </div>
            </div>

            {/* Product Features */}
            <div className='product-features'>
              <div className='feature'>
                <div className='feature-icon'>
                  <svg
                    width='20'
                    height='20'
                    viewBox='0 0 24 24'
                    fill='currentColor'
                  >
                    <path d='M20 8L12 13L4 8V6L12 11L20 6V8Z' />
                  </svg>
                </div>
                <span>Free Shipping</span>
              </div>
              <div className='feature'>
                <div className='feature-icon'>
                  <svg
                    width='20'
                    height='20'
                    viewBox='0 0 24 24'
                    fill='currentColor'
                  >
                    <path d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z' />
                  </svg>
                </div>
                <span>30-Day Returns</span>
              </div>
              <div className='feature'>
                <div className='feature-icon'>
                  <svg
                    width='20'
                    height='20'
                    viewBox='0 0 24 24'
                    fill='currentColor'
                  >
                    <path d='M21 16H3V4h18m0-2H3c-1.11 0-2 .89-2 2v12a2 2 0 0 0 2 2h7l-2 3v1h8v-1l-2-3h7a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2z' />
                  </svg>
                </div>
                <span>Warranty Included</span>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className='related-products'>
            <h2>Related Products</h2>
            <div className='related-products-grid'>
              {relatedProducts.map((relatedProduct) => (
                <SpotlightCard
                  key={relatedProduct.id}
                  className='related-product-card'
                  spotlightColor='rgba(102, 126, 234, 0.3)'
                >
                  <Link
                    to={`/products/${relatedProduct.id}`}
                    className='related-product-link'
                  >
                    <div className='related-product-image'>
                      <img
                        src={relatedProduct.image}
                        alt={relatedProduct.title}
                      />
                    </div>
                    <div className='related-product-info'>
                      <h4>{relatedProduct.title}</h4>
                      <div className='related-product-rating'>
                        {renderStars(relatedProduct.rating?.rate || 4)}
                      </div>
                      <p className='related-product-price'>
                        ${relatedProduct.price}
                      </p>
                    </div>
                  </Link>
                </SpotlightCard>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
