import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';

const PageTransition = ({ children }) => {
  const location = useLocation();

  const pageVariants = {
    initial: {
      opacity: 0,
      y: 50,
      scale: 0.98,
    },
    in: {
      opacity: 1,
      y: 0,
      scale: 1,
    },
    out: {
      opacity: 0,
      y: -50,
      scale: 1.02,
    },
  };

  const pageTransition = {
    type: 'tween',
    ease: 'anticipate',
    duration: 0.6,
  };

  const fadeVariants = {
    initial: {
      opacity: 0,
      filter: 'blur(10px)',
    },
    in: {
      opacity: 1,
      filter: 'blur(0px)',
    },
    out: {
      opacity: 0,
      filter: 'blur(10px)',
    },
  };

  const slideVariants = {
    initial: {
      x: 100,
      opacity: 0,
    },
    in: {
      x: 0,
      opacity: 1,
    },
    out: {
      x: -100,
      opacity: 0,
    },
  };

  // Sceglie l'animazione in base alla route
  const getAnimationVariants = (pathname) => {
    switch (pathname) {
      case '/':
        return pageVariants;
      case '/products':
        return slideVariants;
      case '/categories':
        return fadeVariants;
      case '/cart':
        return slideVariants;
      case '/login':
        return fadeVariants;
      default:
        return pageVariants;
    }
  };

  const variants = getAnimationVariants(location.pathname);

  return (
    <motion.div
      key={location.pathname}
      initial='initial'
      animate='in'
      exit='out'
      variants={variants}
      transition={pageTransition}
      style={{
        width: '100%',
        minHeight: '100vh',
      }}
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
