import SectionScroller, {Section} from '@/components/SectionScroller';
import PageLayout from '@/layouts/PageLayout';
import About from '@/pages/Home/About';
import Experience from '@/pages/Home/Experience';
import Hero from '@/pages/Home/Hero';

const HomeSections: Section[] = [
  {
    id: 'home-hero',
    name: '',
  },
  {
    id: 'home-about',
    name: 'About Me',
  },
  {
    id: 'home-experience',
    name: 'Experience',
  },
  // {
  //   id: 'home-projects',
  //   name: 'Projects',
  // },
  // {
  //   id: 'home-contact',
  //   name: 'Contact Me',
  // },
];

const Home = () => {
  return (
    <>
      <PageLayout id="home">
        <Hero id="home-hero" />
        <About id="home-about" />
        <Experience id="home-experience" />
        <SectionScroller sections={HomeSections} />
      </PageLayout>
    </>
  );
};

export default Home;
