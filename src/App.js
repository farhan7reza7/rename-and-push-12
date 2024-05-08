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
import { Formik, Form, Field, ErrorMessage, useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import fetchData from './actions';
import { adder, updater, deleter, changer, selectAllEls } from './reducer';
import { createSelector } from 'reselect';

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

  //console.log(taskss);

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

  const handleSubmitting = useCallback(
    (
      values,
      { setSubmitting, setErrors, setStatus, resetForm, setFieldTouched },
    ) => {
      try {
        setSubmitting(true);
        setStatus('submitting ...');
        Object.keys(values).forEach((field) => {
          setFieldTouched(field, false);
        });
        if (values.email !== 'eww@fdf') {
          // Set an error message for the email field
          setErrors({ email: 'Invalid email address' });
          // Set form-wide status message
          setStatus('Failed to submit form');
        } else {
          setErrors({});
          setStatus('all okay');
        }
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
          resetForm();
        }, 400);
      } catch (error) {
        setErrors({ password: 'an error occurred' + error.message });
        setStatus('error occurred');
      }
    },
    [],
  );

  const formik = useFormik({
    initialValues: { email: 'eww@fdf', password: '' },
    validationSchema: Yup.object().shape({
      email: Yup.string('email should be string ')
        .email('invalid email')
        .required('Field is required'),
      password: Yup.string('password should be string').required(
        'required filed',
      ),
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
            Add
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
          <p>
            Loaded data:{' '}
            {data.length
              ? data.map((el) => <li>{el['transliteration']}</li>)
              : ''}
          </p>
          <button onClick={() => dispatch(fetchData())}>Load Data</button>
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
            <div>{formik.errors.email}</div>
          </div>
          <div>
            <label htmlFor>Password</label>
            <input
              type="password"
              name="password"
              id="password"
              onChange={formik.handleChange}
              value={formik.values.password}
              onBlur={formik.handleBlur}
            />
            <div>{formik.errors.password}</div>
          </div>
          <button type="submit" disabled={formik.isSubmitting}>
            Submit
          </button>
        </form>
        <div>
          email: {formik.values.email}
          <br />
          password: {formik.values.password}
        </div>
        <div>
          email status: {formik.touched.email && <span>email toucehd</span>}
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
          <button onClick={() => formik.setFieldTouched('password', true)}>
            Set password touched
          </button>
        </div>
      </div>
    </>
  );
}
