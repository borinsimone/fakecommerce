import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { api } from '../services/api';
import './Products.css';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const { addToCart } = useCart();

  const selectedCategory = searchParams.get('category');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [productsData, categoriesData] = await Promise.all([
          selectedCategory
            ? api.getProductsByCategory(selectedCategory)
            : api.getProducts(20),
          api.getCategories(),
        ]);

        setProducts(productsData);
        setCategories(categoriesData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedCategory]);

  const handleCategoryChange = (category) => {
    if (category === 'all') {
      setSearchParams({});
    } else {
      setSearchParams({ category });
    }
  };

  const handleAddToCart = (product) => {
    addToCart(product);
    alert('Product added to cart!');
  };

  if (loading) {
    return <div className='loading'>Loading products...</div>;
  }

  return (
    <div className='products-page'>
      <div className='container'>
        <h1>Products</h1>

        {/* Category Filter */}
        <div className='category-filter'>
          <button
            className={!selectedCategory ? 'active' : ''}
            onClick={() => handleCategoryChange('all')}
          >
            All Categories
          </button>
          {categories.map((category) => (
            <button
              key={category}
              className={selectedCategory === category ? 'active' : ''}
              onClick={() => handleCategoryChange(category)}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className='products-grid'>
          {products.map((product) => (
            <div
              key={product.id}
              className='product-card'
            >
              <Link
                to={`/products/${product.id}`}
                className='product-link'
              >
                <img
                  src={product.image}
                  alt={product.title}
                />
                <div className='product-info'>
                  <h3>{product.title}</h3>
                  <p className='product-description'>{product.description}</p>
                  <div className='product-rating'>
                    {'★'.repeat(Math.floor(product.rating?.rate || 4))}
                    <span>({product.rating?.count || 0})</span>
                  </div>
                </div>
              </Link>
              <div className='product-actions'>
                <span className='product-price'>${product.price}</span>
                <button
                  className='add-to-cart-btn'
                  onClick={() => handleAddToCart(product)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        {products.length === 0 && (
          <div className='no-products'>
            <p>No products found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
