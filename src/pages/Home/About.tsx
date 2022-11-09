import SectionHeader from '@/components/SectionHeader';
import Text from '@/components/Text';

interface AboutSectionProps {
  id: string;
}

const About = ({id}: AboutSectionProps) => {
  return (
    <section id={id} className="h-screen">
      <SectionHeader>Me, Myself, and I</SectionHeader>
      <div className="flex flex-col space-y-8 md:flex-row md:space-x-8">
        <div className="flex-1 flex flex-col space-y-8">
          <Text component="p" className="text-xl">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </Text>
          <Text component="p" className="text-xl">
            Duis aute irure dolor in reprehenderit in voluptate velit esse
            cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
            cupidatat non proident, sunt in culpa qui officia deserunt mollit
            anim id est laborum.
          </Text>
        </div>
        <div className="flex-1 flex justify-center">
          <img
            src="https://pbs.twimg.com/media/D9769dRW4AMs1Bh.jpg"
            alt="me"
            width="300"
            height="300"
          />
        </div>
      </div>
    </section>
  );
};

export default About;
