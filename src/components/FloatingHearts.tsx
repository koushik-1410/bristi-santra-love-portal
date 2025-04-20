
import React from 'react';

interface FloatingHeartsProps {
  hearts: Array<{
    id: number;
    style: React.CSSProperties;
  }>;
}

const FloatingHearts: React.FC<FloatingHeartsProps> = ({ hearts }) => {
  return (
    <>
      {hearts.map(heart => (
        <div 
          key={heart.id} 
          className="floating-heart absolute animate-float" 
          style={heart.style}
        >
          ❤️
        </div>
      ))}
    </>
  );
};

export default FloatingHearts;
