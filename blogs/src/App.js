// src/App.js
import React, { Suspense, lazy } from 'react';
import { AppProvider } from './context/AppContext';
import './styles/App.scss';


// Lazy loading for performance
const Header = lazy(() => import('./components/Header'));
const BlogList = lazy(() => import('./components/BlogList'));

const App = () => {
  return (
    <AppProvider>
      <Suspense fallback={<div>Loading...</div>}>
        <Header />
        <BlogList />
      </Suspense>
    </AppProvider>
  );
};

export default App;
