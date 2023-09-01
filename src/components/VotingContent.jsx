"use client"
import { usePathname, useRouter } from 'next/navigation'
import SearchHeader from './SearchHeader'

export default function VotingContent({children}) {
  const router = useRouter();
  const pathname = usePathname();
  const title = pathname.slice(1);
  return (
    <section className="section">
    <SearchHeader/>
    <div className='breeds__content'>
        <div className='breeds__sort '>
            <div className="header">
                <button onClick={() => router.back()} className="back">
                    <img src="/assets/icons/back-20.png"/> 
                </button>
                <span className='section__title'>{title}</span>  
            </div>            
        </div>
        {children}
    </div>
    </section>
  )
}
