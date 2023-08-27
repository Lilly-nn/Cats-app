"use client"
import CatCard from "@/components/CatCard";
import useFetch from "@/hooks/useFetch.jsx";
import Masonry from '@mui/lab/Masonry';
import { MenuItem, Select } from "@mui/material";
import Link from "next/link";
import { useState } from "react";

export default function BreedsSection() {
  const { cats, breedOptions } = useFetch();
  const [limit, setLimit] = useState(15);
  const limitVariants = [ {text: 5, value: 5}, {text: 10, value: 10}, {text: 15, value: 15}, {text: 'none', value: 500}];
 
  function handleChange(e) {
    setLimit(e.target.value)
  }
  return (
    <section className='breeds__section'>
        <div className='breeds__header'>
            <div className='search-cont'>
                <input type='text' placeholder='Search for breeds by name'/>
                <img  src="/assets/icons/search.svg"/>
            </div>
            <div className='breeds__header-icons'>
                <img src="/assets/icons/like-30.png"/>
                <img src="/assets/icons/fav-30.png"/>
                <img src="/assets/icons/dislike-30.png"/>
            </div>
        </div>
        <div className='breeds__content'>
            <div className='breeds__sort'>
                <Link href="/">
                 <img className="back" src="/assets/icons/back-20.png"/>
                </Link>
                <span className='section__title'>Breeds</span>
                <Select size="small" value="all" className="select__breeds select">
                    <MenuItem value="all">All breeds</MenuItem>
                    {breedOptions && breedOptions.length > 0 && breedOptions.map(option => {
                       return <MenuItem key={option} value={option}>{option}</MenuItem>
                    })} 
                </Select>
                <Select size="small" value={limit} onChange={handleChange} className="select__limit select">
                    {limitVariants.map(el => <MenuItem value={el.value}>{`limit: ${el.text}`}</MenuItem>)}
                </Select>
                <img src="assets/icons/sort-color-20.png"/>
                <img src="/assets/icons/sort-revert-color-20.png"/>
            </div>
            
            <Masonry columns={3} spacing={2} className="card__container">
               {cats && cats.length > 0 && cats.slice(0, limit).map((cat, index) => <CatCard index={index} key={cat.id} {...cat}/>)}
            </Masonry>
       
        </div>
     

    </section>
  )
}
