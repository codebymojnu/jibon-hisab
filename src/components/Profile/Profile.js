import React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { Avatar, Button, Paper, Stack, Typography } from '@mui/material';
import useAuth from '../../hooks/useAuth';


const Profile = () => {
    const { user } = useAuth();
  

    return (
        <div>
            <Container component="main" maxWidth="lg">
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Button variant='contained' color="success" size='small' sx={{mb: 2}}>Edit Profile</Button>
                    <Stack direction="row" spacing={2}>
                        <Avatar
                            alt={user?.displayName}
                            src={user?.photoURL}
                            sx={{ width: 150, height: 150 }}
                        />
                    </Stack>
                    <Typography component="h2" variant="h5"
                        sx={{ mt: 2 }}
                    >
                        {user?.displayName}
                    </Typography>
                    <Typography component="h2" variant="h5"
                        sx={{ mt: 2, textAlign: 'left', mb: 2}}
                    >
                        {user?.email}
                    </Typography>
                    <Paper
                        sx={{
                            p: 1,
                            mt: 5,
                            width: '100%',
                            height: '240'
                        }}
                        spacing={3}
                    >
                        <Typography component="h5" variant="h5"
                            sx={{ mt: 2, textAlign: 'left' }}
                        >
                            Recent Finished Courses
                        </Typography>
                    </Paper>
                </Box>
            </Container>
        </div>
    );
};

export default Profile;