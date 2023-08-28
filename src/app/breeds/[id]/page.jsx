import { fetchImg } from '@/utils/fetchImg';
import axios from 'axios';

export default async function InfoPage({params}) {
  const {id} = params;
  const {data: allInfo} = await axios.get('https://api.thecatapi.com/v1/breeds');
  const breedInfo = allInfo.find(el => el.id === id);
  const { name, weight, id: breedID, temperament, life_span, origin, reference_image_id: imgId } = breedInfo;
  const img = await fetchImg(imgId);

  return (
    <section className='breed__info'>
        <img src={img} alt={name} />
        <div>
            <h4 className='breed__name'>{name}</h4>
            <div className='breed__details'>
                <dl className='f-col'>
                    <dt className='detail'>Temperament</dt>
                    <dd>{temperament}</dd>
                </dl>
                <div className='s-col'>
                    <dl>
                        <dt className='detail'>Origin</dt>
                        <dd>{origin}</dd>
                    </dl>
                   <dl>
                   <dt className='detail'>Weight</dt>
                    <dd>{`${weight.metric} kgs`}</dd>
                   </dl>
                  <dl>
                  <dt className='detail'>Life Span</dt>
                    <dd>{`${life_span} years`}</dd>
                  </dl>
                 
                </div>
            </div>
        </div>

    </section>
  )
}
