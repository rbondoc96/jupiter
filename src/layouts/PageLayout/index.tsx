import {PropsWithChildren} from 'react';
import FullWidthLayout from '@/layouts/FullWidthLayout';

interface PageLayoutProps extends PropsWithChildren<unknown> {
  id: string;
}

const PageLayout = ({children, id}: PageLayoutProps) => {
  return (
    <FullWidthLayout className="min-h-screen relative" id={id}>
      {children}
    </FullWidthLayout>
  );
};

export default PageLayout;
