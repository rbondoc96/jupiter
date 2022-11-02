import {useContext} from 'react';

import UIContext from '@/core/context/UIContext';

export default function useSidebarState() {
  const context = useContext(UIContext);

  if (context === undefined) {
    console.error('useSidebarState must be used within a UIProvider.');
  }

  const {sidebarState} = context;

  return {
    sidebarVisible: sidebarState[0],
    setSidebarVisible: sidebarState[1],
  };
}
