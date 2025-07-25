import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../services/api';
import SpotlightCard from '../components/ui/SpotlightCard';
import './Categories.css';

const Categories = () => {
  const [categoriesWithProducts, setCategoriesWithProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategoriesData = async () => {
      try {
        const categoriesData = await api.getCategories();

        // Fetch sample products for each category to show preview
        const categoriesWithPreview = await Promise.all(
          categoriesData.map(async (category) => {
            const products = await api.getProductsByCategory(category);
            return {
              name: category,
              products: products.slice(0, 3), // Get first 3 products for preview
              totalProducts: products.length,
            };
          })
        );

        setCategoriesWithProducts(categoriesWithPreview);
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoriesData();
  }, []);

  const getCategoryIcon = (category) => {
    const icons = {
      electronics: (
        <svg
          width='48'
          height='48'
          viewBox='0 0 24 24'
          fill='currentColor'
        >
          <path d='M21 16H3V4h18m0-2H3c-1.11 0-2 .89-2 2v12a2 2 0 0 0 2 2h7l-2 3v1h8v-1l-2-3h7a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2z' />
        </svg>
      ),
      jewelery: (
        <svg
          width='48'
          height='48'
          viewBox='0 0 24 24'
          fill='currentColor'
        >
          <path d='M5 16L3 5h5.5l1.5 5 1.5-5H17l-2 11H5zm5.5-11L9 8l-1.5-3H5.5z' />
        </svg>
      ),
      "men's clothing": (
        <svg
          width='48'
          height='48'
          viewBox='0 0 24 24'
          fill='currentColor'
        >
          <path d='M12 2c-4.97 0-9 4.03-9 9 0 4.17 2.84 7.67 6.69 8.69L12 22l2.31-2.31C18.16 18.67 21 15.17 21 11c0-4.97-4.03-9-9-9zm0 2c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3z' />
        </svg>
      ),
      "women's clothing": (
        <svg
          width='48'
          height='48'
          viewBox='0 0 24 24'
          fill='currentColor'
        >
          <path d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z' />
        </svg>
      ),
    };
    return (
      icons[category] || (
        <svg
          width='48'
          height='48'
          viewBox='0 0 24 24'
          fill='currentColor'
        >
          <path d='M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z' />
        </svg>
      )
    );
  };

  const formatCategoryName = (category) => {
    return category
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  if (loading) {
    return <div className='loading'>Loading categories...</div>;
  }

  return (
    <div className='categories-page'>
      <div className='container'>
        <div className='page-header'>
          <h1>Shop by Categories</h1>
          <p>Discover our wide range of products organized by categories</p>
        </div>

        <div className='categories-grid'>
          {categoriesWithProducts.map((categoryData, index) => (
            <SpotlightCard
              key={categoryData.name}
              className='category-spotlight-card'
              spotlightColor={`hsl(${index * 90}, 70%, 50%)`}
            >
              <div className='category-card'>
                <Link
                  to={`/products?category=${categoryData.name}`}
                  className='category-link'
                >
                  <div className='category-header'>
                    <div className='category-icon'>
                      {getCategoryIcon(categoryData.name)}
                    </div>
                    <h2>{formatCategoryName(categoryData.name)}</h2>
                    <p className='category-count'>
                      {categoryData.totalProducts} products available
                    </p>
                  </div>

                  <div className='category-preview'>
                    <div className='preview-products'>
                      {categoryData.products.slice(0, 2).map((product) => (
                        <Link
                          key={product.id}
                          to={`/products/${product.id}`}
                          className='preview-product-link'
                          onClick={(e) => e.stopPropagation()}
                        >
                          <div className='preview-product'>
                            <img
                              src={product.image}
                              alt={product.title}
                            />
                            <div className='preview-product-overlay'>
                              <span className='preview-product-title'>
                                {product.title}
                              </span>
                              <span className='preview-product-price'>
                                ${product.price}
                              </span>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                    {categoryData.products.length > 2 && (
                      <div className='more-indicator'>
                        +{categoryData.totalProducts - 2} more
                      </div>
                    )}
                  </div>

                  <div className='category-cta'>
                    <span>Explore Collection</span>
                    <svg
                      width='20'
                      height='20'
                      viewBox='0 0 24 24'
                      fill='currentColor'
                    >
                      <path d='M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z' />
                    </svg>
                  </div>
                </Link>
              </div>
            </SpotlightCard>
          ))}
        </div>

        {/* Featured Categories Banner */}
        <div className='featured-banner'>
          <h2>Why Choose Our Categories?</h2>
          <div className='features-list'>
            <div className='feature-item'>
              <div className='feature-icon'>
                <svg
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  fill='currentColor'
                >
                  <path d='M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z' />
                </svg>
              </div>
              <div>
                <h4>Quality Assured</h4>
                <p>All products are carefully curated for quality</p>
              </div>
            </div>
            <div className='feature-item'>
              <div className='feature-icon'>
                <svg
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  fill='currentColor'
                >
                  <path d='M20 8L12 13L4 8V6L12 11L20 6V8Z' />
                </svg>
              </div>
              <div>
                <h4>Fast Shipping</h4>
                <p>Quick delivery on all category items</p>
              </div>
            </div>
            <div className='feature-item'>
              <div className='feature-icon'>
                <svg
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  fill='currentColor'
                >
                  <path d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z' />
                </svg>
              </div>
              <div>
                <h4>Best Prices</h4>
                <p>Competitive pricing across all categories</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;
