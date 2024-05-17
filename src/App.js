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
/*import useLocalStorage, {
  useMediaQuery,
  useForm,
  useTheme,
  useAsync,
  useFetch,
} from './hooks';*/
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
import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import fetchData from './actions';
import { adder, updater, deleter, changer, selectAllEls } from './reducer';
import { createSelector } from 'reselect';
import {
  List,
  Grid,
  Table,
  Column,
  MultiGrid,
  AutoSizer,
} from 'react-virtualized';
import { Parallax, ParallaxLayer } from '@react-spring/parallax';
import {
  useSpring,
  useTransition,
  animated,
  config,
  useTrail,
  useChain,
  useSprings,
  useSpringRef,
} from '@react-spring/web';
const DEFAULT = 'DEFAULT';

const reset = () => ({ type: DEFAULT });

export function App() {
  const { id } = useSelector((state) => state.items);
  const change = useSelector((state) => state.updates.change);
  const { data, loading } = useSelector((state) => state.dataLoader);

  const tasksS = createSelector(
    (state) => state.items,
    (data) => data.tasks,
  );

  let taskss = useSelector(selectAllEls);

  const dispatch = useDispatch();

  //const taskss = useSelector(tasksS);

  const listEls = taskss.map((item, index) => (
    <div>
      {item.task}
      <br />{' '}
      <button
        type="button"
        onClick={() => {
          dispatch(updater({ id: item.id, task: changing(item.task) }));
          if (!change) dispatch(changer());
        }}
      >
        Edit
      </button>
      <button type="button" onClick={() => dispatch(deleter(item.id))}>
        Delete
      </button>
    </div>
  ));

  const changing = (task) => {
    const el = document.getElementById('input');
    el.value = task;
    return el.value;
  };
  const changings = () => {
    const el = document.getElementById('input');
    return el.value;
  };

  const handleSubmitting = useCallback(async (values, formik) => {
    formik.setSubmitting(true);
    formik.setStatus('submitting ...');

    if (values.email !== 'eww@fdf') {
      // Set an error message for the email field
      formik.setErrors({ email: 'Invalid email address' });
      // Set form-wide status message
      formik.setStatus('Error, email not correct...');
      formik.setSubmitting(false);
      return;
    } else {
      formik.setErrors({});
      formik.setStatus('Processing');
    }

    try {
      formik.setStatus('Succeed');
      Object.keys(values).forEach((field) => {
        formik.setFieldTouched(field, false, false);
      });
      setTimeout(() => {
        alert(JSON.stringify(values, null, 2));
        formik.setSubmitting(false);
        formik.resetForm();
      }, 400);
    } catch (error) {
      formik.setStatus('error in form submission');
    }
  }, []);

  const formik = useFormik({
    initialValues: { email: 'eww@fdf', password: '' },
    validationSchema: Yup.object().shape({
      email: Yup.string().email('invalid email').required('Field is required'),
      password: Yup.string().required('required filed'),
    }),
    onSubmit: handleSubmitting,
  });

  return (
    <>
      <ParallaxWeb />
      <div>
        <h4>Values:</h4>
        <div>{listEls}</div>
        <input type="text" id="input" />
        {!change ? (
          <button
            type="button"
            onClick={() => {
              const el = document.getElementById('input');
              if (el.value === '') {
                return;
              }
              dispatch(adder({ task: changings(), id: listEls.length }));
              el.value = '';
            }}
          >
            Integ
          </button>
        ) : (
          <button
            type="button"
            onClick={() => {
              const el = document.getElementById('input');
              if (el.value === '') {
                return;
              }
              dispatch(
                updater({
                  task: changings(),
                  id: id,
                }),
              );
              el.value = '';
              dispatch(changer());
            }}
          >
            Save edit
          </button>
        )}
        <br />
        <button
          onClick={() => {
            dispatch(reset());
          }}
        >
          RESET
        </button>

        <div>
          <h4>Loading status: {`${loading}`}</h4>
          {/*<p>
            Loaded data:{' '}
            {data.length
              ? data.map((el) => <li>{el['transliteration']}</li>)
            : ''}
          </p>*/}
          <button onClick={() => dispatch(fetchData())}>Load Data</button>
          <ListRenderer data={data} />
        </div>
      </div>
      <div>
        <form onSubmit={formik.handleSubmit}>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              onChange={formik.handleChange}
              value={formik.values.email}
              onBlur={formik.handleBlur}
            />
            {formik.touched.email && formik.errors.email && (
              <div>{formik.errors.email}</div>
            )}
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              onChange={formik.handleChange}
              value={formik.values.password}
              onBlur={formik.handleBlur}
            />
            {formik.touched.password && formik.errors.password ? (
              <div>{formik.errors.password}</div>
            ) : null}
          </div>
          <button
            type="submit"
            disabled={formik.isSubmitting || !formik.isValid}
          >
            Submit
          </button>
          {formik.status && <div>Submission status: {formik.status}</div>}
          {formik.isValidating && <div>Validating...</div>}
          {!formik.isValid && (
            <div>Form Status: form not valid, fill correctly</div>
          )}
        </form>

        <div>
          email: {formik.values.email}
          <br />
          password: {formik.values.password}
        </div>
        <div>
          email status: {formik.touched.email && <span>email touched</span>}
          <br />
          password status:{' '}
          {formik.touched.password && <span>password touched</span>}
        </div>
        <div>
          <button onClick={() => formik.setFieldValue('email', 'adsdsdw@ddfd')}>
            Set email value
          </button>
        </div>
        <br />
        <div>
          <button
            onClick={() => formik.setFieldTouched('password', true, false)}
          >
            Set password touched
          </button>
        </div>
      </div>
      <div>
        <DynamicList />
      </div>
      <ParallaxWeb />
    </>
  );
}

