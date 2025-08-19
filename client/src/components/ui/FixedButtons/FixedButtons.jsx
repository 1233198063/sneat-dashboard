import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import './FixedButtons.less';

const FixedButtons = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Show/hide scroll to top button based on scroll position
  useEffect(() => {
    const handleScroll = (event) => {
      // Get the correct scroll container
      const scrollContainer = event.target || document.querySelector('.layout-content');
      const scrollY = scrollContainer?.scrollTop || 0;
      const shouldShow = scrollY > 50;
      setShowScrollTop(shouldShow);
    };

    // Listen to scroll events on the layout-content container
    const scrollContainer = document.querySelector('.layout-content');
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll, { passive: true });
      
      // Check initial scroll position immediately
      handleScroll({ target: scrollContainer });
    }
    
    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    const scrollContainer = document.querySelector('.layout-content');
    if (scrollContainer) {
      scrollContainer.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    } else {
      // Fallback option
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="fixed-buttons">
      <button className="fixed-buy-now-btn">BUY NOW</button>
      <button 
        className={`scroll-to-top-btn ${showScrollTop ? 'visible' : 'hidden'}`}
        onClick={scrollToTop}
        aria-label="Scroll to top"
        style={{ 
          opacity: showScrollTop ? 1 : 0,
          pointerEvents: showScrollTop ? 'auto' : 'none',
          transform: showScrollTop ? 'scale(1)' : 'scale(0.8)'
        }}
      >
        <ArrowUp size={20} />
      </button>
    </div>
  );
};

export default FixedButtons;