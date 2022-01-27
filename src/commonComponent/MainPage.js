import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const MainPage = () => {
  return  <div className='dashboard_stl'>
      <h1>This is Main page click <Link to='/home'><Button>Home</Button></Link></h1>
    </div>
}
