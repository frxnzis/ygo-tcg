import { useState, useEffect, Fragment, forwardRef } from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Stack from '@mui/material/Stack';
import Skeleton from '@mui/material/Skeleton';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import Chip from '@mui/material/Chip';
import '../App.scss';

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export const Overview = (props) => {

    const [cards, setCards] = useState([]);
    const [open, setOpen] = useState(false);
    const [currentCard, setCurrentCard] = useState();

    const handleClickOpen = (card) => {
        setCurrentCard(card);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setCurrentCard();
    };

    useEffect(() => {
        setCards(
            Array.isArray(props.cardsSearch?.data) ? props.cardsSearch.data : []
        );
    }, [props.cardsSearch])

    if (cards.length > 0) {

        const xcards = cards.slice(0, 24);

        return (
            <div>

                <Dialog
                    fullWidth={true}
                    maxWidth={'lg'}
                    open={open}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={handleClose}
                    PaperProps={{
                        style: {
                            backgroundColor: '#30303099',
                            boxShadow: 'none',
                            borderRadius: '15px',
                            border: '1px solid #555555'
                        },
                    }}
                >
                    <DialogContent className={'row'} variant="outlined">
                        <div className={'col-12 col-md-4 text-center'}>
                            <img
                                src={`${currentCard?.card_images[0]?.image_url}?w=164&h=164&fit=crop&auto=format`}
                                srcSet={`${currentCard?.card_images[0]?.image_url}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                                alt={currentCard?.name}
                                height={'100%'}
                                width={'100%'}
                                loading="lazy"
                            />
                        </div>
                        <div className={'col-12 col-md-8 text-left'}>
                            <DialogContentText
                                sx={{
                                    fontSize: '1.4rem', margin: 1, borderRadius: '10px', paddingY: 1, paddingX: 2,
                                    border: '1px solid #404040', color: 'white', background: '#00000099',
                                }}>
                                <b>{currentCard?.name}</b>
                            </DialogContentText>

                            <DialogContentText
                                sx={{
                                    fontSize: '1.2rem', margin: 1, marginTop: 2, paddingY: 1, paddingX: 2, borderRadius: '10px',
                                    border: '1px solid #404040', color: 'white', background: '#00000099',
                                }}>
                                🔸 {currentCard?.type} &nbsp;
                                🔹 {currentCard?.race} &nbsp;
                                <b>{currentCard?.level > 0 ? '​​​​ ​​​​ ​✪ ​' : ''}</b>
                                {currentCard?.level > 0 ? currentCard.level : ''} &nbsp; &nbsp;
                                <b>{currentCard?.attribute ? '✧ ' : ''}</b>
                                {currentCard?.attribute ? currentCard.attribute : ''}

                            </DialogContentText>
                            {currentCard?.atk >= 0 ?
                                <DialogContentText
                                    sx={{
                                        fontSize: '1.2rem', margin: 1, marginTop: 2, paddingY: 1, paddingX: 2, borderRadius: '10px',
                                        border: '1px solid #404040', color: 'white', background: '#00000099',
                                    }}>

                                    <b> ⚔️ {currentCard?.atk}</b> &nbsp; &nbsp;
                                    <b>{currentCard?.def >= 0 ? '🛡 ' + currentCard?.def : ''}</b>
                                </DialogContentText>
                                : null
                            }
                            <DialogContentText
                                sx={{
                                    fontSize: '1.2rem', margin: 1, marginTop: 2, paddingY: 1, paddingX: 2, borderRadius: '10px',
                                    border: '1px solid #404040', color: 'white', background: '#00000099',
                                }}>
                                {currentCard?.desc}
                            </DialogContentText>

                        </div>
                    </DialogContent>
                </Dialog>

                <ImageList sx={{ width: '100%', height: '100%' }} cols={8} rowHeight={'auto'}>
                    {xcards.map((card) => (
                        <ImageListItem key={card.card_images[0].image_url}
                            title={card.name} sx={{ cursor: 'pointer' }} onClick={() => handleClickOpen(card)} >
                            <div className={'hover14'} >
                                <figure>
                                    <img
                                        src={`${card.card_images[0]?.image_url}?w=164&h=164&fit=crop&auto=format`}
                                        srcSet={`${card.card_images[0]?.image_url}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                                        alt={card.name}
                                        loading="lazy"
                                    />
                                </figure>
                            </div>
                        </ImageListItem>
                    ))}
                </ImageList>

            </div >

        );

    }
    else {
        return (
            <div style={{ fontSize: '1.5rem', margin: 100, textAlign: 'center' }}>
                No cards found... 👾
            </div >
        );
    }

}