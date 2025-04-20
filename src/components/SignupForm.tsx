
import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
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
import { useFloatingHearts } from "@/hooks/useFloatingHearts";
import FloatingHearts from "./FloatingHearts";
import FormHeader from "./FormHeader";

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
  const { hearts, addFloatingHeart } = useFloatingHearts();

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      email: "",
    },
  });

  const onSubmit = (values: FormValues) => {
    const isSpecial = specialNames.includes(values.name.toLowerCase());
    
    for (let i = 0; i < 5; i++) {
      setTimeout(() => addFloatingHeart(), i * 200);
    }
    
    if (isSpecial) {
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

    onSuccess({ ...values, isSpecial });
  };

  return (
    <div className="relative overflow-hidden">
      <FloatingHearts hearts={hearts} />
      
      <div 
        className="love-card animate-fade-in w-full max-w-md mx-auto"
        onMouseEnter={() => addFloatingHeart()} 
      >
        <FormHeader />
        
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
