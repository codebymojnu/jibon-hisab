import { Box, CircularProgress, Container, Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import Day from '../Day/Day';

const Days = () => {
    const { user } = useAuth();
    const [days, setDays] = useState([]);

    useEffect(() => {
        fetch(`https://obscure-basin-50456.herokuapp.com/days/${user?.email}`)
            .then(res => res.json())
            .then(data => setDays(data));
    }, [user])
    
    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
                {

                    days.length === 0 && <div>
                        <div className="d-flex justify-content-center mt-5">
                            <Box sx={{ display: 'flex' }}>
                                <CircularProgress />
                            </Box>
                        </div>
                        <h6 className="text-center mt-3">Loading...</h6>
                    </div>

                }
                {
                    days.map((day, index) => <Day day={day} key={index}></Day>)
                }
            </Grid>
        </Container>
    );
};

export default Days;