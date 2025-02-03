// src/components/Header.js
import React from 'react';
import '../styles/Header.scss';

// Memoized component for optimization
const Header = () => {
  return <header className="header"><h1>Blog Application</h1></header>;
};

export default React.memo(Header);