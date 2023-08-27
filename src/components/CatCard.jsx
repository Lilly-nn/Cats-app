"use client"
import axios from 'axios'
import React, { useEffect, useState } from 'react'

export default function CatCard({name, weight, id, temperament, life_span, origin, reference_image_id: imgId}) {
  const [img, setImg] = useState(null);

  async function fetchImage() {
    const {data} = await axios.get(`https://api.thecatapi.com/v1/images/${imgId}`);
     setImg(data.url)
  }

  useEffect(() => {
    if(imgId) {
        fetchImage()
    }

  }, [])

  return (
    <div className='card'>
        <img src={img}/>
    </div>
  )
}
