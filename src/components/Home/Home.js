import React from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import Days from '../Days/Days';
import Register from '../Register/Register';

const Home = () => {
    const { user } = useAuth();
    return (
        <div>
           {
               !user?.email && <Register/>
           }
           {
               user && 
               <div style={{marginTop: '40px', textAlign: 'center'}}>
                   <Link to='/add'>Add Your Day</Link>
                </div>
           }
           {
               user?.email && <Days/>
           }
        </div>
    );
};

export default Home;