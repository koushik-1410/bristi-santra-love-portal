import React, { useState } from "react";
import SignupForm from "@/components/SignupForm";
import PasswordForm from "@/components/PasswordForm";
import Celebration from "@/pages/Celebration";
import GenericMessage from "@/pages/GenericMessage";
import { HeartIcon } from "lucide-react";

// Updated core date to unlock the special message
const CORRECT_PASSWORD = "15102024"; // The date you proposed her

const Index = () => {
  const [stage, setStage] = useState<'signup' | 'password' | 'celebration' | 'generic'>('signup');
  const [formData, setFormData] = useState<any>(null);
  const [hearts, setHearts] = useState<Array<{ id: number; style: React.CSSProperties }>>([]);

  const addHeart = () => {
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
    
    // Clean up after animation
    setTimeout(() => {
      setHearts(prev => prev.filter(heart => heart.id !== id));
    }, 5000);
  };

  // Handle signup form submission
  const handleSignupSuccess = (values: any) => {
    setFormData(values);
    
    // Add floating hearts
    for (let i = 0; i < 10; i++) {
      setTimeout(() => addHeart(), i * 200);
    }
    
    // Check if this is the special user
    if (values.isSpecial) {
      setStage('password');
    } else {
      setStage('generic');
    }
  };

  // Handle password form submission
  const handlePasswordSuccess = () => {
    // Add a burst of hearts
    for (let i = 0; i < 20; i++) {
      setTimeout(() => addHeart(), i * 100);
    }
    setStage('celebration');
  };

  const handlePasswordFail = () => {
    setStage('generic');
  };

  // Render the appropriate content based on current stage
  const renderContent = () => {
    switch (stage) {
      case 'signup':
        return <SignupForm onSuccess={handleSignupSuccess} />;
      case 'password':
        return (
          <PasswordForm 
            onSuccess={handlePasswordSuccess} 
            onFail={handlePasswordFail}
            correctPassword={CORRECT_PASSWORD}
          />
        );
      case 'celebration':
        return <Celebration />;
      case 'generic':
        return <GenericMessage />;
      default:
        return <SignupForm onSuccess={handleSignupSuccess} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Only show header on signup and password screens */}
      {(stage === 'signup' || stage === 'password') && (
        <header className="py-6 px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-romantic-800 font-playfair flex items-center justify-center gap-3">
            <HeartIcon className="h-10 w-10 text-love-500 animate-pulse-gentle" />
            <span className="bg-gradient-to-r from-romantic-600 to-love-600 bg-clip-text text-transparent">
              Love Portal
            </span>
            <HeartIcon className="h-10 w-10 text-love-500 animate-pulse-gentle" />
          </h1>
          <p className="mt-3 text-lg text-romantic-600 max-w-md mx-auto">
            A special place where love and memories come together. Sign up to experience the magic.
          </p>
        </header>
      )}

      {/* Animated floating hearts */}
      {hearts.map(heart => (
        <div 
          key={heart.id} 
          className="floating-heart absolute animate-float" 
          style={heart.style}
        >
          ❤️
        </div>
      ))}

      {/* Main content container */}
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {renderContent()}
        </div>
      </main>

      {/* Only show footer on signup and password screens */}
      {(stage === 'signup' || stage === 'password') && (
        <footer className="py-4 text-center text-romantic-500 text-sm">
          <p>Made with ❤️ just for you</p>
        </footer>
      )}
    </div>
  );
};

export default Index;
