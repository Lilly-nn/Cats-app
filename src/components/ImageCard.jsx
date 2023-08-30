"use client"
import React, { useState } from 'react'

export default function ImageCard({id, url}) {
  const [liked, setLiked] = useState(false);
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
