
import React, { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { HeartIcon, LockIcon } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const FormSchema = z.object({
  password: z
    .string()
    .min(8, { message: "Please enter the date in DDMMYYYY format (8 digits)." })
    .max(8, { message: "Please enter the date in DDMMYYYY format (8 digits)." })
    .regex(/^\d{8}$/, { message: "Please enter the date in DDMMYYYY format (8 digits)." }),
});

interface PasswordFormProps {
  onSuccess: () => void;
  onFail: () => void;
  correctPassword: string;
}

const PasswordForm: React.FC<PasswordFormProps> = ({ onSuccess, onFail, correctPassword }) => {
  const { toast } = useToast();
  const [attempts, setAttempts] = useState(0);
  const [hearts, setHearts] = useState<Array<{ id: number; style: React.CSSProperties }>>([]);

  const addHeart = () => {
    const id = Date.now();
    const left = Math.random() * 100;
    const size = 20 + Math.random() * 20;
    const rotation = Math.random() * 30 - 15;
    
    const style = {
      left: `${left}%`,
      fontSize: `${size}px`,
      transform: `rotate(${rotation}deg)`,
      top: '100%',
    };

    setHearts(prev => [...prev, { id, style }]);
    
    // Clean up after animation
    setTimeout(() => {
      setHearts(prev => prev.filter(heart => heart.id !== id));
    }, 5000);
  };

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      password: "",
    },
  });

  // Add hint based on number of attempts
  const getHint = () => {
    if (attempts === 0) return null;
    if (attempts === 1) return "Hint: It's a special date for both of you...";
    if (attempts === 2) return "Hint: Maybe when you first met?";
    if (attempts === 3) return "Hint: Or another date that means a lot...";
    return "Think of your most special moments together ❤️";
  };

  const onSubmit = (values: z.infer<typeof FormSchema>) => {
    // Add hearts animation on submit
    for (let i = 0; i < 8; i++) {
      setTimeout(() => addHeart(), i * 150);
    }

    if (values.password === correctPassword) {
      toast({
        title: "Password Correct! ❤️",
        description: "Get ready for a special surprise...",
      });
      
      // Add a burst of hearts on success
      for (let i = 0; i < 20; i++) {
        setTimeout(() => addHeart(), i * 100);
      }
      
      // Delay redirect to show success message and hearts
      setTimeout(() => onSuccess(), 1500);
    } else {
      setAttempts(prev => prev + 1);
      
      toast({
        title: "Not quite right",
        description: "Try a different special date in DDMMYYYY format",
        variant: "destructive",
      });
      
      // After 5 attempts, give more obvious hints or redirect to generic message
      if (attempts >= 5) {
        toast({
          title: "Too many attempts",
          description: "You can try again later",
        });
        setTimeout(() => onFail(), 2000);
      }
      
      form.reset();
    }
  };

  return (
    <div className="relative overflow-hidden">
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
      
      <div className="love-card animate-fade-in w-full max-w-md mx-auto">
        <div className="absolute -top-2 -right-2 bg-love-100 rounded-full p-2">
          <HeartIcon className="h-6 w-6 text-love-500 animate-heartbeat" />
        </div>
        
        <h2 className="text-2xl font-bold mb-2 text-center text-romantic-800">
          One more step...
        </h2>
        
        <p className="text-center text-romantic-600 mb-6">
          Enter a special date in DDMMYYYY format to see your personal message ❤️
        </p>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-romantic-700 flex items-center gap-2">
                    <LockIcon className="h-4 w-4" />
                    Special Date
                  </FormLabel>
                  <FormControl>
                    <Input 
                      type="password" 
                      placeholder="DDMMYYYY" 
                      className="love-input" 
                      {...field} 
                      onFocus={() => addHeart()}
                      maxLength={8}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {getHint() && (
              <p className="text-sm italic text-romantic-500 animate-pulse-gentle">
                {getHint()}
              </p>
            )}
            
            <Button 
              type="submit" 
              className="love-btn w-full"
              onMouseOver={() => addHeart()}
            >
              Unlock Your Message
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default PasswordForm;
