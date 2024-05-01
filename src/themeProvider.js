import { useState, useContext } from 'react';
import ThemeContext from './context';

// setting up context/data for being used in the descendants
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');
  const updateTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };
  return (
    <ThemeContext.Provider value={{ theme, updateTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('use useTheme within Theme Provider');
  }
  return context;
};
/**
 * create ThemeProvider: all inside get passed obj
 * createContext meth of react return context obj
 * context obj having Provider prop as react compo
 * for receiving use useContext or context obj Receiver prop as compo
 */

/** ThemeProvider steps:
 * passed insiders
 *
 */

// take obj, and make available for all insiders
export const PropsProvider = ({ children, props }) => {
  return (
    <ThemeContext.Provider value={props}>{children}</ThemeContext.Provider>
  );
};

export const useProps = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('use useProps within PropsProvider');
    //return {};
  }
  return context;
};
