import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faArrowDown} from '@fortawesome/free-solid-svg-icons';
import Text from '@/components/Text';
import PageLayout from '@/layouts/PageLayout';
import Hero from '@/pages/Home/Hero';

const Home = () => {
  return (
    <>
      <PageLayout id="home">
        <Hero id="home-hero" />
        <div className="flex space-x-3 items-end fixed bottom-8 right-8">
          <div className="flex flex-col">
            <Text className="text-right font-light">Next:</Text>
            <Text className="text-right font-bold">About Me</Text>
          </div>
          <a
            href="#home-about"
            className="inline-flex justify-center items-center bg-primary rounded-full w-16 h-16 drop-shadow-lg"
          >
            <FontAwesomeIcon icon={faArrowDown} size="2x" color="white" />
          </a>
        </div>
      </PageLayout>
    </>
  );
};

export default Home;
