
import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { useFloatingHearts } from "@/hooks/useFloatingHearts";
import FloatingHearts from "./FloatingHearts";
import FormHeader from "./FormHeader";
import DateSelector from "./DateSelector";

const FormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  day: z.string().min(1, { message: "Day is required" }),
  month: z.string().min(1, { message: "Month is required" }),
  year: z.string().min(1, { message: "Year is required" }),
}).refine((data) => {
  try {
    // Check if the date is valid
    const date = new Date(parseInt(data.year), parseInt(data.month) - 1, parseInt(data.day));
    return date.getDate() === parseInt(data.day) && 
           date.getMonth() === parseInt(data.month) - 1 && 
           date.getFullYear() === parseInt(data.year);
  } catch {
    return false;
  }
}, {
  message: "Please enter a valid date",
  path: ["day"], // Show error on the day field
});

type FormValues = z.infer<typeof FormSchema>;

interface SignupFormProps {
  onSuccess: (values: FormValues & { isSpecial: boolean; dob: Date }) => void;
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
      day: "",
      month: "",
      year: "",
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

    // Convert the separate date values to a Date object
    const dob = new Date(
      parseInt(values.year),
      parseInt(values.month) - 1,
      parseInt(values.day)
    );

    onSuccess({ ...values, isSpecial, dob });
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
            
            <FormItem className="space-y-2">
              <FormLabel className="text-romantic-700">Date of Birth</FormLabel>
              <div className="flex flex-row space-x-2">
                <FormField
                  control={form.control}
                  name="day"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <DateSelector
                          day={field.value}
                          month={form.watch("month")}
                          year={form.watch("year")}
                          onDayChange={field.onChange}
                          onMonthChange={(value) => form.setValue("month", value)}
                          onYearChange={(value) => form.setValue("year", value)}
                          addFloatingHeart={addFloatingHeart}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </FormItem>
            
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
