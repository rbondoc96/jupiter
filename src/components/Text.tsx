import {twMerge} from 'tailwind-merge';
import HTMLTextElement from '@/core/types/HTMLTextElement';

interface TextProps {
  children: string;
  className?: string;
  component?: HTMLTextElement;
  [prop: string]: any;
}

const Text = ({children, className, component, ...props}: TextProps) => {
  const commonClasses = twMerge('text-dark dark:text-light', className);

  switch (component) {
    case 'span': {
      return (
        <span className={commonClasses} {...props}>
          {children}
        </span>
      );
    }
    case 'div': {
      return (
        <div className={commonClasses} {...props}>
          {children}
        </div>
      );
    }
    case 'p': {
      return (
        <p className={twMerge('tracking-tight', commonClasses)} {...props}>
          {children}
        </p>
      );
    }
    case 'h1': {
      return (
        <h1 className={commonClasses} {...props}>
          {children}
        </h1>
      );
    }
    case 'h2': {
      return (
        <h2 className={commonClasses} {...props}>
          {children}
        </h2>
      );
    }
    case 'h3': {
      return (
        <h3 className={commonClasses} {...props}>
          {children}
        </h3>
      );
    }
    case 'h4': {
      return (
        <h4 className={commonClasses} {...props}>
          {children}
        </h4>
      );
    }
    case 'h5': {
      return (
        <h5 className={commonClasses} {...props}>
          {children}
        </h5>
      );
    }
    default: {
      return (
        <span className={commonClasses} {...props}>
          {children}
        </span>
      );
    }
  }
};

export default Text;