const ListRenderer = memo(({ data }) => {
  const RowRenderer = useCallback(
    ({ index, key, style }) => (
      <div
        key={key}
        style={{
          ...style,
          backgroundColor: index % 2 ? 'aliceblue' : 'white',
          padding: '15px',
        }}
      >
        {data[index]['transliteration']}
      </div>
    ),
    [data],
  );
  const gridData = useMemo(
    () =>
      Array.from({ length: 10000 }, (el, index) => ({
        id: index + 1,
        description: `item ${index + 1} description`,
        name: `item ${index + 1}`,
      })),
    [],
  );

  const gridData2 = useMemo(
    () =>
      Array.from({ length: 10000 }, (el, index) => [
        index + 1,
        `item ${index + 1} description`,
        `item ${index + 1}`,
      ]),
    [],
  );

  const renderCell = useCallback(
    ({ columnIndex, key, rowIndex, style }) => {
      const cellData =
        rowIndex === 0
          ? Object.keys(gridData[0])[columnIndex]
          : gridData2[rowIndex - 1][columnIndex];
      return (
        <div
          key={key}
          style={{
            ...style,
            backgroundColor: rowIndex % 2 ? 'aliceblue' : 'white',
            fontWeight: rowIndex === 0 ? 'bold' : 'auto',
            padding: '15px',
          }}
        >
          {cellData}
        </div>
      );
    },
    [gridData2, gridData],
  );

  const headerRenderer = ({ label }) => (
    <div
      style={{
        display: '',
        textAlign: 'center',
        fontWeight: 'bold',
        padding: '0px',
        backgroundColor: '#111',
        color: '#fff',
      }}
    >
      {label}
    </div>
  );

  const reffered = useRef(null);
  const reffered2 = useRef(null);
  const reffered3 = useRef(null);

  return (
    <>
      <div
        ref={reffered}
        style={{
          backgroundColor: 'gray',
          border: '1px solid #111',
          width: '100%',
        }}
      >
        <List
          width={reffered.current ? reffered.current.offsetWidth : 0}
          //width={400}
          height={300}
          rowCount={data.length}
          rowHeight={50}
          rowRenderer={RowRenderer}
          style={{ ...listStyle, width: '100%' }}
        />
      </div>
      <br />
      <br />

      <div
        ref={reffered2}
        style={{
          backgroundColor: 'gray',
          border: '1px solid #111',
          width: '630px',
        }}
      >
        <Grid
          //width={reffered2.current ? reffered2.current.offsetWidth : 0}
          width={630}
          height={300}
          rowCount={gridData2.length + 1}
          rowHeight={50}
          columnCount={3}
          columnWidth={200}
          cellRenderer={renderCell}
          style={{
            padding: '15px',
            backgroundColor: '#fff',
            border: '2px solid lightblue',
            borderRadius: '10px',
            color: '#111',
          }}
        />
      </div>
      <br />
      <br />
      <div
        ref={reffered3}
        style={{
          backgroundColor: 'gray',
          border: '1px solid #111',
          width: '630px',
        }}
      >
        <Table
          //width={reffered2.current ? reffered2.current.offsetWidth : 0}
          width={600}
          height={300}
          headerHeight={50}
          rowCount={gridData.length}
          rowHeight={50}
          rowGetter={({ index }) => gridData[index]}
          style={{
            boxSizing: 'border-box',
            padding: '15px',
            backgroundColor: '#fff',
            border: '2px solid lightblue',
            width: '630px',
            borderRadius: '10px',
            color: '#111',
          }}
        >
          <Column
            label="ID"
            dataKey="id"
            width={200}
            headerRenderer={headerRenderer}
            style={{
              display: 'inline-block',
              width: '200px',
              boxSizing: 'border-box',

              padding: '20px',
              backgroundColor: 'lightblue',
            }}
          />
          <Column
            label="NAME"
            dataKey="name"
            width={200}
            headerRenderer={headerRenderer}
            style={{
              display: 'inline-block',
              width: '200px',
              boxSizing: 'border-box',
              padding: '20px',
              backgroundColor: 'white',
            }}
          />
          <Column
            label="DESCRIPTION"
            dataKey="description"
            width={200}
            headerRenderer={headerRenderer}
            style={{
              display: 'inline-block',
              width: '200px',
              boxSizing: 'border-box',

              padding: '20px',
              backgroundColor: 'lightblue',
            }}
          />
        </Table>
      </div>
      <br />
      <br />
      <div
        ref={reffered3}
        style={{
          backgroundColor: 'gray',
          border: '1px solid #111',
          width: '600px',
        }}
      >
        <MultiGrid
          width={600}
          height={300}
          rowCount={gridData.length + 1}
          rowHeight={50}
          columnWidth={200}
          columnCount={Object.keys(gridData[0]).length}
          fixedRowCount={1}
          fixedColumnCount={1}
          cellRenderer={({ columnIndex, key, rowIndex, style }) => {
            const cellData =
              rowIndex === 0
                ? Object.keys(gridData[0])[columnIndex]
                : gridData[rowIndex - 1][Object.keys(gridData[0])[columnIndex]];
            return (
              <div
                style={{
                  ...style,
                  backgroundColor: rowIndex % 2 ? 'aliceblue' : 'white',
                  padding: '15px',
                  fontWeight: rowIndex === 0 ? 'bold' : 'auto',
                }}
                key={key}
              >
                {cellData}
              </div>
            );
          }}
          style={listStyle}
        />
      </div>
    </>
  );
});

