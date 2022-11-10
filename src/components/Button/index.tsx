import {ButtonHTMLAttributes, DetailedHTMLProps} from 'react';
import {twMerge} from 'tailwind-merge';
import Text from '@/components/Text';

import './index.css';

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
        return 'button-sm';
      }
      case 'md': {
        return 'button-md';
      }
      case 'lg': {
        return 'button-lg';
      }
    }
  };

  const classes = twMerge('button', sizeClassResolver(size), className);

  return (
    <button className={classes} type="button" {...props}>
      <Text
        component="span"
        className="text-primary dark:text-primary font-light"
      >
        {children}
      </Text>
    </button>
  );
};

export default Button;
