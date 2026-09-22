export const Card = ({ children, className = '', overflowHidden = true, ...props }) => {
  return (
    <div className={`bg-white rounded-lg border border-gray-200 shadow-sm ${overflowHidden ? 'overflow-hidden' : ''} ${className}`} {...props}>
      {children}
    </div>
  );
};

export const CardHeader = ({ children, className = '' }) => (
  <div className={`px-6 py-4 border-b border-gray-200 ${className}`}>{children}</div>
);

export const CardBody = ({ children, className = '' }) => (
  <div className={`px-6 py-4 ${className}`}>{children}</div>
);

export const CardFooter = ({ children, className = '' }) => (
  <div className={`px-6 py-4 bg-gray-50 border-t border-gray-200 ${className}`}>{children}</div>
);
