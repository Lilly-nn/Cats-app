import Service from '@/API/Service';
import SearchHeader from '@/components/SearchHeader';
import axios from 'axios';
import Link from 'next/link';

export default async function InfoPage({params}) {
  const {id} = params;
  const {data: allInfo} = await axios.get('https://api.thecatapi.com/v1/breeds');
  const breedInfo = allInfo.find(el => el.id === id);
  const { name, weight, id: breedID, temperament, life_span, origin, reference_image_id: imgId } = breedInfo;
  const img = imgId ? await Service.fetchImg(imgId) : "/assets/upload-bg.png";

  return (
    <section className='breed__info section'>
       <SearchHeader/>
        <div className='breeds__content'>
            <div className='breeds__sort id'>
                <Link href="/breeds" className="back">
                 <img src="/assets/icons/back-20.png"/> 
                </Link>
                <span className='section__title'>Breeds</span>
                <span className='section__id'>{id}</span>
            </div>
            <div className='breed__content'>
              <img src={img} alt={name} className='breed__img' />
                <div className='breed__details'> 
                   <h4 className='breed__name'>{name}</h4>
                   <div className='f-col'>
                      <dl>
                       <dt className='detail'>Temperament</dt>
                       <dd className='detail-info'>{temperament}</dd>
                      </dl>
                   </div>
                   <div className='s-col'>
                       <dl>
                        <dt className='detail'>Origin</dt>
                        <dd className='detail-info'>{origin}</dd>
                    </dl>
                   <dl>
                   <dt className='detail'>Weight</dt>
                    <dd className='detail-info'>{`${weight.metric} kgs`}</dd>
                   </dl>
                  <dl>
                  <dt className='detail'>Life Span</dt>
                    <dd className='detail-info'>{`${life_span} years`}</dd>
                  </dl>
                 
                </div>
            </div>
        </div>
        </div>
       
      

    </section>
  )
}