const listStyle = {
  padding: '15px',
  backgroundColor: '#fff',
  border: '2px solid lightblue',
  borderRadius: '10px',
};

const DynamicList = () => {
  const items = Array.from({ length: 100000 }, (el, index) => index);
  const [data, setData] = useState(items);

  const ref = useRef(null);
  const ref1 = useRef(null);

  // add a new item
  const addItem = useCallback(() => {
    setData((prev) => [...prev, data.length]);
    if (ref.current) {
      ref.current.forceUpdateGrid();
    }
  }, [data]);
  const removeItem = useCallback(() => {
    setData((prev) => prev.slice(0, data.length - 1));
    if (ref.current) {
      ref.current.recomputeRowHeights();
    }
  }, [data]);

  const rowRenderer = useCallback(
    ({ index, key, style }) => (
      <div
        key={key}
        style={{
          ...style,
          backgroundColor: index % 2 ? 'aliceblue' : 'white',
          padding: '15px',
        }}
      >
        {data[index]}
      </div>
    ),
    [data],
  );

  return (
    <div style={{ padding: '15px' }}>
      <button onClick={addItem}>Add Item</button>
      <br />
      <button onClick={removeItem}>Remove Item</button>
      <div
        //ref={ref1}
        style={{
          backgroundColor: 'gray',
          border: '1px solid #111',
          height: '300px',
        }}
      >
        <AutoSizer>
          {({ width, height }) => (
            <List
              ref={ref}
              //width={ref1.current?.offsetWidth}
              width={width}
              height={height}
              rowCount={data.length}
              rowHeight={50}
              rowRenderer={rowRenderer}
              style={listStyle}
            />
          )}
        </AutoSizer>
      </div>
      <MyComponent />
    </div>
  );
};
/**
 * style vs containerStyle
 *
 */

