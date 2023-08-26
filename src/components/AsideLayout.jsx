import Image from "next/image";

export default function AsideLayout() {

  return (
    <section className="aside-section">
        <Image src='/assets/logo.svg' height={24} width={100} alt="logo image"/>
        <div className="greeting__cont">
            <Image src='/assets/greeting.svg' height={190} width={100} alt="Hi" priority={false}/>
            <p className="greeting">Welcome to MacPaw Bootcamp 2023</p>
        </div>
        <div className="main__content">
            <h3 className="title">Lets start using The Cat API</h3>
            <div className="cards">
                <div className="card">
                    <div className="card__content vote">
                        <Image src="/assets/vote-table.svg" height={190} width={130} alt="vote card"/>
                    </div>
                    <button className="card__btn">Voting</button>
                </div>
                <div className="card">
                    <div className="card__content breeds">
                        <Image src="/assets/pet-breeds.svg" height={190} width={130} alt="vote card"/>
                    </div>
                    <button className="card__btn">Breeds</button>
                </div>
                <div className="card">
                    <div className="card__content search">
                        <Image src="/assets/images-search.svg" height={190} width={130} alt="vote card"/>
                    </div>
                    <button className="card__btn">Gallery</button>
                </div>
            </div>
        </div>
    </section>
  )
}
