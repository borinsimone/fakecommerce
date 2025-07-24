import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../services/api';
import './Home.css';
import cuffie from '../assets/prodotti/cuffie.png';
import MagicBento from '../components/ui/MagicBento';
import SpotlightCard from '../components/ui/SpotlightCard';
import TiltedCard from '../components/ui/TiltedCard';
const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [products, cats] = await Promise.all([
          api.getProducts(8),
          api.getCategories(),
        ]);

        setFeaturedProducts(products);
        setCategories(cats);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className='loading'>Loading...</div>;
  }

  return (
    <div className='home'>
      {/* Hero Section */}
      <section className='hero'>
        <div className='hero-content'>
          <img
            className='hero-image'
            src={cuffie}
            alt='cuffie wireless'
          />
          <div className='hero-title'>Wireless</div>
          <div className='hero-subtitle'>HEADPHONE</div>
          <Link
            to='/products'
            className='cta-button'
          >
            Shop Now
          </Link>
        </div>
        <div className='description'>
          <h6>Description</h6>
          <p>
            Experience the ultimate in sound quality and comfort with our
            wireless headphones. Perfect for music lovers and audiophiles alike.
          </p>
        </div>
      </section>
      <MagicBento
        textAutoHide={true}
        enableStars={true}
        enableSpotlight={true}
        enableBorderGlow={true}
        enableTilt={true}
        enableMagnetism={true}
        clickEffect={true}
        spotlightRadius={600}
        particleCount={12}
        glowColor='132, 0, 255'
      />

      {/* Features Section */}
      <section className='features-section'>
        <div className='container'>
          <h2>Why Choose Us</h2>
          <p className='section-description'>
            Discover the benefits of shopping with us
          </p>
          <div className='features-grid'>
            <SpotlightCard
              className='custom-spotlight-card'
              spotlightColor='rgb(255, 0, 0)'
            >
              <div className='feature-card'>
                <div className='feature-icon'>
                  <svg
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M20 8L12 13L4 8V6L12 11L20 6V8Z'
                      fill='currentColor'
                    />
                    <path
                      d='M20 6L12 1L4 6V18L12 23L20 18V6Z'
                      stroke='currentColor'
                      strokeWidth='2'
                      fill='none'
                    />
                  </svg>
                </div>
                <h3>Free Shipping</h3>
                <p>
                  Free shipping on all orders over $50. Fast and reliable
                  delivery worldwide.
                </p>
              </div>
            </SpotlightCard>
            <SpotlightCard
              className='custom-spotlight-card'
              spotlightColor='rgba(0, 255, 89, 0.5)'
            >
              <div className='feature-card'>
                <div className='feature-icon'>
                  <svg
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z'
                      fill='currentColor'
                    />
                    <circle
                      cx='12'
                      cy='12'
                      r='10'
                      stroke='currentColor'
                      strokeWidth='2'
                      fill='none'
                    />
                  </svg>
                </div>
                <h3>Money Guarantee</h3>
                <p>
                  100% money back guarantee within 30 days. Your satisfaction is
                  our priority.
                </p>
              </div>
            </SpotlightCard>
            <SpotlightCard
              className='custom-spotlight-card'
              spotlightColor='rgba(0, 98, 255, 0.5)'
            >
              <div className='feature-card'>
                <div className='feature-icon'>
                  <svg
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M21 15.9999V7.9999C21 6.8999 20.1 5.9999 19 5.9999H5C3.9 5.9999 3 6.8999 3 7.9999V15.9999C3 17.0999 3.9 17.9999 5 17.9999H19C20.1 17.9999 21 17.0999 21 15.9999Z'
                      stroke='currentColor'
                      strokeWidth='2'
                      fill='none'
                    />
                    <path
                      d='M7 9L12 12L17 9'
                      stroke='currentColor'
                      strokeWidth='2'
                      fill='none'
                    />
                  </svg>
                </div>
                <h3>Online Support 24/7</h3>
                <p>
                  Round-the-clock customer support. We're here to help you
                  anytime, anywhere.
                </p>
              </div>
            </SpotlightCard>
            <SpotlightCard
              className='custom-spotlight-card'
              spotlightColor='rgb(221, 255, 0)'
            >
              <div className='feature-card'>
                <div className='feature-icon'>
                  <svg
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <rect
                      x='3'
                      y='4'
                      width='18'
                      height='12'
                      rx='2'
                      stroke='currentColor'
                      strokeWidth='2'
                      fill='none'
                    />
                    <path
                      d='M7 8H17'
                      stroke='currentColor'
                      strokeWidth='2'
                    />
                    <path
                      d='M7 12H13'
                      stroke='currentColor'
                      strokeWidth='2'
                    />
                  </svg>
                </div>
                <h3>Secure Payment</h3>
                <p>
                  Your payment information is protected with bank-level security
                  encryption.
                </p>
              </div>
            </SpotlightCard>
          </div>
        </div>
      </section>
      {/* Sales Banner Section */}
      <section className='sales-banner'>
        <div className='left'>
          <div className='subtext'>20% off</div>
          <div className='main'>
            first <br /> order
          </div>
          <div className='subtext'>Use code: FIRST20</div>
        </div>
        <img
          src={cuffie}
          alt=''
        />
        <div className='right'>
          <div className='subtext'>june - september</div>
          <div className='main'>summer sale</div>
          <div className='description'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores,
            ullam?
          </div>
          <Link
            to='/products'
            className='cta-button'
          >
            Shop Now
          </Link>
        </div>
      </section>
      {/* Best Seller Section */}
      <section className='bestseller'>
        <div className='header'>
          <div className='title'>best seller products</div>
          <div className='subtitle'>
            Discover our most popular products loved by customers worldwide.
          </div>
        </div>
        <div className='products-grid'>
          {featuredProducts.map((product) => (
            <div
              key={product.id}
              className='product-card'
            >
              <Link to={`/products/${product.id}`}>
                <img
                  src={product.image}
                  alt={product.title}
                />

                <div className='product-info'>
                  <h3>{product.title}</h3>
                  <p className='product-price'>${product.price}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </section>
      {/* Categories Section */}
      <section className='categories-section'>
        <div className='container'>
          <h2>Shop by Category</h2>
          <div className='categories-grid'>
            {categories.map((category) => (
              <Link
                key={category}
                to={`/products?category=${category}`}
                className='category-card'
              >
                <h3>{category.charAt(0).toUpperCase() + category.slice(1)}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
