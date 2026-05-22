import { useEffect, useState } from 'react';

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e) => {
      if (
        e.target.tagName.toLowerCase() === 'a' ||
        e.target.tagName.toLowerCase() === 'button' ||
        e.target.closest('a') ||
        e.target.closest('button') ||
        e.target.classList.contains('cursor-pointer')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', updateMousePosition);
    document.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <>
      <div
        className="fixed top-0 left-0 w-2 h-2 bg-accent-primary rounded-full pointer-events-none z-[9999] transition-transform duration-100 ease-out"
        style={{
          transform: `translate3d(${mousePosition.x - 4}px, ${mousePosition.y - 4}px, 0)`,
        }}
      />
      <div
        className={`fixed top-0 left-0 rounded-full border border-accent-primary pointer-events-none z-[9998] transition-all duration-300 ease-out ${
          isHovering ? 'w-12 h-12 shadow-glow-sm bg-[rgba(0,217,255,0.1)]' : 'w-8 h-8'
        }`}
        style={{
          transform: `translate3d(${mousePosition.x - (isHovering ? 24 : 16)}px, ${
            mousePosition.y - (isHovering ? 24 : 16)
          }px, 0)`,
        }}
      />
    </>
  );
};

export default CustomCursor;
