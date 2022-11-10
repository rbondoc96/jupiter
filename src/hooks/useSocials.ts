import {useMemo} from 'react';
import {IconProp} from '@fortawesome/fontawesome-svg-core';
import {faCodepen, faGithub} from '@fortawesome/free-brands-svg-icons';
import {faEnvelope} from '@fortawesome/free-solid-svg-icons';

export interface Social {
  href: string;
  icon: IconProp;
  key: string;
}

export default function useSocials() {
  const socials = useMemo(
    () => [
      {
        href: 'https://github.com/rbondoc96',
        icon: faGithub,
        key: 'social-github',
      },
      {
        href: 'https://codepen.io/rbondoc96',
        icon: faCodepen,
        key: 'social-codepen',
      },
      {
        href: 'mailto:rbondoc96@gmail.com',
        icon: faEnvelope,
        key: 'social-email',
      },
    ],
    [],
  );

  return socials;
}
