import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {

  window.scrollTo(0, 0);
  useEffect(() => {
    console.log('top');
    
  }, []);

  return null; // Ce composant ne rend rien
};

export default ScrollToTop;
