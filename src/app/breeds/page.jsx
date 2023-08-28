"use client"
import CatCard from "@/components/CatCard";
import { useFetchBreeds } from "@/hooks/useFetch.jsx";
import { sortByName, sortDown, sortUp } from "@/utils/sort.js";
import Masonry from '@mui/lab/Masonry';
import { MenuItem, Select } from "@mui/material";
import axios from "axios";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";
import fetchBreeds from "../../libs/apollo-rest/allBreeds.js";

export default function BreedsSection() {
  const [cats, setCats] = useState([]);
  const [sorted, setSorted] = useState([]);
  const breedOptions = useFetchBreeds();
  const [sortInfo, setSortInfo] = useState({
    limit: 15,
    breed: "all",
    name: ""
  });
  const { limit, breed, name } = sortInfo;
  const limitVariants = [ {text: 5, value: 5}, {text: 10, value: 10}, {text: 15, value: 15}, {text: 'none', value: 500}];
  const router = useRouter();

  async function fetchAllCats() {
    const {data} = await fetchBreeds;
    setCats(data)
  }

  async function fetchSelectedBreed(id) {
    const { data } = await axios.get(`https://api.thecatapi.com/v1/images/search?breed_ids=${id}`);
    setCats(data)
  }

  useEffect(() => {
     fetchAllCats();
  }, [])

  useEffect(() => {
    if(breed === "all") {
        fetchAllCats()
    }else {
        fetchSelectedBreed(breed);
    }   
  }, [breed])

  function handleChange(e) {
    setSortInfo({
        ...sortInfo,
        [e.target.name]: e.target.value
    })
    if(e.target.name === "name") {
        sortByName(cats, setSorted, name)
    } 
   
  }

  return (
    <section className='breeds__section section'>
        <div className='breeds__header'>
            <div className='search-cont'>
                <input name="name" value={name} onChange={handleChange} type='text' placeholder='Search for breeds by name'/>
                <img  src="/assets/icons/search.svg"/>
            </div>
            <div className='breeds__header-icons'>
                <img src="/assets/icons/like-30.svg"/>
                <img src="/assets/icons/fav-30.svg"/>
                <img src="/assets/icons/dislike-30.svg"/>
            </div>
        </div>
        <div className='breeds__content'>
            <div className='breeds__sort'>
                <button onClick={() => router.back()}  className="back">
                 <img src="/assets/icons/back-20.png"/> 
                </button>
                <span className='section__title'>Breeds</span>
                <Select name="breed" size="small" value={breed} onChange={handleChange} className="select__breeds select">
                    <MenuItem value="all">All breeds</MenuItem>
                    {breedOptions && breedOptions.length > 0 && breedOptions.map(option => {
                       return <MenuItem key={option.id} value={option.id}>{option.name}</MenuItem>
                    })} 
                </Select>
                <Select name="limit" size="small" value={limit} onChange={handleChange} className="select__limit select">
                    {limitVariants.map(el => <MenuItem key={el.value} value={el.value}>{`limit: ${el.text}`}</MenuItem>)}
                </Select>
                <div className="breeds__sort-section">
                    <img onClick={() => sortUp(cats, name, setCats)} src="assets/icons/sort-color-20.svg"/>
                    <img onClick={() => sortDown(cats, name, setCats)} src="/assets/icons/sort-revert-color-20.svg"/>
                </div>
            </div>
            
            <Masonry columns={3} spacing={2} className="card__container">
               {sorted && sorted.length > 0 && sorted.slice(0, limit).map((cat, index) => <CatCard index={index} key={cat.id} {...cat}/>)}
            
               {cats && !sorted.length && !name && cats.length > 0 && cats.slice(0, limit).map((cat, index) => <CatCard index={index} key={cat.id} {...cat}/>)}

               {name && !sorted.length && <span className="nothing-found">Nothing was found, try another search...</span>}
            </Masonry>
       
        </div>
    </section>
  )
}
