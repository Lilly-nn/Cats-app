"use client"
import ImageCard from "@/components/ImageCard";
import Modal from "@/components/Modal";
import SearchHeader from "@/components/SearchHeader";
import { useFetchBreeds } from "@/hooks/useFetch";
import { fetchByBreed, fetchByLimit } from "@/utils/fetchInfo";
import { limitOptions, orderOptions } from "@/utils/info/selectOptions";
import { sortDown, sortUp } from "@/utils/sort";
import { Masonry } from "@mui/lab";
import { MenuItem, Select, Tooltip } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function GalleryPage() {
  const [cats, setCats] = useState();
  const router = useRouter();
  const breedOptions = useFetchBreeds();
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sortInfo, setSortInfo] = useState({
    order: "RAND",
    breed: 'all',
    type: "all",
    limit: 5
  })

  const {order, breed, type, limit} = sortInfo;

  function handleChange(e) {
    setSortInfo({
        ...sortInfo,
        [e.target.name]: e.target.value
    })
  }


  async function fetchInfo() {
    setLoading(true);
    if(breed !== 'all') {
       const data = await fetchByBreed(breed, limit);
       setCats(data);
       setLoading(false);console.log(data);
    }else {
        const data = await fetchByLimit(limit)
        setCats(data);
        setLoading(false);
    }
    
    if(order === "ASC") {
        sortUp(cats, 'id', setCats)
    }else if(order === "DESC") {
        sortDown(cats, 'id', setCats)
    }


  } 

  useEffect(() => {
    const modalMask = document.querySelector('.modal__mask');
    const section = document.querySelector('.section');
    if(isModalOpen) {
        modalMask.classList.remove('hidden');
        section.classList.add('overflow');
    }else {
        modalMask.classList.add('hidden');
        section.classList.remove('overflow');
    }
  }, [isModalOpen])

  return (
    <section className="section">
        <Modal isOpen = {isModalOpen} setIsOpen={setIsModalOpen}/>
        <SearchHeader/>
        <div className='breeds__content'>
            <div className='breeds__sort '>
                <div className="header">
                  <button onClick={() => router.back()} className="back">
                 <img src="/assets/icons/back-20.png"/> 
                </button>
                <span className='section__title'>Gallery</span>  
                </div>
                <div className="upload-btn" onClick={() => setIsModalOpen(true)}>
                    <img src="/assets/icons/export.svg"/>
                    <button>upload</button>
                </div>
            </div>
            <div className="gallery__sort">
                <div className ="select__cont">
                    <span className="label">Order</span>
                    <Select name="order" size="small" value={order} onChange={handleChange} className="select__gallery select">
                        {orderOptions.map(option => <MenuItem key={option.value} value={option.value}>{option.text}</MenuItem>)}
                    </Select>
                </div>
                <div className ="select__cont">
                    <span className="label">Breed</span>
                    <Select name="breed" size="small" value={breed} onChange={handleChange} className="select__gallery select">
                        <MenuItem value="all">None</MenuItem>
                        {breedOptions && breedOptions.length > 0 && breedOptions.map(option =>  <MenuItem key={option.id} value={option.id}>{option.name}</MenuItem>)} 
                    </Select>
                </div>
                <div className ="select__cont">
                    <span className="label">Type</span>
                    <Select name="type" size="small" value={type} onChange={handleChange} className="select__gallery select">
                        <MenuItem value="all">All</MenuItem>
                    </Select>
                </div>
                <div className="load">
                    <div className ="select__cont">
                        <span className="label">Limit</span>
                        <Select name="limit" size="small" value={limit}className="select__breeds select" onChange={handleChange}>
                            {limitOptions.map(option => <MenuItem value={option.limit}>{`${option.limit} items per page`}</MenuItem>)}
                        </Select>
                    </div>
                    <Tooltip title="Load" >
                         <img src="/assets/icons/update-20.svg" onClick={fetchInfo} />
                    </Tooltip>
               
                </div>
              
            </div>
            <div>
            {loading && <span>loading...</span>}
          <Masonry columns={3} spacing={2} className="card__container">
               {cats && cats.length > 0 && cats.map((cat, index) => <ImageCard index={index} key={cat.id} {...cat}/>)}
         </Masonry>
        </div>
        </div>
        
    </section>
  )
}
