"use client"
import ImageCard from '@/components/ImageCard';
import VotingContent from '@/components/VotingContent'
import { Masonry } from '@mui/lab';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function FavouritesPage() {
    const userToken = "user_892344";
    const [likedPhotos, setLikedPhotos] = useState([]);

    async function getFavourites() {
        const res = await axios.get(`https://api.thecatapi.com/v1/favourites?sub_id=${userToken}`, {
            headers: {
              'Content-Type': 'application/json',
              'x-api-key': process.env.NEXT_PUBLIC_CAT_API
            }
          });
          setLikedPhotos(res.data);
    }

    useEffect(() => {
        getFavourites()
    }, [])
    
    return (
        <VotingContent>
            <Masonry columns={3} spacing={2} className="card__container">
                {likedPhotos && likedPhotos.length > 0 && likedPhotos.map((photo, index) => <ImageCard index={index} key={photo.id} id={photo.id} isLiked={true} url={photo.image.url} cats={likedPhotos} setCats={setLikedPhotos}/>)}
            </Masonry>
        </VotingContent>
    )
}