function MyComponent() {
  const renderCount = useRef(0);
  const [state, setState] = useState(0);

  renderCount.current++;

  return (
    <div>
      <p>Render Count: {renderCount.current}</p>
      <button onClick={() => setState((prevState) => prevState + 1)}>
        Increment State
      </button>
    </div>
  );
}

const ParallaxWeb = memo(() => {
  /*return (
    <div>
      <Parallax pages={3}>
        <ParallaxLayer
          offset={0}
          speed={0.1}
          style={{
            backgroundColor: '#eee',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '2em',
          }}
        />
        <ParallaxLayer
          offset={0}
          speed={0.5}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#111',
            fontSize: '2em',
          }}
        >
          <div>The top header section</div>
        </ParallaxLayer>

        <ParallaxLayer
          offset={1}
          speed={0.5}
          style={{
            backgroundColor: '#66bb6a',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '2em',
          }}
        />
        <ParallaxLayer
          offset={1}
          speed={1}
          style={{
            display: 'flex',
            alignItems: 'center',
            color: '#fff',
            justifyContent: 'center',
            fontSize: '2em',
          }}
        >
          Articla Section 1
        </ParallaxLayer>
        <ParallaxLayer
          offset={2}
          speed={1}
          style={{
            backgroundColor: 'magenta',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '2em',
          }}
        />
        <ParallaxLayer
          offset={2}
          speed={1.5}
          style={{
            backgroundColor: '#282c34',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            height: '25vh',
            fontSize: '2em',
          }}
        >
          &trade; &copy;
        </ParallaxLayer>
      </Parallax>
    </div>
  );*/
  return (
    <div style={{ height: '100vh' }}>
      <Parallax
        pages={3}
        style={{
          fontFamily: 'Arial, sans-serif',
        }}
      >
        <ParallaxLayer
          offset={0}
          speed={0.5}
          style={{ backgroundColor: '#f8f8f8' }}
        />

        <ParallaxLayer offset={0} speed={0.2}>
          <div style={{ textAlign: 'center', paddingTop: '50vh' }}>
            <h1>Welcome to Parallax Example</h1>
            <p>Scroll down to explore</p>
          </div>
        </ParallaxLayer>

        <ParallaxLayer
          offset={1}
          speed={0.5}
          style={{ backgroundColor: '#e0e0e0' }}
        />
        <ParallaxLayer offset={1} speed={1}>
          <div style={{ textAlign: 'center', paddingTop: '50vh' }}>
            <h2>Discover Our Features</h2>
            <p>Amazing animations</p>
          </div>
        </ParallaxLayer>

        <ParallaxLayer
          offset={2}
          speed={0.2}
          style={{ backgroundColor: '#c0c0c0' }}
        />
        <ParallaxLayer offset={2} speed={0.5}>
          <div style={{ textAlign: 'center', paddingTop: '50vh' }}>
            <h2>Join Us Today</h2>
            <p>Experience the magic</p>
          </div>
        </ParallaxLayer>
      </Parallax>
    </div>
  );
});

