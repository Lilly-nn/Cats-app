"use client"
import VotingService from '@/API/VotingService';
import VotingContent from '@/components/VotingContent';
import { Masonry } from '@mui/lab';
import { useEffect, useState } from 'react';

export default function LikesPage() {
  const userToken = "user_892344";
  const [likedPhotos, setLikedPhotos] = useState([]);

  async function getFavourites() {
        const data = await VotingService.getVoted(userToken);
        const liked = data.filter(el => el.value === 1);
        setLikedPhotos(liked)
  }

    useEffect(() => {
        getFavourites()
    }, [])

  return (
    <VotingContent>
        <Masonry columns={3} spacing={2} className="card__container">
                {likedPhotos && likedPhotos.length > 0 && likedPhotos.map((photo, index) => ( 
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
