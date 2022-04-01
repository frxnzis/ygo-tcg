import { useState, useEffect, Fragment } from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Stack from '@mui/material/Stack';
import Skeleton from '@mui/material/Skeleton';

export const Overview = (props) => {

    const [cards, setCards] = useState([]);

    useEffect(() => {
        setCards(
            Array.isArray(props.cardsSearch?.data) ? props.cardsSearch.data : []
        );
    }, [props.cardsSearch])

    if (cards.length > 0) {

        const xcards = cards.slice(0, 50);

        console.log(xcards);

        return (
            <ImageList sx={{ width: '100%', height: '100%' }} cols={8} rowHeight={'auto'}>
                {xcards.map((card) => (
                    <ImageListItem key={card.card_images[0].image_url}>
                        <img
                            src={`${card.card_images[0]?.image_url}?w=164&h=164&fit=crop&auto=format`}
                            srcSet={`${card.card_images[0]?.image_url}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                            alt={card.name}
                            loading="lazy"
                        />

                       
                    </ImageListItem>
                ))}
            </ImageList>
        );

    }
    else {
        return (
            <div style={{ marginTop: 100, textAlign: 'center' }}>
                No cards matching the search 🥲
            </div >
        );
    }

}