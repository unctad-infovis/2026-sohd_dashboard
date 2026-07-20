import { useEffect, useState } from 'react';

function useCardIndicatorMini({ activeSection, items, appSelector, breakpoint = 768 }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const activeItem = items.find(item => item.section === activeSection);
    let frameId;

    const updateVisibility = () => {
      if (!activeItem || window.innerWidth > breakpoint) {
        setIsVisible(false);
        return;
      }

      const activeHeader = document.querySelector(`${appSelector} ${activeItem.tabClass} .detail-header`);

      setIsVisible(Boolean(activeHeader) && activeHeader.getBoundingClientRect().bottom <= 0);
    };

    const requestUpdate = () => {
      window.cancelAnimationFrame(frameId);
      frameId = window.requestAnimationFrame(updateVisibility);
    };

    updateVisibility();
    window.addEventListener('scroll', requestUpdate);
    window.addEventListener('resize', requestUpdate);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
    };
  }, [activeSection, appSelector, breakpoint, items]);

  return isVisible;
}

export default useCardIndicatorMini;
