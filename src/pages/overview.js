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
                >
                    <DialogContent className={'row'}>
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
                                    fontSize: '1.3rem', margin: 1, padding: 1, borderRadius: '10px',
                                    border: '2px solid lightgray'
                                }}>
                                <b> ​ ​{currentCard?.name}</b>

                            </DialogContentText>

                            <DialogContentText
                                sx={{
                                    fontSize: '1.1rem', margin: 1, marginTop: 2, padding: 1, borderRadius: '10px',
                                    border: '2px solid lightgray'
                                }}>

                                🔸 {currentCard?.type} &nbsp;
                                🔹 {currentCard?.race} &nbsp;
                                <b>{currentCard?.level > 0 ? '​​​​ ​​​​ ​✪ ​' : ''}</b>
                                {currentCard?.level > 0 ? currentCard.level : ''} &nbsp;
                                <b>{currentCard?.attribute ? '✧ ' : ''}</b>
                                {currentCard?.attribute ? currentCard.attribute : ''}

                            </DialogContentText>
                            {currentCard?.atk ?
                                <DialogContentText
                                    sx={{
                                        fontSize: '1.1rem', margin: 1, marginTop: 2, padding: 1, borderRadius: '10px',
                                        border: '2px solid lightgray'
                                    }}>
                                    &nbsp;
                                    <b> ⚔️ {currentCard?.atk}</b> &nbsp; &nbsp;
                                    <b>{currentCard?.def ? '🛡 ' + currentCard?.def : ''}</b>
                                </DialogContentText>
                                : null
                            }
                            <DialogContentText
                                sx={{
                                    fontSize: '1.1rem', margin: 1, marginTop: 2, padding: 1, borderRadius: '10px',
                                    border: '2px solid lightgray'
                                }}>
                                {currentCard?.desc}
                            </DialogContentText>

                        </div>
                    </DialogContent>
                </Dialog>

                <ImageList sx={{ width: '100%', height: '100%' }} cols={8} rowHeight={'auto'}>
                    {xcards.map((card) => (
                        <ImageListItem key={card.card_images[0].image_url}
                            title={card.name} sx={{ cursor: 'pointer' }}>
                            <img
                                src={`${card.card_images[0]?.image_url}?w=164&h=164&fit=crop&auto=format`}
                                srcSet={`${card.card_images[0]?.image_url}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                                alt={card.name}
                                loading="lazy"
                                onClick={() => handleClickOpen(card)}
                            />
                        </ImageListItem>
                    ))}
                </ImageList>

            </div>

        );

    }
    else {
        return (
            <div style={{ fontSize: '1.5rem', margin: 100, textAlign: 'center' }}>
                No cards found...
                <div>
                    <img
                        src={'https://preview.redd.it/dphgrtotvx401.jpg?auto=webp&s=65ff9392e21aeae726b0f46f06fa9bfa3173a276'}
                        srcSet={'https://preview.redd.it/dphgrtotvx401.jpg?auto=webp&s=65ff9392e21aeae726b0f46f06fa9bfa3173a276'}
                        alt={'no cards found...'}
                        loading="lazy"
                    />
                </div>

            </div >
        );
    }

}