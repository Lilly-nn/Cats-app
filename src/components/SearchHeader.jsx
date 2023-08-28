import React from 'react'

export default function SearchHeader({name, handleChange}) {
  return (
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
  )
}
