
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { addFloatingHeartType } from "@/hooks/useFloatingHearts";

interface DateSelectorProps {
  day: string;
  month: string;
  year: string;
  onDayChange: (value: string) => void;
  onMonthChange: (value: string) => void;
  onYearChange: (value: string) => void;
  addFloatingHeart: addFloatingHeartType;
}

const months = [
  "January", "February", "March", "April", "May", "June", 
  "July", "August", "September", "October", "November", "December"
];

const DateSelector: React.FC<DateSelectorProps> = ({
  day,
  month,
  year,
  onDayChange,
  onMonthChange,
  onYearChange,
  addFloatingHeart,
}) => {
  // Generate days based on the month/year
  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month, 0).getDate();
  };
  
  const currentYear = new Date().getFullYear();
  const days = Array.from(
    { length: getDaysInMonth(parseInt(month) || 1, parseInt(year) || currentYear) },
    (_, i) => (i + 1).toString()
  );
  
  // Generate years (100 years back from current)
  const years = Array.from(
    { length: 100 },
    (_, i) => (currentYear - 99 + i).toString()
  );

  return (
    <div className="grid grid-cols-3 gap-2">
      <div>
        <Select value={day} onValueChange={onDayChange} onOpenChange={() => addFloatingHeart()}>
          <SelectTrigger className="love-input">
            <SelectValue placeholder="Day" />
          </SelectTrigger>
          <SelectContent>
            {days.map((d) => (
              <SelectItem key={d} value={d}>
                {d}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div>
        <Select value={month} onValueChange={onMonthChange} onOpenChange={() => addFloatingHeart()}>
          <SelectTrigger className="love-input">
            <SelectValue placeholder="Month" />
          </SelectTrigger>
          <SelectContent>
            {months.map((m, index) => (
              <SelectItem key={m} value={(index + 1).toString()}>
                {m}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div>
        <Select value={year} onValueChange={onYearChange} onOpenChange={() => addFloatingHeart()}>
          <SelectTrigger className="love-input">
            <SelectValue placeholder="Year" />
          </SelectTrigger>
          <SelectContent>
            {years.map((y) => (
              <SelectItem key={y} value={y}>
                {y}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default DateSelector;
