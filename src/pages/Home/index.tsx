import SectionScroller, {Section} from '@/components/SectionScroller';
import SocialsBar from '@/components/SocialsBar';
import PageLayout from '@/layouts/PageLayout';
import About from '@/pages/Home/About';
import Contact from '@/pages/Home/Contact';
import Experience from '@/pages/Home/Experience';
import Hero from '@/pages/Home/Hero';
import Projects from '@/pages/Home/Projects';

const homeSections: Section[] = [
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
  {
    id: 'home-projects',
    name: 'Projects',
  },
  {
    id: 'home-contact',
    name: 'Contact Me',
  },
];

const Home = () => {
  return (
    <>
      <PageLayout id="home">
        <Hero id={homeSections[0].id} />
        <About id={homeSections[1].id} />
        <Experience id={homeSections[2].id} />
        <Projects id={homeSections[3].id} />
        <Contact id={homeSections[4].id} />
        <SocialsBar />
        <SectionScroller sections={homeSections} />
      </PageLayout>
    </>
  );
};

export default Home;
