import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap/all';

const Background = createContext();

export const BackgroundProvider = ({ children }) => {
  const [currentBG, setCurrentBG] = useState('#FAFCC6');
  let appRef = useRef(null);

  useEffect(() => {
    if (!appRef.current) return;
    
    gsap.to(appRef.current, {
      duration: 1,
      backgroundColor: currentBG,
    });
  }, [currentBG]);

  return (
    <Background.Provider value={{ setCurrentBG, appRef }}>
      {children}
    </Background.Provider>
  );
};

export const useBackgroundContext = () => useContext(Background);