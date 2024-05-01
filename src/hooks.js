/* custom hooks */
import { useState, useEffect } from 'react';

// hook for media query handling
// using matchMedia browser api
export const useMediaQuery = (query) => {
  // check env if window applicable
  const isClient = typeof window === 'object';

  // check window state if query match, and record
  const [match, setMatch] = useState(
    isClient ? window.matchMedia(query).matches : false,
  );

  // on window resizing, check state of window
  useEffect(() => {
    if (!isClient) {
      return;
    }
    const mediaQueryObj = matchMedia(query);

    const handleMatch = (event) => {
      setMatch(event.matches);
    };

    mediaQueryObj.addEventListener('change', handleMatch);

    return () => mediaQueryObj.removeEventListener('change', handleMatch);
  }, [query, isClient]);

  return match;
};

// hooks for fetching data asynchronously
// using fetch api
export const useFetch = (url) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`response not okay:Status: ${response.status}`);
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [url]);

  return { data, error, loading };
};

// using asynchronous loading
export const useAsync = (asyncFunction) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetcher = async () => {
      try {
        setLoading(true);
        const response = await asyncFunction();
        setData(response);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetcher();
  }, [asyncFunction]);

  return { data, error, loading };
};

// hook for form handling
export const useForm = (initialData) => {
  const [values, setValues] = useState(initialData);

  //update values when inputs change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prevData) => ({ ...prevData, [name]: value }));
  };

  const resetForm = () => {
    setValues(initialData);
  };

  return { values, handleChange, resetForm };
};

// hook for theme switching
export const useTheme = (initial) => {
  const [theme, setTheme] = useState(initial);

  // toggle theme
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return { theme, toggleTheme };
};

// hook for handling browser localStorage api
const useLocalStorage = (key, initialValue) => {
  // try getting key value
  const storedItem = localStorage.getItem(key);
  const value = storedItem ? JSON.parse(storedItem) : initialValue;

  const [storedValue, setStoredValue] = useState(value);

  // set value in the storage object
  const updateValue = (newValue) => {
    setStoredValue(newValue);
    localStorage.setItem(key, JSON.stringify(newValue));
  };

  return { storedValue, updateValue };
};

export default useLocalStorage;

/**
 * custom hooks:
 * created using existing hooks
 * return effective sol of any task like useState, useEffect
 */

//  theme switching:
function useMode(mode = 'light') {
  const [theme, setTheme] = useState(mode);
  const toggleTheme = function () {
    setTheme((theme) => (theme === 'light' ? 'dark' : 'light'));
  };
  return toggleTheme;
}
