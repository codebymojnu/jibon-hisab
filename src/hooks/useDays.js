import React, { useEffect, useState } from 'react';
import useAuth from './useAuth';

const useDays = () => {
    const { user } = useAuth();
    const [days, setDays] = useState([]);

    useEffect(() => {
        fetch(`https://obscure-basin-50456.herokuapp.com/days/${user?.email}`)
            .then(res => res.json())
            .then(data => setDays(data));
    }, [user])
    
    return {
        days
    };
};

export default useDays;