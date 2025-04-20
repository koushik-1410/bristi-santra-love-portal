import React, { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { HeartIcon, VolumeIcon, Volume2Icon } from "lucide-react";
import confetti from "canvas-confetti";
import { cn } from "@/lib/utils";

const Celebration: React.FC = () => {
  const [showMessage, setShowMessage] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [hearts, setHearts] = useState<Array<{ id: number; style: React.CSSProperties }>>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Custom messages - replace these with your personalized messages
  const loveMessages = [
    "Bristi, happy birthday my love! 💖",
    "Every moment with you feels like a blessing.",
    "Your smile lights up my darkest days.",
    "Your love is the most precious gift I've ever received.",
    "I cherish every laugh, every tear, and every memory we share.",
    "You are my today and all of my tomorrows.",
    "With you, I've found a love so pure and true.",
    "Thank you for being the beautiful soul that you are.",
    "I love you more than words could ever express.",
    "Here's to celebrating you today and always! ❤️"
  ];

  const triggerConfetti = () => {
    if (typeof window !== "undefined") {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  const addHeart = () => {
    const id = Date.now();
    const left = Math.random() * 100;
    const size = 20 + Math.random() * 30;
    const animationDuration = 3 + Math.random() * 7;
    
    const style = {
      left: `${left}%`,
      fontSize: `${size}px`,
      animationDuration: `${animationDuration}s`,
      opacity: 0.7 + Math.random() * 0.3,
      top: '100%',
    };

    setHearts(prev => [...prev, { id, style }]);
    
    // Clean up after animation
    setTimeout(() => {
      setHearts(prev => prev.filter(heart => heart.id !== id));
    }, animationDuration * 1000);
  };

  // Animate entrance
  useEffect(() => {
    // Show welcome message with delay
    setTimeout(() => {
      setShowMessage(true);
      triggerConfetti();
      
      // Start continuous hearts
      const heartInterval = setInterval(() => {
        addHeart();
      }, 500);
      
      return () => clearInterval(heartInterval);
    }, 800);
  }, []);

  // Auto advance slides
  useEffect(() => {
    if (showMessage) {
      const slideInterval = setInterval(() => {
        setCurrentSlide(prev => {
          const next = prev + 1;
          if (next >= loveMessages.length) {
            // When we reach the end, pause and then restart
            clearInterval(slideInterval);
            setTimeout(() => {
              setCurrentSlide(0);
              triggerConfetti();
            }, 3000);
            return prev;
          }
          // Trigger confetti on certain slides
          if (next % 3 === 0) {
            triggerConfetti();
          }
          return next;
        });
      }, 4000);
      
      return () => clearInterval(slideInterval);
    }
  }, [showMessage, loveMessages.length]);

  // Handle manual slide navigation
  const goToNextSlide = () => {
    setCurrentSlide(prev => 
      prev < loveMessages.length - 1 ? prev + 1 : 0
    );
    triggerConfetti();
  };

  const goToPrevSlide = () => {
    setCurrentSlide(prev => 
      prev > 0 ? prev - 1 : loveMessages.length - 1
    );
  };

  useEffect(() => {
    if (showMessage && audioRef.current) {
      audioRef.current.volume = 0.5;
      audioRef.current.play().catch(error => {
        console.log('Audio autoplay failed:', error);
      });
      setIsPlaying(true);
    }
  }, [showMessage]);

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div 
      ref={containerRef}
      className="min-h-screen relative overflow-hidden flex flex-col items-center justify-center p-4 pb-16"
      style={{
        background: "linear-gradient(135deg, #F5F0FF 0%, #FFF1F2 100%)"
      }}
    >
      {/* Audio element */}
      <audio ref={audioRef} loop>
        <source src="/your-audio-file.mp3" type="audio/mp3" />
      </audio>

      {/* Audio control button */}
      <button
        onClick={toggleAudio}
        className="absolute top-4 right-4 p-2 rounded-full bg-love-100 hover:bg-love-200 transition-colors"
        aria-label={isPlaying ? "Mute audio" : "Play audio"}
      >
        {isPlaying ? (
          <Volume2Icon className="h-6 w-6 text-love-500" />
        ) : (
          <VolumeIcon className="h-6 w-6 text-love-500" />
        )}
      </button>

      {/* Floating hearts background animation */}
      {hearts.map(heart => (
        <div 
          key={heart.id} 
          className="floating-heart absolute animate-float" 
          style={heart.style}
        >
          ❤️
        </div>
      ))}
      
      {/* Heart decoration */}
      <div className="absolute top-10 left-10 text-love-500 animate-rotate-heart opacity-70">
        <HeartIcon size={40} />
      </div>
      <div className="absolute bottom-10 right-10 text-love-500 animate-pulse-gentle opacity-70">
        <HeartIcon size={40} />
      </div>
      
      {/* Main content */}
      <div className={`love-card max-w-2xl transition-all duration-1000 ${showMessage ? 'scale-100 opacity-100' : 'scale-90 opacity-0'}`}>
        <div className="text-center space-y-8">
          {/* Message carousel */}
          <div className="min-h-[200px] flex items-center justify-center">
            {loveMessages.map((message, index) => (
              <p 
                key={index}
                className={`absolute font-dancing text-2xl md:text-3xl text-romantic-800 transition-all duration-700 transform ${
                  index === currentSlide 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-8 pointer-events-none'
                }`}
              >
                {message}
              </p>
            ))}
          </div>
          
          {/* Navigation dots */}
          <div className="flex justify-center space-x-2">
            {loveMessages.map((_, index) => (
              <button
                key={index}
                className={`h-3 w-3 rounded-full transition-all duration-300 ${
                  index === currentSlide ? 'bg-love-600 scale-125' : 'bg-romantic-300'
                }`}
                onClick={() => setCurrentSlide(index)}
                aria-label={`Go to message ${index + 1}`}
              />
            ))}
          </div>
          
          {/* Navigation buttons */}
          <div className="flex justify-center space-x-4">
            <Button
              onClick={goToPrevSlide}
              className="love-btn-alt"
              aria-label="Previous message"
            >
              Previous
            </Button>
            <Button
              onClick={goToNextSlide}
              className="love-btn"
              aria-label="Next message"
            >
              Next
            </Button>
          </div>
        </div>
      </div>
      
      {/* Custom signature */}
      <div className={`mt-12 text-center transition-all duration-1000 delay-500 ${showMessage ? 'opacity-100' : 'opacity-0'}`}>
        <p className="text-2xl font-dancing text-love-700">
          With all my love,
        </p>
        <p className="text-3xl font-bold font-dancing mt-1 text-love-800">
          Your Loving Boyfriend ❤️
        </p>
      </div>
    </div>
  );
};

export default Celebration;
