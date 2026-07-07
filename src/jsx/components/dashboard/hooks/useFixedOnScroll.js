import { useEffect, useState } from 'react';

function useFixedOnScroll(ref, offset = 0) {
  const [isFixed, setIsFixed] = useState(false);

  useEffect(() => {
    const updateFixedState = () => {
      if (!ref.current) {
        setIsFixed(false);
        return;
      }

      setIsFixed(window.scrollY > ref.current.offsetTop + offset);
    };

    updateFixedState();
    window.addEventListener('scroll', updateFixedState);
    window.addEventListener('resize', updateFixedState);

    return () => {
      window.removeEventListener('scroll', updateFixedState);
      window.removeEventListener('resize', updateFixedState);
    };
  }, [offset, ref]);

  return isFixed;
}

export default useFixedOnScroll;
