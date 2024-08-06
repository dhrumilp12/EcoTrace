import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import {  Footer, Navbar } from './components';
import { AboutUs, Contact, Home, Landing, Profile, Report, Settings,  Signup, Login, ForgotPassword, ResetPassword, MapComponent, CreateEventForm, EventList, Forum } from './pages';
import ProtectedRoute from './proctectedRoute';

function App() {
  const routes = [
    { path: '/', element: <Landing /> },
    { path: '/home', element: <Home /> , protected: true },
    { path: '/profile', element: <Profile /> , protected: true },
    { path: '/report', element: <Report /> , protected: true },
    { path: '/about', element: <AboutUs /> , protected: true },
    { path: '/contact', element: <Contact /> , protected: true },
    { path: '/settings', element: <Settings /> , protected: true },
    { path: '/map', element: <MapComponent /> , protected: true },
    {path: '/create-event', element: <CreateEventForm />, protected: true},
    {path: '/event-list', element: <EventList />, protected: true},
    { path: '/signup', element: <Signup /> },
    { path: '/login', element: <Login /> },
    { path: '/forgot-password', element: <ForgotPassword /> },
    { path: '/reset_password/:token', element: <ResetPassword /> },
    {path: '/forum', element: <Forum />, protected: true}
  ]
  return (
    <div>
      <BrowserRouter>
      {/* <Navbar/> */}
        <Routes>
          {routes.map((route, index) => {
            if (route.protected) {
              return (
                <Route key={index} path={route.path} element={<ProtectedRoute>{route.element}</ProtectedRoute>} />
              );
            } else {
              return (
                <Route key={index} path={route.path} element={route.element} />
              );
            }
          })}
        </Routes>
        {/* <Footer/> */}
      </BrowserRouter>
    </div>
  );
}

export default App;
