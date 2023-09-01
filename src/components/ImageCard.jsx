"use client"
import VotingService from '@/API/VotingService';
import { useEffect, useState } from 'react';

export default function ImageCard({id, url, isLiked, cats, setCats}) {
  const [liked, setLiked] = useState(isLiked || false);
  const userToken = "user_892344";

  async function deleteFromDB(id) {
      await VotingService.unlike(id);
      const filtered = cats.filter(cat => cat.id !== id);
      setCats(filtered)     
  }

  async function addToFavourites() {
    await VotingService.like(id, userToken);
  }

  useEffect(() => {
    if(!liked && id) {
      deleteFromDB(id)
    }else if(liked && id) {
      addToFavourites()
    }
  }, [liked])
  
  return (
    <div className='card__inner'>
      <img className= 'card__img'
        src={url}
        alt="cat card"
        loading='lazy'
      />
      <img onClick={() => setLiked(!liked)} className='heart' src={liked ? "assets/icons/fav-color-30.svg" : "assets/icons/fav-30.svg"}/>
  </div>
  )
}
