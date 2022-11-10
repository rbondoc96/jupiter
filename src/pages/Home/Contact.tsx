import SectionHeader from '@/components/SectionHeader';

interface ContactSectionProps {
  id: string;
}

const Contact = ({id}: ContactSectionProps) => {
  return (
    <section id={id} className="min-h-screen">
      <SectionHeader>Let&apos;s get in touch!</SectionHeader>
    </section>
  );
};

export default Contact;