const AnimatableComponent = memo(() => {
  // first fade using useSpring, button on click change fade and color, and scale as well
  const [clicked, setCliked] = useState(false);
  const buttonStyles = useSpring({
    backgroundColor: clicked ? 'green' : '#111',
    scale: clicked ? 1.5 : 1,
    opacity: clicked ? 1 : 0.5,
  });
  const handleClicked = useCallback(() => setCliked(!clicked), [clicked]);

  const fadding = useSpring({
    to: { opacity: 0 },
    from: { opacity: 1 },
    config: { duration: 3000 },
    loop: true,
    //reverse: true,
  });

  const vibgroying = useSpring({
    from: { hue: 0 },
    to: { hue: 360 },
    loop: true,
    config: { duration: 3000 },
  });

  const vibFade = useSpring({
    to: { hue: 360, opacity: 0 },
    from: { hue: 0, opacity: 1 },
    config: { duration: 3000 },
    loop: true,
  });

  const SlideStyles = useSpring({
    to: [
      /*{ transform: 'translateX(0px)' },
      { transform: 'translateX(400px)' },
      { transform: 'translateX(-100px)' },
      { transform: 'translateX(400px)' },
      { transform: 'translateX(0px)' },*/

      { transform: 'translateX(400px) translateY(0px)' },
      { transform: 'translateX(400px) translateY(100px)' },
      { transform: 'translateX(-100px) translateY(100px)' },
      { transform: 'translateY(-100px) translateX(-100px)' },
      { transform: 'translateY(-100px) translateX(400px)' },
      { transform: 'translateY(0px) translateX(400px)' },
      { transform: 'translateY(0px) translateX(0px)' },
    ],
    from: { transform: 'translateX(0px) translateY(0)' },
    /*to: [{ transform: 'scale(1.5)' }, { transform: 'scale(1)' }],
    from: {
      transform: 'scale(1)',
    },*/
    loop: true,
    config: config.slow,
  });

  const items = ['Item 1', 'Item 2', 'Item 3'];

  const trail = useTrail(items.length, {
    from: { opacity: 0 },
    to: { opacity: 1 },
  });

  const firstRef = useSpringRef();
  const secondRef = useSpringRef();

  const firstProps = useSpring({
    ref: firstRef,
    from: { opacity: 0 },
    to: { opacity: 1 },
  });

  const secondProps = useSpring({
    ref: secondRef,
    from: { x: -100 },
    to: { x: 0 },
  });

  useChain([firstRef, secondRef]);

  const springArray = Array.from({ length: 10 }, (el, index) => index);
  const springs = useSprings(
    springArray.length,
    springArray.map((item, index) => ({
      transform: 'translate(100%)',
      from: {
        transform: 'translate(-100%)',
      },
      delay: index * 100,
    })),
  );

  return (
    <>
      <animated.div style={{ ...fadding, height: '50px', color: '#111' }}>
        Fadding
      </animated.div>
      <animated.div
        style={{
          height: '50px',
          margin: '10px auto',
          backgroundColor: vibgroying.hue.to((hue) => `hsl(${hue}, 100%, 50%)`),
        }}
      >
        Vibgyoring
      </animated.div>
      <animated.div
        style={{
          opacity: vibFade.opacity.to((opacity) => opacity),
          backgroundColor: vibFade.hue.to((hue) => `hsl(${hue}, 100%, 50%)`),
        }}
      >
        Fadding and vibgroying
      </animated.div>
      <animated.button
        style={{
          opacity: buttonStyles.opacity.to((val) => val),
          transform: buttonStyles.scale.to((scale) => `scale(${scale})`),
          //backgroundColor: buttonStyles.backgroundColor,
          backgroundColor: buttonStyles.backgroundColor.to((prop) => prop),
          margin: '15px',
          color: '#fff',
          width: '100px',
          padding: '20px',
        }}
        onClick={handleClicked}
      >
        Check
      </animated.button>
      <animated.div
        style={{
          ...SlideStyles,
          width: '100px',
          padding: '20px',
          margin: '20px',
          backgroundColor: '#ef23e2',
          color: '#fff',
        }}
      >
        Sliding And Translating
      </animated.div>
      {trail.map((style, index) => (
        <animated.div style={style} key={index}>
          {items[index]}
        </animated.div>
      ))}
      <div style={{ margin: '15px' }}>
        <animated.div style={firstProps}>Chain First Animation</animated.div>
        <animated.div style={secondProps}>Chain Second Animation</animated.div>
      </div>
      {springs.map((style, index) => (
        <animated.div
          style={{
            ...style,
            width: '100px',
            padding: '15px',
            margin: '10px',
            backgroundColor: 'violet',
          }}
        >
          {springArray[index]}
        </animated.div>
      ))}
      <Transitioning />
      <KeyframeExample />
      <Animation />
    </>
  );
});

