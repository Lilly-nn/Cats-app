"use client"
import Service from "@/API/Service";
import VotingService from "@/API/VotingService";
import SearchHeader from "@/components/SearchHeader";
import { getCurrentTime } from "@/utils/getCurrentTime";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function VotingPage() {
    const params = useParams();
    const router = useRouter();
    const {id} = params;
    const [url, setUrl] = useState(null);
    const userToken = "user_892344";
    const [loggedItems, setLoggedItems] = useState([]);

    async function fetchImage() {
        const url = await Service.fetchImg(id);
        setUrl(url);
    }

    useEffect(() => {
       fetchImage() 
    }, [])

    async function upvote() {
        await VotingService.upvote(id, userToken);
        addLogItem(id, getCurrentTime(), 'Likes')
    }
    async function downvote() {
        await VotingService.downvote(id, userToken);
        addLogItem(id, getCurrentTime(), 'Dislikes')
    }

    async function like() {
      await VotingService.like(id, userToken);
      addLogItem(id, getCurrentTime(), 'Favourites')
    }

    function addLogItem(id, time, section) {
        setLoggedItems([
            ...loggedItems, 
            {
                id,
                time,
                section
            }
        ])
    }
  
    return (
      <section className='breed__info section'>
         <SearchHeader/>
          <div className='breeds__content'>
              <div className='breeds__sort id'>
              <button onClick={() => router.back()}  className="back">
                   <img src="/assets/icons/back-20.png"/> 
                  </button>
                  <span className='section__title'>Voting</span>
                  {id && <span className='section__id'>{id}</span>}
              </div>
              <div className="vote__container">
                <img className="vote__img" src={url} />
                {url && (
                  <div className="vote__icons">
                    <div onClick={upvote}>   
                        <img className="like" src="/assets/icons/like-30.svg"/>
                    </div>
                    <div onClick={like}>
                        <img className="fav" src="/assets/icons/fav-30.svg"/>
                    </div>
                    <div onClick={downvote}>
                        <img className="dislike" src="/assets/icons/dislike-30.svg"/>
                    </div>
                  </div>
                )}
              </div>
              <div className="vote__log">
                {loggedItems && loggedItems.length > 0 && loggedItems.map(item => {
                    return (
                    <div key={item.text} className="vote__log-item">
                        <span className="time">{item.time}</span>
                        <p className="text">Image ID:<span className="id">{item.id}</span> was added to {item.section}</p>
                    </div>
                    )
                })}
              </div>
          </div>
      </section>
    )
}
