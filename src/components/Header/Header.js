import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { Badge } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useHistory } from 'react-router-dom';
import useFirebase from '../../hooks/useFirebase';
import { DateRange } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import useDays from '../../hooks/useDays';
import useAuth from '../../hooks/useAuth';

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        right: -7,
        top: 12,
        color: '#FFF',
        padding: '0 4px',
        fontSize: '21px'
    },
}));

const Header = () => {
    const { user, logOut } = useAuth();
    const { days } = useDays();

    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const history = useHistory();

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    // log In Path
    const changeRoute = () => {
        history.push('/login');
    }

    // onClick change route to profile
    const changeRouteToProfile = () => {
        history.push('/profile');
        handleCloseUserMenu();
    }

    // onClick go To Home
    const goToHome = () => {
        history.push('/');
    }

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ mr: 2, display: { xs: 'none', md: 'flex', cursor: 'pointer' } }}
                        onClick={() => goToHome()}
                    >
                        Jiboner Hisab
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            <MenuItem onClick={handleCloseNavMenu}>
                                <Typography textAlign="left">Find</Typography>
                            </MenuItem>
                        </Menu>
                    </Box>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>

                    </Box>
                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Days" sx={{ marginRight: '5px' }}>
                            <IconButton
                                size="large"
                                aria-label="show diamond"
                                color="inherit"

                            >
                                <Link to="/find" style={{fontSize: '18px', color: 'white', textDecoration: 'none'}}>Find</Link>
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Add Your Day" sx={{ marginRight: '5px' }}>
                            <IconButton
                                size="large"
                                aria-label="show diamond"
                                color="inherit"

                            >
                                <Link to="/add" style={{fontSize: '18px', color: 'white', textDecoration: 'none'}}>Add</Link>
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Total Days" sx={{ marginRight: '10px' }}>
                            <IconButton
                                size="large"
                                aria-label="show diamond"
                                color="inherit"

                            >
                                <StyledBadge badgeContent={days.length}>
                                    <DateRange sx={{
                                        color: 'white',
                                        fontSize: '21px'
                                    }} />
                                </StyledBadge>
                            </IconButton>
                        </Tooltip>
                        {
                            user?.email ? <Tooltip title="Profile">
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    <Avatar alt="Remy Sharp" src={user?.photoURL} />
                                </IconButton>
                            </Tooltip>
                                :
                                <Tooltip title="Login" sx={{ marginRight: '17px' }}>
                                    <IconButton
                                        size="small"
                                        aria-label="login"
                                        color="inherit"
                                        onClick={() => changeRoute()}
                                    >
                                        Login
                                    </IconButton>
                                </Tooltip>
                        }
                        {user?.email && <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >

                            {
                                user?.email && <MenuItem>
                                    <Typography textAlign="center" onClick={changeRouteToProfile}>Profile</Typography>
                                </MenuItem>
                            }
                            {
                                user?.email && <MenuItem onClick={logOut}>
                                    <Typography textAlign="center">Logout</Typography>
                                </MenuItem>
                            }

                        </Menu>
                        }
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};
export default Header;