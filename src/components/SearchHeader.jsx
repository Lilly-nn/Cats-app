"use client"
import { useRouter } from "next/navigation"

export default function SearchHeader({name, handleChange}) {
  const router = useRouter();
  return (
    <div className='breeds__header'>
            <div className='search-cont'>
                <input name="name" autoComplete="off" value={name} onChange={handleChange} type='text' placeholder='Search for breeds by name'/>
                <img  src="/assets/icons/search.svg"/>
            </div>
            <div className='breeds__header-icons'>
                <img onClick={() => router.push('/likes')} src="/assets/icons/like-30.svg"/>
                <img onClick={() => router.push('/favourites')} src="/assets/icons/fav-30.svg"/>
                <img onClick={() => router.push('/dislikes')} src="/assets/icons/dislike-30.svg"/>
            </div>
    </div>
  )
}
