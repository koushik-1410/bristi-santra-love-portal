
import { useState } from "react";

interface FloatingHeart {
  id: number;
  style: React.CSSProperties;
}

export const useFloatingHearts = () => {
  const [hearts, setHearts] = useState<FloatingHeart[]>([]);

  const addFloatingHeart = () => {
    const id = Date.now();
    const left = Math.random() * 100;
    const delay = Math.random() * 2;
    const size = 20 + Math.random() * 20;
    
    const style = {
      left: `${left}%`,
      animationDelay: `${delay}s`,
      fontSize: `${size}px`,
      top: '100%'
    };

    setHearts(prev => [...prev, { id, style }]);
    
    setTimeout(() => {
      setHearts(prev => prev.filter(heart => heart.id !== id));
    }, 5000);
  };

  return {
    hearts,
    addFloatingHeart
  };
};
