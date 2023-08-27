import { useEffect, useState } from 'react';
import fetchBreeds from "../libs/apollo-rest/allBreeds.js";

export function useFetchAll() {
    const [cats, setCats] = useState(null);

    async function fetchAllCats() {
        const {data} = await fetchBreeds;
        setCats(data)
    }

    
    useEffect(() => {
        fetchAllCats()
    }, [])

    return cats;

}


export function useFetchBreeds() {
    const [breedOptions, setBreedOptions] = useState([]);
  
    async function fetchOptions() { 
        const {data} = await fetchBreeds;
        const options = data.map(el => el.name);
        setBreedOptions(options);
    } 


    useEffect(() => {
        if(!breedOptions.length) {
            fetchOptions();
        }
    }, [])

  return breedOptions;
}


export default function useFetch() {
    const cats = useFetchAll();
    const breedOptions = useFetchBreeds();

    return {cats, breedOptions}
}