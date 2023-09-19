import { motion } from 'framer-motion';
import { type ChangeEventHandler } from 'react';

interface InputProps {
  title?: string;
  placeholder: string;
  type: string;
  className?: string;
  name: string;
  errors?: string;
  value: string | number;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

const Input = ({
  title,
  placeholder,
  type,
  className,
  name,
  errors,
  value,
  onChange,
}: InputProps) => {
  return (
    <div className={className}>
      {title ? (
        <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
          {title}
        </label>
      ) : null}

      <input
        className="block w-full rounded-lg border border-gray-300  p-2.5 text-sm text-gray-900 shadow-sm outline-0"
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        name={name}
      />
      {errors ? (
        <motion.p
          animate={{ y: [-10, 0], opacity: 1, scale: 1 }}
          transition={{ duration: 2, ease: 'easeInOut' }}
          exit={{ opacity: 0 }}
          initial={{ opacity: 0, scale: 0.5 }}
          className="mt-2 text-red-600"
        >
          {errors}
        </motion.p>
      ) : null}
    </div>
  );
};

export default Input;
