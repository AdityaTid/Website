/**
 * AYURRARTH - Main Application Entry Point
 * Modular architecture for better maintainability and scalability
 * 
 * @author Professional Development Team
 * @version 2.0.0
 */

import { Header } from './modules/header.js';
import { HeroSlideshow } from './modules/hero.js';
import { Animations } from './modules/animations.js';
import { Media } from './modules/media.js';
import { Navigation } from './modules/navigation.js';

/**
 * Application initialization
 * Loads all modules and initializes features
 */
const App = (() => {
  const init = () => {
    console.log('🚀 AYURRARTH App Initializing...');

    try {
      Header.init();
      HeroSlideshow.init();
      Animations.init();
      Media.init();
      Navigation.init();

      console.log('✅ All modules initialized successfully');
    } catch (error) {
      console.error('❌ Error initializing application:', error);
    }
  };

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  return { init };
})();
