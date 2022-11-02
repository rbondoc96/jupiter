import {useEffect} from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Home from '@/pages/Home';

const App = () => {
  useEffect(() => {
    if (
      localStorage.theme === 'dark' ||
      (!('theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  return (
    <div className="bg-light dark:bg-black min-h-screen">
      <Navigation />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
