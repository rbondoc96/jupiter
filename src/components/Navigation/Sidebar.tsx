import {IconProp} from '@fortawesome/fontawesome-svg-core';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

interface SidebarProps {
  icon: IconProp;
  onClose: () => void;
  visible: boolean;
}

const Sidebar = ({icon, onClose, visible}: SidebarProps) => {
  return (
    <div
      className={`flex absolute top-0 h-screen w-screen ${
        visible ? 'visible' : 'invisible'
      }`}
    >
      <div
        role="none"
        className="relative bg-overlay flex-1"
        onClick={onClose}
        onKeyDown={onClose}
      />
      <div
        className={`absolute top-0 ${
          visible ? 'right-0' : '-right-56'
        } h-full w-56 bg-dark transition-all`}
      >
        <div className="flex justify-end px-4 py-6">
          <button type="button" onClick={onClose}>
            <FontAwesomeIcon icon={icon} size="2x" className="text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
