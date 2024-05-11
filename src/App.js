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
import { memo, useCallback, useMemo, useRef } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import fetchData from './actions';
import { adder, updater, deleter, changer, selectAllEls } from './reducer';
import { createSelector } from 'reselect';
import { List, Grid, Table, Column } from 'react-virtualized';

const DEFAULT = 'DEFAULT';

const reset = () => ({ type: DEFAULT });

export default function App() {
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
    ({ columnIndex, key, rowIndex, style }) => (
      <div
        key={key}
        style={{
          ...style,
          backgroundColor: rowIndex % 2 ? 'aliceblue' : 'white',
          padding: '15px',
        }}
      >
        {gridData[rowIndex][columnIndex]}
      </div>
    ),
    [gridData],
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
          style={listStyle}
        />
      </div>
      <br />
      <div
        ref={reffered2}
        style={{
          backgroundColor: 'gray',
          border: '1px solid #111',
          width: '100%',
        }}
      >
        <Grid
          //width={reffered2.current ? reffered2.current.offsetWidth : 0}
          width={600}
          height={300}
          rowCount={gridData2.length}
          rowHeight={50}
          columnCount={3}
          columnWidth={200}
          cellRenderer={({ columnIndex, key, rowIndex, style }) => (
            <div
              key={key}
              style={{
                ...style,
                backgroundColor: rowIndex % 2 ? 'aliceblue' : 'white',
                padding: '15px',
              }}
            >
              {gridData2[rowIndex][columnIndex]}
            </div>
          )}
          style={{
            padding: '15px',
            backgroundColor: '#fff',
            border: '2px solid lightblue',
            borderRadius: '10px',
            color: '#111',
          }}
        />
      </div>
      <div
        ref={reffered3}
        style={{
          backgroundColor: 'gray',
          border: '1px solid #111',
          width: '100%',
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
            padding: '15px',
            backgroundColor: '#fff',
            border: '2px solid lightblue',
            borderRadius: '10px',
            color: '#111',
          }}
        >
          <Column
            label="ID"
            dataKey="id"
            width={200}
            style={{
              display: 'inline-block',
              textAlign: 'center',
              padding: '20px',
              backgroundColor: 'lightblue',
            }}
          />
          <Column
            label="NAME"
            dataKey="name"
            width={200}
            style={{
              display: 'inline-block',
              textAlign: 'center',
              padding: '20px',
              backgroundColor: 'white',
            }}
          />
          <Column
            label="DESCRIPTION"
            dataKey="description"
            width={200}
            style={{
              display: 'inline-block',
              textAlign: 'center',
              padding: '20px',
              backgroundColor: 'lightblue',
            }}
          />
        </Table>
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
