import React, { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon, EyeIcon, EyeOffIcon, HeartIcon } from "lucide-react";
import { cn } from "@/lib/utils";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { useToast } from "@/hooks/use-toast";

const FormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  dob: z.date({ required_error: "Date of birth is required." }),
});

type FormValues = z.infer<typeof FormSchema>;

interface SignupFormProps {
  onSuccess: (values: FormValues & { isSpecial: boolean }) => void;
}

const specialNames = ["bristi santra", "rimi"];

const SignupForm: React.FC<SignupFormProps> = ({ onSuccess }) => {
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      email: "",
    },
  });

  const [floatingHearts, setFloatingHearts] = useState<Array<{ id: number; style: React.CSSProperties }>>([]);

  const addFloatingHeart = () => {
    const id = Date.now();
    const left = Math.random() * 100;
    const animationDuration = 3 + Math.random() * 4;
    const delay = Math.random() * 0.5;
    const size = 20 + Math.random() * 20;
    
    const style = {
      left: `${left}%`,
      fontSize: `${size}px`,
      animationDuration: `${animationDuration}s`,
      animationDelay: `${delay}s`,
      top: '100%',
    };

    setFloatingHearts(prev => [...prev, { id, style }]);
    
    // Clean up after animation completes
    setTimeout(() => {
      setFloatingHearts(prev => prev.filter(heart => heart.id !== id));
    }, (animationDuration + delay) * 1000);
  };

  const onSubmit = (values: FormValues) => {
    // Check if the name matches any special name (case-insensitive)
    const isSpecial = specialNames.includes(values.name.toLowerCase());
    
    // Add some floating hearts for everyone (but we'll add more for special user)
    for (let i = 0; i < 5; i++) {
      setTimeout(() => addFloatingHeart(), i * 200);
    }
    
    if (isSpecial) {
      // Add extra hearts for the special person
      for (let i = 0; i < 10; i++) {
        setTimeout(() => addFloatingHeart(), i * 100);
      }
      
      toast({
        title: "Welcome back!",
        description: "We've been waiting for you... ❤️",
      });
    } else {
      toast({
        title: "Sign up successful!",
        description: "Thanks for joining us!",
      });
    }

    // Pass the form values and special flag to the parent component
    onSuccess({ ...values, isSpecial });
  };

  return (
    <div className="relative overflow-hidden">
      {/* Animated floating hearts */}
      {floatingHearts.map(heart => (
        <div 
          key={heart.id} 
          className="floating-heart absolute animate-float" 
          style={heart.style}
        >
          ❤️
        </div>
      ))}
      
      <div 
        className="love-card animate-fade-in w-full max-w-md mx-auto"
        onMouseEnter={() => addFloatingHeart()} 
      >
        <div className="absolute -top-2 -right-2 bg-love-100 rounded-full p-2">
          <HeartIcon className="h-6 w-6 text-love-500 animate-heartbeat" />
        </div>
        
        <h2 className="text-2xl font-bold mb-6 text-center text-romantic-800">
          Sign up
        </h2>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-romantic-700">Name</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Enter your name" 
                      className="love-input" 
                      {...field} 
                      onFocus={() => addFloatingHeart()}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-romantic-700">Email</FormLabel>
                  <FormControl>
                    <Input 
                      type="email" 
                      placeholder="Enter your email" 
                      className="love-input" 
                      {...field} 
                      onFocus={() => addFloatingHeart()}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="dob"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="text-romantic-700">Date of Birth</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className={cn(
                            "love-input w-full pl-3 text-left font-normal flex justify-between",
                            !field.value && "text-muted-foreground"
                          )}
                          onFocus={() => addFloatingHeart()}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Select your date of birth</span>
                          )}
                          <CalendarIcon className="h-4 w-4 opacity-70" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 pointer-events-auto" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button 
              type="submit" 
              className="love-btn w-full"
              onMouseOver={() => addFloatingHeart()}
            >
              Sign up
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default SignupForm;
