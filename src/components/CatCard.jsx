"use client"
import axios from 'axios';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function CatCard({name, index, id, url, reference_image_id: imgId}) {
  const [img, setImg] = useState(null);

  async function fetchImage() {
    const {data} = await axios.get(`https://api.thecatapi.com/v1/images/${imgId}`);
     setImg(data.url)
  }

  useEffect(() => {
    if(imgId && !url) {
        fetchImage()
    }

  }, [])

  return (
    <Link href={`/breeds/${id}`} key={index} className={img || url ? 'card__inner' : "card__inner bg-none"}>
      <img className= 'card__img'
        src={url ? url : img ? `${img}?w=162&auto=format` : "/assets/upload-bg.png"}
        srcSet={url ? url : img ? `${img}?w=162&auto=format&dpr=2 2x` : ""}
        alt={name}
        loading='lazy'
      />
      {!url &&  <span className='card__name'>{name}</span>}
      
  </Link>
  )
}


