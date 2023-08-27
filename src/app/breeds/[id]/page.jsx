import axios from 'axios';

export default async function InfoPage({params}) {
  const {id} = params;
  const {data: allInfo} = await axios.get('https://api.thecatapi.com/v1/breeds');
  const breedInfo = allInfo.find(el => el.id === id);
  console.log(breedInfo)
  return (
    <div>page</div>
  )
}
