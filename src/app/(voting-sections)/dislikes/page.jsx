"use client"
import VotingService from '@/API/VotingService';
import VotingContent from '@/components/VotingContent';
import { Masonry } from '@mui/lab';
import { useEffect, useState } from 'react';

export default function LikesPage() {
  const userToken = "user_892344";
  const [dislikedPhotos, setDisLikedPhotos] = useState([]);

  async function getFavourites() {
        const data = await VotingService.getVoted(userToken);
        const disliked = data.filter(el => el.value === -1);
        setDisLikedPhotos(disliked)
  }

    useEffect(() => {
        getFavourites()
    }, [])

  return (
    <VotingContent>
        <Masonry columns={3} spacing={2} className="card__container">
                {dislikedPhotos && dislikedPhotos.length > 0 && dislikedPhotos.map((photo, index) => ( 
                <div className='card__inner photo' index={index} key={photo.id}>
                  <img  className= 'card__img'
                      src={photo.image.url}
                      alt="cat card"
                      loading='lazy'/>
                </div>
                ))}
        </Masonry>
    </VotingContent>
  )
}
