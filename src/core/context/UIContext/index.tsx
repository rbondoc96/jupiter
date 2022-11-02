import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useState,
} from 'react';

interface UIContextState {
  sidebarState: [
    sidebarVisible: boolean,
    setSidebarVisible: Dispatch<SetStateAction<boolean>>,
  ];
}

const UIContext = createContext<UIContextState>({
  sidebarState: [false, () => {}],
});

const UIProvider = ({children}: PropsWithChildren<unknown>) => {
  const [sidebarVisible, setSidebarVisible] = useState<boolean>(false);

  return (
    <UIContext.Provider
      value={{
        sidebarState: [sidebarVisible, setSidebarVisible],
      }}
    >
      {children}
    </UIContext.Provider>
  );
};

export default UIContext;
export {UIProvider};
