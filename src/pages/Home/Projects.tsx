import SectionHeader from '@/components/SectionHeader';

interface ProjectsSectionProps {
  id: string;
}

const Projects = ({id}: ProjectsSectionProps) => {
  return (
    <section id={id} className="h-screen">
      <SectionHeader>Things I&apos;ve Built</SectionHeader>
    </section>
  );
};

export default Projects;
