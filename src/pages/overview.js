import { useState, useEffect, Fragment, forwardRef } from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import '../App.scss';

import Slide from '@mui/material/Slide';
import Zoom from '@mui/material/Zoom';
import Fade from '@mui/material/Fade';

const Transition = forwardRef(function Transition(props, ref) {
    return <Zoom style={{ transitionDelay: '1ms' }} ref={ref} {...props} />;
});

const Transition2 = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export const Overview = (props) => {

    const [cards, setCards] = useState([]);
    const [open, setOpen] = useState(false);
    const [currentCard, setCurrentCard] = useState();
    const [currentImg, setCurrentImg] = useState(0);

    const handleClickOpen = (card) => {
        setCurrentCard(card);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setCurrentCard();
        setCurrentImg(0);
    };

    const handleClickImage = () => {
        const cantImg = currentCard.card_images.length;
        if (cantImg > 1) {
            currentImg >= (cantImg - 1) ? setCurrentImg(0) : setCurrentImg(currentImg + 1);
        }
    }

    useEffect(() => {
        setCards(
            Array.isArray(props.cardsSearch?.data) ? props.cardsSearch.data : []
        );
    }, [props.cardsSearch])

    if (cards.length > 0) {

        const xcards = cards.slice(0, 24);

        return (
            <div className={'m-0 p-0'}>

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
                    {/* CARD INFO */}
                    <DialogContent className={'row'} variant="outlined">
                        <div className={'col-12 col-md-4 text-center'} sx={{ cursor: 'pointer' }}>
                            {/* CARD IMAGE */}
                            <img
                                src={`${currentCard?.card_images[currentImg]?.image_url}?w=164&h=164&fit=crop&auto=format`}
                                srcSet={`${currentCard?.card_images[currentImg]?.image_url}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                                alt={currentCard?.name}
                                height={'100%'}
                                width={'100%'}
                                loading="lazy"
                                style={currentCard?.card_images?.length > 1 ? { cursor: "pointer" } : null}
                                title={currentCard?.card_images?.length > 1 ? 'Click to change image' : ''}
                                onClick={() => handleClickImage()}
                            />
                        </div>
                        <div className={'col-12 col-md-8 text-left'}>

                            {/* CARD NAME */}
                            <DialogContentText
                                sx={{
                                    fontSize: '1.45rem', margin: 1, borderRadius: '10px', paddingY: 1, paddingX: 2,
                                    border: '1px solid #404040', color: 'white', background: '#00000099',
                                }}>
                                <b>{currentCard?.name}</b>
                            </DialogContentText>

                            {/* CARD TYPE, RACE, ATTRIBUTE & LEVEL*/}
                            <DialogContentText
                                sx={{
                                    fontSize: '1.2rem', margin: 1, marginTop: 2, paddingY: 1, paddingX: 2, borderRadius: '10px',
                                    border: '1px solid #404040', color: 'white', background: '#00000099',
                                }}>
                                🔹 {currentCard?.type} &nbsp;
                                🔸 {currentCard?.race} &nbsp;&nbsp;
                                <b>{currentCard?.attribute ? '✧ ' : ''}</b>
                                {currentCard?.attribute ? currentCard.attribute : ''}
                                &nbsp; <b>{currentCard?.level > 0 ? '​​​​ ​​​​ ​✪ ​' : ''}</b>
                                {currentCard?.level > 0 ? currentCard.level : ''}
                            </DialogContentText>

                            {/* CARD ATK-DEF & SCALE */}
                            {currentCard?.atk >= 0 ?
                                <DialogContentText
                                    sx={{
                                        fontSize: '1.2rem', margin: 1, marginTop: 2, paddingY: 1, paddingX: 2, borderRadius: '10px',
                                        border: '1px solid #404040', color: 'white', background: '#00000099',
                                    }}>
                                    <b>  {`⚔️ ${currentCard?.atk}`}</b> &nbsp;
                                    <b>{currentCard?.def >= 0 ? ` ​/ ​ 🛡 ${currentCard.def}` : ''}</b>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    <b>{currentCard?.scale >= 0 ? `◆ ${currentCard.scale} ⇌ ${currentCard.scale} ◇` : ''}</b>

                                </DialogContentText>
                                : null
                            }



                            {/* CARD DESCRIPTION */}
                            <DialogContentText
                                sx={{
                                    fontSize: '1.2rem', margin: 1, marginTop: 2, paddingY: 1, paddingX: 2, borderRadius: '10px',
                                    border: '1px solid #404040', color: 'white', background: '#00000099',
                                }}>
                                {currentCard?.desc}
                            </DialogContentText>

                            {/* CARD ID & ARCHETYPE */}
                            <DialogContentText
                                sx={{
                                    fontSize: '1.2rem', margin: 1, marginTop: 2, paddingY: 1, paddingX: 2, borderRadius: '10px',
                                    border: '1px solid #404040', color: 'white', background: '#00000099',
                                }}>
                                {`ID: ${currentCard?.id}`} &nbsp;&nbsp;&nbsp;
                                {currentCard?.archetype ? `◐ Archetype: ${currentCard?.archetype}` : ''}
                            </DialogContentText>

                        </div>
                    </DialogContent>
                </Dialog>

                {/* CARDS LIST */}
                <ImageList sx={{ margin: 0, padding: 0, maxWidth: 'auto', width: '100%' }} cols={6} rowHeight={'auto'}>
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