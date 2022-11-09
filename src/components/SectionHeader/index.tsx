import Text from '@/components/Text';

import './index.css';

interface SectionHeaderProps {
  children: string;
}

const SectionHeader = ({children}: SectionHeaderProps) => {
  return (
    <h2 className="section-header">
      <Text
        className="section-header-text text-5xl font-extrabold"
        component="span"
      >
        {children}
      </Text>
    </h2>
  );
};

export default SectionHeader;
