import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faBars} from '@fortawesome/free-solid-svg-icons';
import Logo from '@/assets/icons/Logo';
import Button from '@/components/Button';
import ColorSchemeToggle from '@/components/ColorSchemeToggle';
import useSidebarState from '@/hooks/useSidebarState';
import FullWidthLayout from '@/layouts/FullWidthLayout';

import './index.css';

const Navigation = () => {
  const {sidebarVisible, setSidebarVisible} = useSidebarState();

  const closeSidebar = () => setSidebarVisible(false);

  return (
    <div className="nav-wrapper">
      <div className="nav-background" />
      <FullWidthLayout className="nav">
        <nav className="nav-container">
          <a href="/">
            <Logo />
          </a>
          <div className="hidden md:flex items-center space-x-8">
            <Button>Resume</Button>
            <ColorSchemeToggle />
          </div>
          <div className="md:hidden flex">
            {!sidebarVisible && (
              <button
                type="button"
                onClick={() => setSidebarVisible((state) => !state)}
              >
                <FontAwesomeIcon icon={faBars} size="2x" />
              </button>
            )}
          </div>
        </nav>
      </FullWidthLayout>
      <div
        className={`flex absolute top-0 h-screen w-screen ${
          sidebarVisible ? 'visible' : 'invisible'
        }`}
      >
        <div
          role="none"
          className="relative bg-overlay flex-1"
          onClick={closeSidebar}
          onKeyDown={closeSidebar}
        />
        <div
          className={`absolute top-0 ${
            sidebarVisible ? 'right-0' : '-right-56'
          } h-full w-56 bg-dark transition-all`}
        >
          <div className="flex justify-end px-4 py-6">
            <button
              type="button"
              onClick={() => setSidebarVisible((state) => !state)}
            >
              <FontAwesomeIcon
                icon={faBars}
                size="2x"
                className="text-white"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navigation;

/**
 *           
 * {<div className="flex space-x-16">
  <NavLink ariaLabel="Scroll to top" href="#hero" children="Home" />
  <NavLink ariaLabel="Get to know me" href="#about" children="About" />
  <NavLink ariaLabel="Where I've worked" href="#experience" children="Experience" />
  <NavLink ariaLabel="My skills" href="#skills" children="Skills" />
  <NavLink ariaLabel="Some things I've worked on" href="#projects" children="Projects" />
  <NavLink ariaLabel="Get in touch with me" href="#contact" children="Contact" />
</div>
 */
