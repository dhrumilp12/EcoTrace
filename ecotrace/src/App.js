import React from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import { Footer, Navbar, Notification } from './components';
import { AboutUs, NewHome, Contact, Landing, Profile, Report, Settings, Signup, Login, ForgotPassword, EnvironmentalForm,ResetPassword,  CreateEventForm, EventList, Forum, HandleLoginRedirect } from './pages';
import ProtectedRoute from './proctectedRoute';

function App() {
  const routes = [
    { path: '/', element: <Landing /> },
    
    { path: '/profile', element: <Profile />, protected: true },
    { path: '/report', element: <Report />, protected: true },
    { path: '/about', element: <AboutUs />, protected: true },
    { path: '/contact', element: <Contact />, protected: true },
    { path: '/settings', element: <Settings />, protected: true },
    {path: '/environmental-form', element: <EnvironmentalForm />, protected: true},
    { path: '/create-event', element: <CreateEventForm />, protected: true },
    { path: '/event-list', element: <EventList />, protected: true },
    { path: '/signup', element: <Signup /> },
    { path: '/login', element: <Login /> },
    { path: '/forgot-password', element: <ForgotPassword /> },
    { path: '/reset_password/:token', element: <ResetPassword /> },
    { path: '/forum', element: <Forum />, protected: true },
    {path: '/home', element: <NewHome/>, protected: true},
    { path: '/handle-login-redirect', element: <HandleLoginRedirect />},
    
    
  ];

  const noFooterRegex = /^\/(signup|login|forgot-password|reset_password\/[^\/]+|)$/;

  const Layout = () => {
    const location = useLocation();
    

    // Use regex to test the current pathname
    const showFooter = !noFooterRegex.test(location.pathname);

    return (
      <div>
        
        <Routes>
          {routes.map((route, index) => (
            <Route key={index} path={route.path} element={route.protected ? <ProtectedRoute>{route.element}</ProtectedRoute> : route.element} />
          ))}
        </Routes>
        {}
        
        {showFooter && <Footer />}
      </div>
    );
}




  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}

export default App;
