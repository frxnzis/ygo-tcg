import { useEffect, useState, createContext, forwardRef } from 'react';
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

import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Slide from '@mui/material/Slide';

import YGOlogo from '../assets/images/ygo.png'

import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

const Transition2 = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    width: '100%',
    height: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: 'auto',
        marginRight: 0,
        paddingY: 0,
        marginY: 0,
        width: '30%',
        height: 37,
        textAlign: 'center'
    },
    textAlign: 'center'

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

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.up('sm'));

    const [search, setSearch] = useState('');
    const [anchorEl, setAnchorEl] = useState(null);
    const [language, setLanguage] = useState('');
    const [open, setOpen] = useState(false);

    const sendData = (data) => {
        props.parentCallback(data);
    }

    useEffect(() => {
        if (search && search.length > 0) {
            const lang = language ? '&language=' + language : '';
            // GET request using fetch with error handling
            fetch('https://db.ygoprodeck.com/api/v7/cardinfo.php?fname=' + search + lang + '&misc=yes')
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
                    //console.error('There was an error!', error);
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

    const handleOpenDialog = () => {
        setOpen(true);
    };

    const handleCloseDialog = () => {
        setOpen(false);
    };

    return (

        <Box sx={{ flexGrow: 1 }}>

            {/* CARDS FILTER */}
            <Dialog
                fullWidth={true}
                maxWidth={'xs'}
                open={open}
                TransitionComponent={Transition2}
                keepMounted
                onClose={handleCloseDialog}
                scroll={'paper'}
                PaperProps={{
                    style: {
                        backgroundColor: 'white',
                        boxShadow: 'none',
                        borderRadius: '15px',
                        border: '1px solid #555555',
                        borderColor: 'white',
                        maxHeight: 'auto'
                    },
                }}
            >

                <DialogContent className={'row m-0 p-0'} variant="outlined">
                    <div className={'col-12 text-center m-0 p-0'} >

                    </div>
                </DialogContent>
            </Dialog>

            {/* APP BAR */}
            <AppBar position="static" style={{ background: '#3d5afe' }}>
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

                    {/* LOGO */}
                    <img
                        title={'Logo'}
                        src={YGOlogo}
                        srcSet={YGOlogo}
                        alt={'Yu-Gi-Oh! Logo'}
                        loading="eager"
                        style={{
                            display: 'block',
                            width: isMobile ? '8em' : '20%',
                            cursor: 'pointer',
                            marginRight: isMobile ? 0 : 4
                        }}
                    />

                    {/* SEARCH INPUT */}
                    <Search style={{ margin: 'auto' }}>
                        <StyledInputBase
                            padding={0}
                            margin={0}
                            onChange={handleChange}
                            placeholder="Search cards…"
                        />
                    </Search>

                    {/* FILTER */}
                    {/*
                    <IconButton
                        sx={{ marginLeft: 0, marginRight: 'auto' }}
                        size="small"
                        aria-label="language"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={() => handleOpenDialog()}
                        color="inherit"
                    >
                        <FilterAltIcon />
                    </IconButton>
                    */}

                    {/* LANGUAGE */}
                    <IconButton
                        size="small"
                        aria-label="language"
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
