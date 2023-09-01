"use client"
import Service from '@/API/Service'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

export default function VotingCard({id, reference_image_id: imgId}) {
  const [url, setUrl] = useState();
  async function fetchImg() {
    const url = await Service.fetchImg(imgId);
    if(url) {
      setUrl(url)
    }
  }

  useEffect(() => {
    fetchImg()
  }, [])

 
  return (
    <Link href={`/voting/${imgId}`} className={url ? 'card__inner' : "card__inner bg-none"}>
      <img className= 'card__img'
        src={url ? url : "/assets/upload-bg.png"}
        srcSet={url}
        alt="photo"
        loading='lazy'
      />
  </Link>
  )
}
