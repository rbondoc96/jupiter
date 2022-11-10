import {useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faBars} from '@fortawesome/free-solid-svg-icons';
import Logo from '@/assets/icons/Logo';
import Button from '@/components/Button';
import ColorSchemeToggle from '@/components/ColorSchemeToggle';
import Sidebar from '@/components/Navigation/Sidebar';
import FullWidthLayout from '@/layouts/FullWidthLayout';

import './index.css';

const Navigation = () => {
  const [sidebarVisible, setSidebarVisible] = useState(false);

  const closeSidebar = () => setSidebarVisible(false);
  const openSidebar = () => setSidebarVisible(true);

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
              <button type="button" onClick={openSidebar}>
                <FontAwesomeIcon
                  className="text-dark dark:text-light"
                  icon={faBars}
                  size="2x"
                />
              </button>
            )}
          </div>
        </nav>
      </FullWidthLayout>
      <Sidebar icon={faBars} onClose={closeSidebar} visible={sidebarVisible} />
    </div>
  );
};

export default Navigation;
