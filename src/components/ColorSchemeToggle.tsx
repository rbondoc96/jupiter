import {useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faMoon, faSun} from '@fortawesome/free-regular-svg-icons';

function toggleColorScheme() {
  const html = document.documentElement;

  if (html.classList.contains('dark')) {
    html.classList.remove('dark');
    localStorage.setItem('theme', 'light');
  } else {
    html.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  }
}

const ColorSchemeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(document.documentElement.classList.contains('dark'));

  return (
    <button
      type="button"
      onClick={() => {
        setIsDarkMode((prevState) => !prevState);
        toggleColorScheme();
      }}
    >
      <FontAwesomeIcon className="dark:text-white text-black text-3xl" icon={isDarkMode ? faMoon : faSun} />
    </button>
  );
};

export default ColorSchemeToggle;
