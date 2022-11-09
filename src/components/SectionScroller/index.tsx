import throttle from 'lodash.throttle';
import {MouseEvent, useCallback, useEffect, useMemo, useState} from 'react';
import {faArrowDown} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import Text from '@/components/Text';

interface Section {
  id: string;
  name: string;
}

interface SectionScrollerProps {
  sections: Section[];
}

function isInMiddleOfVerticalAxis(element: HTMLElement | null): boolean {
  if (element === null) {
    return false;
  }

  const rect = element.getBoundingClientRect();
  const viewportHeight =
    window.innerHeight ?? document.documentElement.clientHeight;

  return rect.top < viewportHeight / 2 && rect.bottom > viewportHeight / 2;
}

const SectionScroller = ({sections}: SectionScrollerProps) => {
  const [isScrolling, setIsScrolling] = useState<boolean>(false);
  const [sectionIndexInFocus, setSectionIndexInFocus] = useState<number>(0);

  const nextSectionIndex = useMemo(() => {
    return sectionIndexInFocus === sections.length - 1
      ? 0
      : sectionIndexInFocus + 1;
  }, [sectionIndexInFocus, sections]);

  const href: string = useMemo(() => {
    const section = sections[nextSectionIndex];
    return `#${section.id}`;
  }, [nextSectionIndex, sections]);

  const scrollToHeader = useCallback(
    (event: MouseEvent) => {
      event.preventDefault();

      const href = event.currentTarget.getAttribute('href');

      if (href !== null) {
        const element = document.getElementById(href.substring(1));

        if (element !== null) {
          scrollTo(0, element.offsetTop - 70);
          setIsScrolling(true);

          // Prevents the button text from blinking between values
          // Value of 500 was chosen after testing other values
          setTimeout(() => {
            setSectionIndexInFocus((currentIndex) =>
              currentIndex === sections.length - 1 ? 0 : currentIndex + 1,
            );
            setIsScrolling(false);
          }, 500);
        }
      }
    },
    [sections],
  );

  const trackSections = useCallback(() => {
    sections?.forEach((section, index) => {
      const element = document.getElementById(section.id);
      if (isInMiddleOfVerticalAxis(element) && !isScrolling) {
        setSectionIndexInFocus(index);
        return false;
      }
      return true;
    });
  }, [isScrolling, sections]);

  useEffect(() => {
    const throttled = throttle(trackSections, 100);
    document.addEventListener('scroll', throttled);

    return () => document.removeEventListener('scroll', throttled);
  }, [trackSections]);

  return (
    <div className="flex space-x-3 items-end fixed bottom-8 right-8">
      <div className="flex flex-col">
        {nextSectionIndex !== 0 ? (
          <>
            <Text className="text-right font-light">Next:</Text>
            <Text className="text-right font-bold">
              {sections[nextSectionIndex].name}
            </Text>
          </>
        ) : (
          <Text className="text-right font-bold">Back to Top</Text>
        )}
      </div>
      <a
        href={href}
        className="inline-flex justify-center items-center bg-primary rounded-full w-16 h-16 drop-shadow-lg"
        onClick={scrollToHeader}
      >
        <FontAwesomeIcon icon={faArrowDown} size="2x" color="white" />
      </a>
    </div>
  );
};

export default SectionScroller;
export type {Section};
