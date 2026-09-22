import React from 'react';

const Logo = ({ size = 'md', isDark = false }) => {
  // Significantly increase the bounding box to account for built-in image padding
  const imgClasses = size === 'lg' ? 'h-16' : size === 'sm' ? 'h-8' : 'h-12';
  
  // Size variants for the text
  const textClasses = size === 'lg' ? 'text-2xl' : size === 'sm' ? 'text-lg' : 'text-xl';
  const textColorClasses = isDark ? 'text-white' : 'text-slate-800';

  return (
    <div className="flex items-center gap-2 group cursor-pointer">
      
      {/* Magic CSS Image with subtle upward shift for cap-height alignment */}
      <img 
        src="/logo.png" 
        alt="AI Job Portal" 
        className={`${imgClasses} w-auto object-contain transition-transform duration-300 group-hover:scale-105 -mt-1`}
        style={isDark 
          ? { 
              filter: 'grayscale(100%) invert(100%) brightness(200%)', 
              mixBlendMode: 'screen' 
            } 
          : { 
              mixBlendMode: 'multiply' 
            }
        }
      />
      
      {/* Coded Typography with leading-none for strict alignment */}
      <span className={`font-extrabold tracking-tight leading-none ${textClasses} ${textColorClasses}`}>
        <span className={isDark ? "text-blue-400" : "text-indigo-600"}>AI</span> Job Portal
      </span>
      
    </div>
  );
};

export default Logo;
