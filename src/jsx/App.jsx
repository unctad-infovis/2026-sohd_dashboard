import { useEffect, useRef } from 'react';

import Article from '../Article.mdx';

// Storyboard
import Dashboard from './components/dashboard/Dashboard.jsx';

import '@unctad-infovis/general-tools/styles/styles.css';
import './App.css';

const components = {
  Dashboard
};

const App = ({ meta }) => {
  const appRef = useRef();

  useEffect(() => {
    const elements = appRef.current.querySelectorAll('.slide_content p, .slide_content ul, .slide_content ol, .slide_content h3, .slide_content blockquote');
    // Options for the observer (when the p tag is 50% in the viewport)
    const options = {
      threshold: 0.5 // Trigger when 50% of the paragraph is visible
    };
    // Callback function for when the intersection occurs
    const observerCallback = entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Add the visible class when the element is in view
          entry.target.classList.add('visible');
        }
      });
    };
    // Create an IntersectionObserver instance with the callback and options
    const observer = new IntersectionObserver(observerCallback, options);
    // Observe each paragraph
    for (const el of elements) {
      observer.observe(el);
    }
    setTimeout(() => {
      window.dispatchEvent(new Event('scroll'));
    }, 500); // A short delay ensures the DOM is ready
  }, []);

  window.appRef = appRef;

  return (
    <div
      className="app"
      style={
        {
          // '--main-color': 'var(--un-color-green-dark)',
          // '--secondary-color': 'var(--un-color-green-text)'
        }
      }
      ref={appRef}
    >
      <Article components={components} meta={meta} />
    </div>
  );
};

export default App;
