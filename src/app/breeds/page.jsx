"use client"
import CatCard from "@/components/CatCard";
import useFetch from "../../hooks/useFetch.jsx";


export default function BreedsSection() {
  const { cats, breedOptions } = useFetch();

  return (
    <section className='breeds__section'>
        <div className='breeds__header'>
            <div className='search-cont'>
                <input type='text' placeholder='Search for breeds by name'/>
                <img src="/assets/icons/search.svg"/>
            </div>
            <div className='breeds__header-icons'>
                <img src="/assets/icons/like-30.png"/>
                <img src="/assets/icons/fav-30.png"/>
                <img src="/assets/icons/dislike-30.png"/>
            </div>
        </div>
        <div className='breeds__content'>
            <div className='breeds__sort'>
                <img src="/assets/icons/back-20.png"/>
                <span className='section__title'>Breeds</span>
                <select className=''>
                    <option value="all">All breeds</option>
                    {breedOptions && breedOptions.length > 0 && breedOptions.map(option => {
                       return <option key={option} value={option}>{option}</option>
                    })} 
                </select>
                <select>
                    <option>limit</option>
                </select>
                <img src="assets/icons/sort-color-20.png"/>
                <img src="/assets/icons/sort-revert-color-20.png"/>
            </div>
            
            <div className="cards__container">
                {cats && cats.length > 0 && cats.map(cat => <CatCard key={cat.id} {...cat}/>)}
            </div>
        </div>
     

    </section>
  )
}
