'use client';

import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import Icon from './AppIcon';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

interface ToastProps {
  message: string;
  type?: ToastType;
  duration?: number;
  onClose?: () => void;
}

export const Toast = ({
  message,
  type = 'info',
  duration = 5000,
  onClose,
}: ToastProps) => {
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    if (duration > 0 && onClose) {
      timerRef.current = setTimeout(() => {
        onClose();
      }, duration);
    }
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [duration, onClose]);

  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };

  const typeConfig = {
    success: {
      icon: 'CheckCircleIcon',
      bgColor: 'bg-success',
      textColor: 'text-success-foreground',
      borderColor: 'border-success',
    },
    error: {
      icon: 'XCircleIcon',
      bgColor: 'bg-error',
      textColor: 'text-error-foreground',
      borderColor: 'border-error',
    },
    warning: {
      icon: 'ExclamationTriangleIcon',
      bgColor: 'bg-warning',
      textColor: 'text-warning-foreground',
      borderColor: 'border-warning',
    },
    info: {
      icon: 'InformationCircleIcon',
      bgColor: 'bg-primary',
      textColor: 'text-primary-foreground',
      borderColor: 'border-primary',
    },
  };

  const config = typeConfig[type];

  const toastContent = (
    <div
      className={`fixed bottom-4 right-4 z-50 flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg border-l-4 ${config.bgColor} ${config.textColor} ${config.borderColor} min-w-[300px] max-w-md transition-all duration-300 opacity-100 translate-x-0 animate-slide-in-right`}
      role="alert"
      aria-live="polite"
    >
      <Icon name={config.icon} size={24} className="flex-shrink-0" variant="solid" />
      <p className="flex-1 text-sm font-medium">{message}</p>
      <button
        onClick={handleClose}
        className="flex-shrink-0 hover:opacity-70 transition-opacity"
        aria-label="Close notification"
      >
        <Icon name="XMarkIcon" size={20} />
      </button>
    </div>
  );

  // Only render on client-side using portal to avoid hydration issues
  if (!mounted || typeof document === 'undefined') {
    return null;
  }

  return createPortal(toastContent, document.body);
};

export default Toast;

