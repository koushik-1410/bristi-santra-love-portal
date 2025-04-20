
import React from 'react';
import { HeartIcon } from 'lucide-react';

const FormHeader = () => {
  return (
    <div className="absolute -top-2 -right-2 bg-love-100 rounded-full p-2">
      <HeartIcon className="h-6 w-6 text-love-500 animate-heartbeat" />
    </div>
  );
};

export default FormHeader;
