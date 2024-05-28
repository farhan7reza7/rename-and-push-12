import { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import routesConfig from './routesConfig';

const AppRoutes = () => {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {routesConfig.map((el, index) => {
            if (
              el.path === 'contact' ||
              el.path === 'about' ||
              el.path === 'user/:id'
            ) {
              return (
                <Route
                  key={index}
                  path={el.path}
                  element={<ProtectedRoute>{el.element}</ProtectedRoute>}
                >
                  {el.children &&
                    el.children.map((elC, indexC) => (
                      <Route
                        key={indexC}
                        path={elC.path}
                        element={elC.element}
                      />
                    ))}
                </Route>
              );
            }
            return (
              <Route key={index} path={el.path} element={el.element}>
                {el.children &&
                  el.children.map((elC, indexC) => (
                    <Route key={indexC} path={elC.path} element={elC.element} />
                  ))}
              </Route>
            );
          })}

          {/* <Route path="/" exact element={<Home />} />
          <Route
            path="/about"
            element={
              <ProtectedRoute>
                <About />
              </ProtectedRoute>
            }
          />
          <Route
            path="/contact"
            element={
              <ProtectedRoute>
                <Contact />
              </ProtectedRoute>
            }
          />
          <Route path="/in" element={<LogIn />} />
          <Route path="/out" element={<LogOut />} />
          <Route path="/up" element={<SignUp />} />
          <Route path="*" element={<NotFound />} />*/}
        </Routes>
      </Suspense>
    </>
  );
};

export default AppRoutes;
