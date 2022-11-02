import {ButtonHTMLAttributes, DetailedHTMLProps} from 'react';
import {twMerge} from 'tailwind-merge';
import Text from '@/components/Text';

type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  children: string;
  className?: string;
  size?: ButtonSize;
}

const Button = ({children, className, size = 'md', ...props}: ButtonProps) => {
  const sizeClassResolver = (size: ButtonSize): string => {
    switch (size) {
      case 'sm': {
        return 'px-3 py-1';
      }
      case 'md': {
        return 'px-5 py-1.5';
      }
      case 'lg': {
        return 'px-8 py-3';
      }
    }
  };

  const classes = twMerge(
    'border-primary rounded-lg border-2',
    sizeClassResolver(size),
    className,
  );

  return (
    <button className={classes} type="button" {...props}>
      <Text className="text-primary dark:text-primary font-light">
        {children}
      </Text>
    </button>
  );
};

export default Button;
