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
      {/* <section className='categories-section'>
        <div className='header'>
          <div className='title'>Shop by Category</div>
          <div className='subtitle'>
            Discover our wide range of products organized by categories
          </div>
        </div>
        <div className='categories-grid'>
          {categories.map((category) => (
            <Link
              key={category}
              to={`/products?category=${category}`}
              className='category-card'
            >
              <div className='category-icon'>
                {category === 'electronics' && '📱'}
                {category === 'jewelery' && '💎'}
                {category === "men's clothing" && '👔'}
                {category === "women's clothing" && '👗'}
              </div>
              <h3>{category.charAt(0).toUpperCase() + category.slice(1)}</h3>
              <p>Explore our collection</p>
            </Link>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <Link
            to='/categories'
            className='cta-button'
            style={{ backgroundColor: '#667eea', textDecoration: 'none' }}
          >
            View All Categories
          </Link>
        </div>
      </section> */}
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
      {/* Footer */}
      <footer className='footer'>
        <div className='footer-content'>
          <div className='footer-section'>
            <h3>FakeCommerce</h3>
            <p>
              Your trusted destination for quality products and exceptional
              service. We bring you the best deals with fast, reliable delivery.
            </p>
            <div className='social-links'>
              <a
                href='#'
                aria-label='Facebook'
              >
                <svg
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  fill='currentColor'
                >
                  <path d='M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' />
                </svg>
              </a>
              <a
                href='#'
                aria-label='Twitter'
              >
                <svg
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  fill='currentColor'
                >
                  <path d='M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z' />
                </svg>
              </a>
              <a
                href='#'
                aria-label='Instagram'
              >
                <svg
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  fill='currentColor'
                >
                  <path d='M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z' />
                </svg>
              </a>
            </div>
          </div>

          <div className='footer-section'>
            <h4>Quick Links</h4>
            <ul>
              <li>
                <Link to='/'>Home</Link>
              </li>
              <li>
                <Link to='/products'>Products</Link>
              </li>
              <li>
                <Link to='/cart'>Cart</Link>
              </li>
              <li>
                <Link to='/login'>Account</Link>
              </li>
            </ul>
          </div>

          <div className='footer-section'>
            <h4>Customer Service</h4>
            <ul>
              <li>
                <a href='#'>Contact Us</a>
              </li>
              <li>
                <a href='#'>FAQ</a>
              </li>
              <li>
                <a href='#'>Shipping Info</a>
              </li>
              <li>
                <a href='#'>Returns</a>
              </li>
              <li>
                <a href='#'>Size Guide</a>
              </li>
            </ul>
          </div>

          <div className='footer-section'>
            {/* <h4>Newsletter</h4>
              <p>Stay updated with our latest offers and products</p>
              <div className='newsletter'>
                <input
                  type='email'
                  placeholder='Enter your email'
                />
                <button className='newsletter-btn'>Subscribe</button>
              </div> */}
            <div className='payment-methods'>
              <span>We accept:</span>
              <div className='payment-icons'>
                <svg
                  width='32'
                  height='20'
                  viewBox='0 0 32 20'
                  fill='none'
                >
                  <rect
                    width='32'
                    height='20'
                    rx='4'
                    fill='#1A1F71'
                  />
                  <text
                    x='16'
                    y='14'
                    textAnchor='middle'
                    fill='white'
                    fontSize='8'
                    fontWeight='bold'
                  >
                    VISA
                  </text>
                </svg>
                <svg
                  width='32'
                  height='20'
                  viewBox='0 0 32 20'
                  fill='none'
                >
                  <rect
                    width='32'
                    height='20'
                    rx='4'
                    fill='#EB001B'
                  />
                  <circle
                    cx='12'
                    cy='10'
                    r='6'
                    fill='#EB001B'
                  />
                  <circle
                    cx='20'
                    cy='10'
                    r='6'
                    fill='#FF5F00'
                  />
                </svg>
                <svg
                  width='32'
                  height='20'
                  viewBox='0 0 32 20'
                  fill='none'
                >
                  <rect
                    width='32'
                    height='20'
                    rx='4'
                    fill='#0070BA'
                  />
                  <text
                    x='16'
                    y='14'
                    textAnchor='middle'
                    fill='white'
                    fontSize='6'
                    fontWeight='bold'
                  >
                    PayPal
                  </text>
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className='footer-bottom'>
          <div className='footer-bottom-content'>
            <p>&copy; 2024 FakeCommerce. All rights reserved.</p>
            <div className='footer-links'>
              <a href='#'>Privacy Policy</a>
              <a href='#'>Terms of Service</a>
              <a href='#'>Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
