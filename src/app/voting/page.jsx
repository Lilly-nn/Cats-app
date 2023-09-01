"use client"
import SearchHeader from '@/components/SearchHeader';
import VotingCard from '@/components/VotingCard.jsx';
import { Masonry } from '@mui/lab';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import fetchBreeds from "../../libs/apollo-rest/allBreeds.js";


export default function VotingPage() {
  const [cats, setCats] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function fetchAllCats() {
      const {data} = await fetchBreeds;
      setCats(data)
  
  }

  useEffect(() => {
    if(!cats.length) {
      fetchAllCats()
    }
  }, [])

  
  return (
    <section className="section">
    <SearchHeader/>
    <div className='breeds__content'>
        <div className='breeds__sort '>
            <div className="header">
              <button onClick={() => router.back()} className="back">
             <img src="/assets/icons/back-20.png"/> 
            </button>
            <span className='section__title'>Voting</span>  
            </div>
        </div>
        <div>
        {loading && <span>loading...</span>}
      <Masonry columns={3} spacing={2} className="card__container">
           {cats && cats.length > 0 && cats.map((cat, index) => <VotingCard key={cat.id} {...cat}/>)}
     </Masonry>
    </div>
    </div>
    
</section>
)
}
