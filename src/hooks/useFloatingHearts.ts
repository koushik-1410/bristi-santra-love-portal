
import { useState } from 'react';

export type addFloatingHeartType = () => void;

export const useFloatingHearts = () => {
  const [hearts, setHearts] = useState<Array<{ id: number; style: React.CSSProperties }>>([]);

  const addFloatingHeart = () => {
    const id = Date.now();
    const size = 20 + Math.random() * 30;
    const duration = 3 + Math.random() * 3;
    const left = Math.random() * 100;
    
    const newHeart = {
      id,
      style: {
        fontSize: `${size}px`,
        left: `${left}%`,
        animationDuration: `${duration}s`,
        top: '100%'
      }
    };
    
    setHearts(prevHearts => [...prevHearts, newHeart]);
    
    // Remove heart after animation completes
    setTimeout(() => {
      setHearts(prevHearts => prevHearts.filter(heart => heart.id !== id));
    }, duration * 1000);
  };

  return { hearts, addFloatingHeart };
};
