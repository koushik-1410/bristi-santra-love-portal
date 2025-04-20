
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { HeartIcon } from "lucide-react";

const GenericMessage: React.FC = () => {
  const [showMessage, setShowMessage] = useState(false);
  const [hearts, setHearts] = useState<Array<{ id: number; style: React.CSSProperties }>>([]);
  
  const addHeart = () => {
    const id = Date.now();
    const left = Math.random() * 100;
    const top = Math.random() * 100;
    const size = 10 + Math.random() * 10;
    const opacity = 0.2 + Math.random() * 0.3;
    
    const style = {
      left: `${left}%`,
      top: `${top}%`,
      fontSize: `${size}px`,
      opacity
    };

    setHearts(prev => [...prev, { id, style }]);
    
    // Clean up after animation
    setTimeout(() => {
      setHearts(prev => prev.filter(heart => heart.id !== id));
    }, 5000);
  };

  // Animate entrance
  useEffect(() => {
    // Generate some background hearts
    for (let i = 0; i < 10; i++) {
      setTimeout(() => addHeart(), i * 300);
    }

    // Show welcome message with delay
    setTimeout(() => {
      setShowMessage(true);
    }, 500);

    // Periodically add hearts
    const heartInterval = setInterval(() => {
      addHeart();
    }, 2000);
    
    return () => clearInterval(heartInterval);
  }, []);

  return (
    <div 
      className="min-h-screen relative overflow-hidden flex flex-col items-center justify-center p-4"
      style={{
        background: "linear-gradient(150deg, #F5F0FF 0%, #FFECEF 100%)"
      }}
    >
      {/* Background hearts */}
      {hearts.map(heart => (
        <div 
          key={heart.id} 
          className="absolute text-love-300" 
          style={heart.style}
        >
          ❤️
        </div>
      ))}
      
      {/* Main content */}
      <div className={`love-card max-w-lg transition-all duration-1000 ${showMessage ? 'scale-100 opacity-100' : 'scale-90 opacity-0'}`}>
        <div className="text-center space-y-6">
          <HeartIcon className="h-12 w-12 text-love-500 mx-auto mb-4" />
          
          <h2 className="text-3xl font-bold text-romantic-800">
            Thank You for Signing Up!
          </h2>
          
          <p className="text-lg text-romantic-700">
            We appreciate you joining our community. Stay tuned for updates and special messages.
          </p>
          
          <div className="pt-4">
            <Button 
              onClick={() => window.location.href = "/"} 
              className="love-btn"
            >
              Back to Home
            </Button>
          </div>
        </div>
      </div>
      
      <p className="mt-8 text-sm text-romantic-500 max-w-md text-center">
        This is a special website created with love. If you're looking for a personalized message, 
        please make sure you've signed up with the correct information.
      </p>
    </div>
  );
};

export default GenericMessage;