function Transitioning() {
  const [items, setItems] = useState([
    { id: 1, content: 'Item 1' },
    { id: 2, content: 'Item 2' },
    { id: 3, content: 'Item 3' },
  ]);

  const transitions = useTransition(items, {
    keys: (item) => item.id,
    from: { opacity: 0, backgroundColor: 'blue' },
    enter: { opacity: 1, backgroundColor: 'green' },
    leave: { opacity: 0, backgroundColor: 'red' },
  });

  // Function to remove an item
  const removeItem = (id) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const data = ['D1', 'D2'];

  // Create spring ref for useSpring
  const springRef = useSpringRef();
  const springProps = useSpring({
    ref: springRef,
    from: { transform: 'scale(1)' },
    to: { transform: 'scale(2)' },
  });

  // Create spring ref for useTransition
  const transRef = useSpringRef();
  const transitions1 = useTransition(data, {
    ref: transRef,
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });

  // Chain the animations
  useChain([springRef, transRef]);

  return (
    <>
      <div>
        {transitions((style, item) => (
          <animated.div key={item.id} style={{ ...style, color: '#fff' }}>
            <div>
              <span>{item.content}</span>
              <button onClick={() => removeItem(item.id)}>Remove</button>
            </div>
          </animated.div>
        ))}
      </div>
      <animated.div
        style={{
          ...springProps,
          width: '50px',
          height: '50px',
          margin: '20px',
          backgroundColor: '#f2d2d2',
        }}
      >
        {transitions1((style, item) => (
          <div
            style={{
              ...style,
              width: '50px',
              height: '20px',
              backgroundColor: 'cyan',
            }}
          >
            {item}
          </div>
        ))}
      </animated.div>
    </>
  );
}

const KeyframeExample = () => {
  const { borderRadius, background, transform } = useSpring({
    from: {
      borderRadius: '0% 0% 0% 0%',
      background: 'coral',
      transform: 'rotate(0deg)',
    },

    to: [
      {
        borderRadius: '50% 0% 0% 0%',
        background: 'darksalmon',
        transform: 'rotate(45deg)',
      },
      {
        borderRadius: '50% 50% 0% 0%',
        background: 'indianred',
        transform: 'rotate(90deg)',
      },
      {
        borderRadius: '50% 50% 50% 0%',
        background: 'lightcoral',
        transform: 'rotate(135deg)',
      },
      {
        borderRadius: '50% 50% 50% 50%',
        background: 'darksalmon',
        transform: 'rotate(180deg)',
      },
      {
        borderRadius: '50% 50% 50% 0%',
        background: 'lightcoral',
        transform: 'rotate(135deg)',
      },
      {
        borderRadius: '50% 50% 0% 0%',
        background: 'indianred',
        transform: 'rotate(90deg)',
      },
      {
        borderRadius: '50% 0% 0% 0%',
        background: 'darksalmon',
        transform: 'rotate(45deg)',
      },
      {
        borderRadius: '0% 0% 0% 0%',
        background: 'coral',
        transform: 'rotate(0deg)',
      },
    ],

    loop: true,
  });

  return (
    <animated.div
      style={{
        width: '200px',
        height: '200px',
        borderRadius,
        background,
        transform,
      }}
    />
  );
};

