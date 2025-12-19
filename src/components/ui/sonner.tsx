'use client';
import { X } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Toaster as Sonner, toast } from 'sonner';

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = 'system' } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps['theme']}
      className="toaster group"
      icons={{
        close: <X className="h-4 w-4" size={18} />,
      }}
      toastOptions={{
        classNames: {
          closeButton:
            '-right-1 top-2 left-auto !bg-white !border-none !text-gray-400 !hover:text-gray-600 !transition-colors',
          toast:
            'group toast  group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg',
          description: 'group-[.toast]:text-muted-foreground',
          actionButton:
            'group-[.toast]:bg-primary group-[.toast]:text-primary-foreground',
          cancelButton:
            'group-[.toast]:bg-muted group-[.toast]:text-muted-foreground',
        },
      }}
      {...props}
      closeButton
    />
  );
};

export { Toaster, toast };
