import SectionHeader from '@/components/SectionHeader';

interface ExperienceSectionProps {
  id: string;
}

const Experience = ({id}: ExperienceSectionProps) => {
  return (
    <section id={id} className="h-screen">
      <SectionHeader>My Experience</SectionHeader>
    </section>
  );
};

export default Experience;
