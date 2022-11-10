import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import useSocials from '@/hooks/useSocials';

const SocialsBar = () => {
  const socials = useSocials();

  return (
    <div className="fixed bottom-1/2 right-12 hidden md:flex flex-col space-y-4 text-dark dark:text-light">
      {socials.map((social) => (
        <a
          className="hover:text-primary transition-colors duration-300"
          href={social.href}
          key={social.key}
          target="_blank"
          rel="noreferrer"
        >
          <FontAwesomeIcon icon={social.icon} size="xl" />
        </a>
      ))}
    </div>
  );
};

export default SocialsBar;
