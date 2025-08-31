import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { toast } from 'sonner';

interface CopyableEmailProps {
  email: string;
  className?: string;
  showIcon?: boolean;
  iconSize?: 'sm' | 'md' | 'lg';
}

const CopyableEmail: React.FC<CopyableEmailProps> = ({ 
  email, 
  className = "", 
  showIcon = true, 
  iconSize = 'sm' 
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      toast.success('Email copied to clipboard!');
      
      // Reset copied state after 2 seconds
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error('Failed to copy email:', error);
      toast.error('Failed to copy email. Please try again.');
    }
  };

  const iconSizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  return (
    <div className={`inline-flex items-center gap-2 group ${className}`}>
      <a 
        href={`mailto:${email}`}
        className="font-semibold hover:text-teal-600 transition-colors duration-300"
      >
        {email}
      </a>
      {showIcon && (
        <button
          onClick={handleCopyEmail}
          className="p-1 rounded-md hover:bg-teal-100 transition-all duration-200 opacity-70 group-hover:opacity-100"
          title="Copy email to clipboard"
          type="button"
        >
          {copied ? (
            <Check className={`${iconSizeClasses[iconSize]} text-green-500`} />
          ) : (
            <Copy className={`${iconSizeClasses[iconSize]} text-gray-500 hover:text-teal-600`} />
          )}
        </button>
      )}
    </div>
  );
};

export default CopyableEmail;
