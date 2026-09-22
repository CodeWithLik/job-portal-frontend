export const Badge = ({ children, variant = 'primary', className = '' }) => {
  const variants = {
    primary: "bg-blue-100 text-blue-800",
    success: "bg-green-100 text-green-700",
    warning: "bg-yellow-100 text-yellow-800",
    danger: "bg-red-100 text-red-700 border border-red-200",
    error: "bg-red-100 text-red-700 border border-red-200",
    gray: "bg-gray-100 text-gray-600",
    default: "bg-gray-100 text-gray-800",
    pink: "bg-pink-100 text-pink-600",
    slate: "bg-slate-100 text-slate-600",
    sand: "bg-amber-50 text-amber-700 border border-amber-200/60",
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variants[variant] || variants.gray} ${className}`}>
      {children}
    </span>
  );
};

export const AppStatusBadge = ({ status, className = '' }) => {
  const variants = {
    applied: "bg-gray-100 text-gray-800",
    shortlisted: "bg-yellow-100 text-yellow-800",
    interview: "bg-indigo-100 text-indigo-800",
    hired: "bg-green-100 text-green-800",
    rejected: "bg-red-100 text-red-800",
    closed: "bg-amber-50 text-amber-700 border border-amber-200/60",
  };
  
  const s = (status || '').toLowerCase();
  const classes = variants[s] || variants.applied;
  
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${classes} ${className}`}>
      {status}
    </span>
  );
};
