/*import { ThemeProvider, useTheme } from './themeProvider';

const ThemingComponent = () => {
  // accesing context data
  const { theme, updateTheme } = useTheme();
  return (
    <div
      style={{
        background: theme === 'light' ? '#fff' : '#111',
        margin: '0',
        padding: '25px',
        textAlign: 'center',
        color: theme === 'light' ? '#111' : '#fff',
        minHeight: '100vh',
      }}
    >
      <h1>Theme Switching App</h1>
      <h4>Current theme: {theme}</h4>
      <button onClick={updateTheme}>Toggle theme</button>
    </div>
  );
};

const App = () => {
  return (
    <ThemeProvider>
      <ThemingComponent />
    </ThemeProvider>
  );
};

export default App;
*/
/*import { PropsProvider, useProps } from './themeProvider';
import { useTheme } from './hooks';

const ThemeComponent = () => {
  const { theme, toggleTheme } = useProps();
  const modeTo = theme === 'light' ? 'dark' : 'light';
  return (
    <div
      style={{
        background: theme === 'light' ? '#fff' : '#111',
        color: modeTo === 'light' ? '#fff' : '#111',
        minHeight: '100vh',
        padding: '20px',
        textAlign: 'center',
        margin: '0px',
      }}
    >
      <h1>Theme Switching App</h1>
      <h3>Current theme: {theme}</h3>
      <button onClick={toggleTheme}>{modeTo.toTitleCase()} mode</button>
    </div>
  );
};

export default function App() {
  const { theme, toggleTheme } = useTheme('light');

  return (
    <PropsProvider props={{ theme, toggleTheme }}>
      <ThemeComponent />
    </PropsProvider>
  );
}

function toTitle(str) {
  //const str = str.trim().charAt(0).toUpperCase();
  //return str;
  return str
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

String.prototype.toTitleCase = function () {
  return this.split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};
*/
import { useCallback } from 'react';
import useLocalStorage, {
  useMediaQuery,
  useForm,
  useTheme,
  useAsync,
  useFetch,
} from './hooks';
//import Data from './data.json';
//import './App.css';

//using useMediaQuery
/*export default function App() {
  const matched = useMediaQuery('(max-width : 768px)');
  return (
    <>{matched ? <div>Small SSSSSSSSS</div> : <div>Bigggg BBBBBBBB</div>}</>
  );
}*/

//using useLocalStorage
/*export default function App() {
  const { storedValue, updateValue } = useLocalStorage('firstKey', '');
  const handleChange = (e) => {
    const newValue = e.target.value;
    updateValue(newValue);
  };
  return (
    <>
      <form>
        <label>
          Store Data:{' '}
          <input type="text" value={storedValue} onChange={handleChange} />
        </label>
        <br />
      </form>
      <p>Stored current Data: {storedValue}</p>
    </>
  );
}
*/

// using useFetch
/*export default function App() {
   const { data, error, loading } = useFetch(
    'https://jsonplaceholder.typicode.com/posts/1',
  );

  // boolean, null, undefined , "", empty not rendered by react component
  if (loading) {
    console.log('loading:', loading);
    return <p>Loading: {loading.toString()} ...</p>;
  }
  if (error) {
    return <p>Error occured: {error.message} ...</p>;
  }
  return (
    <>
      <p>Data loaded:</p>
      <div>{data.title}</div>
      <br />
      <div>{data.body}</div>
      <br />
      <div>loading status: {loading.toString()}</div>
      <p>Error status: {error} ...</p>;
    </>
  );
}*/

// counter using redux
import { useDispatch, useSelector } from 'react-redux';

// types constants
const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';
const DEFAULT = 'DEFAULT';

// action creators
const incremental = () => ({ type: INCREMENT });
const decremental = () => ({ type: DECREMENT });
const reset = () => ({ type: DEFAULT });

export default function App() {
  const counter = useSelector((state) => state.counter);
  const dispatch = useDispatch();

  return (
    <>
      <h3>Counter: {counter}</h3>
      <button type="button" onClick={() => dispatch(incremental())}>
        INCREMENT
      </button>
      <br />
      <button type="button" onClick={() => dispatch(decremental())}>
        DECREMENT
      </button>
      <br />
      <button onClick={() => dispatch(reset())}>RESET</button>
    </>
  );
}
