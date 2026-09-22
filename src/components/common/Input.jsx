import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

export const Input = ({ label, labelRight, id, error, type = 'text', wrapperClassName = 'mb-4', ...props }) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';
  const inputType = isPassword && showPassword ? 'text' : type;

  return (
    <div className={wrapperClassName}>
      {(label || labelRight) && (
        <div className="flex items-center justify-between mb-1">
          {label && <label htmlFor={id} className="block text-sm font-medium text-gray-700">{label}</label>}
          {labelRight && <div className="text-sm">{labelRight}</div>}
        </div>
      )}
      <div className="relative">
        <input
          id={id}
          type={inputType}
          className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${isPassword ? 'pr-10' : ''} ${error ? 'border-red-500' : 'border-gray-300'}`}
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
            onClick={() => setShowPassword(!showPassword)}
            tabIndex="-1"
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        )}
      </div>
      {error && typeof error === 'string' && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export const Textarea = ({ label, id, error, ...props }) => {
  return (
    <div className="mb-4">
      {label && <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>}
      <textarea
        id={id}
        className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${error ? 'border-red-500' : 'border-gray-300'}`}
        {...props}
      ></textarea>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};
