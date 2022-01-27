import React from 'react';
import { Link } from 'react-router-dom';

export const MainPage = () => {
  return <div>
      <h1>This is Main page click <Link to='/home'>Home Page</Link></h1>
  </div>;
}
