"use client"
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AsideLayout() {
  const pathname = usePathname();
  return (
    <section className="aside-section">
        <Link href="/">
            <Image src='/assets/logo.svg' height={24} width={100} alt="logo image"/>
        </Link>
        <div className="greeting__cont">
            <Image src='/assets/greeting.svg' height={190} width={100} alt="Hi" priority={false}/>
            <p className="greeting">Welcome to MacPaw Bootcamp 2023</p>
        </div>
        <div className="main__content">
            <h3 className="title">Lets start using The Cat API</h3>
            <div className="cards">
                <Link href="/voting" className={` card ${pathname.includes("voting") ? "active" : ""}`}>
                    <div className="card__content vote">
                        <img src="/assets/vote-table.svg" alt="vote card"/>
                    </div>
                    <button className="card__btn">Voting</button>
                </Link>   
                <Link href="/breeds" className={` card ${pathname.includes("breeds") ? "active" : ""}`}>
                    <div className="card__content breed">
                        <img src="/assets/pet-breeds.png" alt="breed card"/>
                    </div>
                    <button className="card__btn">Breeds</button>
                </Link> 
                <Link href="/gallery" className={` card ${pathname.includes("gallery") ? "active" : ""}`}>
                    <div className="card__content search">
                        <img src="/assets/images-search.svg" alt="gallery card"/>
                    </div>
                    <button className="card__btn">Gallery</button>
                </Link>
            </div>
        </div>
    </section>
  )
}
