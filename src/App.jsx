
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Login from "./Auth/Login"
import Signup from "./Auth/Signup"
import Home from "./pages/Home"
import Layout from './components/Layout'

function App() {

  const router = createBrowserRouter([
    {
      path:"/",
    element : <Layout> <Home /></Layout>  ,
    },
    {
      path:"/signup",
      element :  <Layout><Signup /></Layout> ,

    },
    {
      path : "/login",
      element : <Layout> <Login /></Layout>
    },
   
  ])


  return (
        
    
    <RouterProvider router={router} />



  )
}

export default App







// import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
// import { lazy, Suspense } from 'react';
// import './App.css';

// const Login = lazy(() => import('./Auth/Login'));
// const Signup = lazy(() => import('./Auth/Signup'));
// const Home = lazy(() => import('./pages/Home'));

// function App() {
//   const isAuthenticated = true; // Replace with actual auth logic

//   const router = createBrowserRouter([
//     {
//       path: "/",
//       element: <Suspense fallback={<div>Loading...</div>}><Login /></Suspense>,
//     },
//     {
//       path: "/signup",
//       element: <Suspense fallback={<div>Loading...</div>}><Signup /></Suspense>,
//     },
//     {
//       path: "/home",
//       element: isAuthenticated ? (
//         <Suspense fallback={<div>Loading...</div>}><Home /></Suspense>
//       ) : (
//         <Navigate to="/" />
//       ),
//     },
//     {
//       path: "*",
//       element: <div>Page Not Found</div>,
//     },
//   ]);

//   return <RouterProvider router={router} />;
// }

// export default App;
