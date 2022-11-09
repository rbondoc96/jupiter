import Button from '@/components/Button';
import Text from '@/components/Text';

interface HeroSectionProps {
  id: string;
}

const Hero = ({id}: HeroSectionProps) => {
  return (
    <section
      id={id}
      className="h-screen flex flex-col justify-center align-center"
    >
      <div className="flex flex-col space-y-10">
        <Text
          component="h1"
          className="font-extrabold text-7xl tracking-tighter"
        >
          Welcome.
        </Text>
        <Text
          component="p"
          className="font-light text-xl max-w-lg border-l-4 border-primary pl-3"
        >
          I&apos;m Rodrigo. I&apos;m a software developer based in San Diego,
          California, USA. I specialize in creating web and mobile
          applications.
        </Text>
        <Text component="p" className="font-light text-xl">
          JavaScript / PHP / React / React Native
        </Text>
        <div>
          <Button className="text-xl" size="lg">
            Say hello!
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
