import {useLayoutEffect, useState} from 'react';

export default function useHeaderHeight(): number {
  const [headerHeight, setHeaderHeight] = useState(0);

  useLayoutEffect(() => {
    const nav = document.querySelector('nav');

    if (nav === null) {
      setHeaderHeight(0);
    } else {
      setHeaderHeight(nav.offsetHeight);
    }
  }, []);

  return headerHeight;
}
