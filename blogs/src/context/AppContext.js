import React, { createContext, useReducer } from 'react';

const AppContext = createContext();

// Reducer for state management
const reducer = (state, action) => {
  switch (action.type) {
    case 'LIKE_POST':
      return {
        ...state,
        posts: state.posts.map(post => 
          post.id === action.payload ? { ...post, likes: post.likes + 1 } : post
        )
      };
    default:
      return state;
  }
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, { posts: [] });

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };