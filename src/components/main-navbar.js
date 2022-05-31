import { useEffect, useState, createContext } from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import LanguageIcon from '@mui/icons-material/Language';
import IconButton from '@mui/material/IconButton';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: 'auto',
        marginRight: 0,
        width: 400,
    },
    textAlign: 'center'

}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 1),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(0)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '100%',
            '&:focus': {
                width: '100%',
            },
        },
    },
}));

const Name = createContext();

export const MainNavbar = (props) => {

    const [search, setSearch] = useState('');
    const [anchorEl, setAnchorEl] = useState(null);
    const [language, setLanguage] = useState('');

    const sendData = (data) => {
        props.parentCallback(data);
    }

    useEffect(() => {
        if (search) {
            const lang = language ? '&language=' + language : '';
            // GET request using fetch with error handling
            fetch('https://db.ygoprodeck.com/api/v7/cardinfo.php?fname=' + search + lang)
                .then(async response => {
                    const data = await response.json();
                    sendData(data);

                    // check for error response
                    if (!response.ok) {
                        // get error message from body or default to response statusText
                        const error = (data && data.message) || response.statusText;
                        return Promise.reject(error);
                    }
                })
                .catch(error => {
                    console.error('There was an error!', error);
                });
        }
    }, [search, language]);

    const handleChange = (event) => {
        const input = event.target.value;
        setSearch(input);
    }

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" color="secondary">
                <Toolbar>
                    {/* <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    */}

                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            paddingX={'auto'}
                            onChange={handleChange}
                            placeholder="Search a card…"
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </Search>
                    <FilterAltIcon sx={{ marginLeft: 1, marginRight: 'auto' }} />

                    <IconButton
                        size="small"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleMenu}
                        color="inherit"
                    >
                        <LanguageIcon />
                    </IconButton>
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={() => { setLanguage(''); setAnchorEl(null); }}>English</MenuItem>
                        <MenuItem onClick={() => { setLanguage('it'); setAnchorEl(null); }}>Italian</MenuItem>
                        <MenuItem onClick={() => { setLanguage('fr'); setAnchorEl(null); }}>French</MenuItem>
                        <MenuItem onClick={() => { setLanguage('de'); setAnchorEl(null); }}>German</MenuItem>
                        <MenuItem onClick={() => { setLanguage('pt'); setAnchorEl(null); }}>Portuguese</MenuItem>
                    </Menu>

                </Toolbar>
            </AppBar>
        </Box >
    );
};

export { Name };
