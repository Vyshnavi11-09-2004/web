import React, { useRef, useEffect } from 'react';

const Header = () => {
  const headerRef = useRef(null);

  const stickyHeaderFunc = () => {
    if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
      headerRef.current.classList.add('sticky');
    } else {
      headerRef.current.classList.remove('sticky');
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      stickyHeaderFunc();
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header ref={headerRef}>
    {/* Your header content */}
 
    </header>
  );
};

export default Header;
