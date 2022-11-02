import {PropsWithChildren} from 'react';

import './index.css';

interface FullWidthLayoutProps extends PropsWithChildren<unknown> {
  className?: string;
  [key: string]: any;
}

const FullWidthLayout = ({children, className, ...props}: FullWidthLayoutProps) => (
  <div className={className ? `full-width-layout ${className}` : 'full-width-layout'} {...props}>
    {children}
  </div>
);

export default FullWidthLayout;