const Animation = memo(() => {
  // nudge and pulse
  const nudge = useSpring({
    from: {
      transform: 'translateY(-75vh)',
    },
    to: [
      {
        transform: 'translateY(75vh)',
      },
      { transform: 'translateY(-75vh)' },
    ],
    loop: true,
    config: { duration: 4000 },
  });

  const pulse = useSpring({
    from: {
      filter: 'hue-rotate(0deg)',
    },
    to: [
      {
        filter: 'hue-rotate(360deg)',
      },
      {
        filter: 'hue-rotate(0deg)',
      },
    ],
    config: { duration: 24000 },
    loop: true,
  });

  const blink = useSpring({
    from: {
      opacity: 1,
    },
    to: [
      {
        opacity: 0,
      },
    ],
    config: { duration: 2500 },
    loop: true,
  });

  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          overflow: 'hidden',
          backgroundColor: 'lightblue',
        }}
      >
        <animated.div
          style={{
            width: '50vh',
            aspectRatio: '1 / 1',
            borderRadius: '50%',
            //backgroundColor: 'hsl(0, 100%, 50%)',
            backgroundColor: 'yellow',
            ...nudge,
            ...pulse,
          }}
        />
      </div>
      <div
        style={{
          height: '100vh',
          backgroundColor: 'lightblue',
        }}
      >
        <animated.div style={blink}>
          <Marquee style={{ color: 'red' }}>
            moving from left to right 1moving from left to right moving from
            moving from left to right 1moving from left to right moving from
            moving from left to right 1moving from left to right moving from
            moving from left to right 1moving from left to right moving from
            moving from left to right 1moving from left to right moving from
            moving from left to right 1moving from left to right moving from
            moving from left to right 1moving from left to right moving from
            moving from left to right 1moving from left to right moving from
            moving from left to right 1moving from left to right moving from
            moving from left to right 1moving from left to right moving from
            moving from left to right 1moving from left to right moving from
            moving from left to right 1moving from left to right moving from
            moving from left to right 1moving from left to right moving from
            moving from left to right 1moving from left to right moving from
            moving from left to right 1moving from left to right moving from
            moving from left to right 1moving from left to right moving from
            moving from left to right 1moving from left to right moving from
            moving from left to right 1moving from left to right moving from
            moving from left to right 1moving from left to right moving from
            moving from left to right 1moving from left to right moving from
            moving from left to right 1moving from left to right moving from
            moving from left to right 1moving from left to right moving from
            moving from left to right 1moving from left to right moving from
            moving from left to right 1moving from left to right moving from
            moving from left to right 1moving from left to right moving from
            moving from left to right 1moving from left to right moving from
            moving from left to right 1moving from left to right moving from
            moving from left to right 1moving from left to right moving from
            moving from left to right 1moving from left to right moving from
            moving from left to right 1moving from left to right moving from
            moving from left to right 1moving from left to right moving from
            moving from left to right 1moving from left to right moving from
            moving from left to right 1moving from left to right moving from
            moving from left to right 1moving from left to right moving from
            moving from left to right 1moving from left to right moving from
            moving from left to right 1moving from left to right moving from
            moving from left to right 1moving from left to right moving from
            moving from left to right 1moving from left to right moving from
            moving from left to right 1moving from left to right moving from
            moving from left to right 1moving from left to right moving from
            moving from left to right 1moving from left to right moving from
            moving from left to right 1moving from left to right moving from
            moving from left to right 1moving from left to right moving from
            moving from left to right 1moving from left to right moving from
            moving from left to right 1moving from left to right moving from
            moving from left to right 1moving from left to right moving from
            moving from left to right 1moving from left to right moving from
            moving from left to right 1moving from left to right moving from
          </Marquee>
        </animated.div>
      </div>
    </div>
  );
});

const Marquee = ({ children, style = {}, scrollAmount = 10, time = 25000 }) => {
  const contentRef = useRef(null);
  const [contentWidth, setContentWidth] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      if (contentRef.current) {
        setContentWidth(contentRef.current.getBoundingClientRect().width);
        setContainerWidth(
          contentRef.current.parentElement.getBoundingClientRect().width,
        );
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const scrolling = useSpring({
    from: {
      transform: 'translateX(100%)',
    },
    to: {
      transform: `translateX(-${contentWidth}px)`,
    },

    config: {
      duration: contentWidth
        ? ((contentWidth + containerWidth) / scrollAmount) * 1000
        : time,
    },
    loop: true,
  });

  return (
    <div style={{ width: '100%', overflow: 'hidden' }}>
      <animated.div
        ref={contentRef}
        style={{
          ...scrolling,
          padding: '10px',
          whiteSpace: 'nowrap',
          fontFamily: 'sans-serif',
          ...style,
        }}
      >
        {children}
      </animated.div>
    </div>
  );
};

//export default Animation;
export default AnimatableComponent;
