import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { Footer, Navbar } from './components';
import { AboutUs, Contact, Home, Landing, Profile, Report, Settings, Track } from './pages';

function App() {
  const routes = [
    { path: '/', element: <Landing /> },
    { path: '/home', element: <Home /> },
    { path: '/profile', element: <Profile /> },
    { path: '/report', element: <Report /> },
    { path: '/track', element: <Track /> },
    { path: '/about', element: <AboutUs /> },
    { path: '/contact', element: <Contact /> },
    { path: '/settings', element: <Settings /> },
  ]
  return (
    <div>
      <BrowserRouter>
      <Navbar/>
        <Routes>
          {routes.map((route, index) => {
            return <Route
              key={index}
              path={route.path}
              element={route.element}
              exact
            />
          })}
        </Routes>
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
