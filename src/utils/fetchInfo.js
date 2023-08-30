import axios from "axios";

export async function fetchByBreed(breed, limit = 5) {
    const { data } = await axios.get(`https://api.thecatapi.com/v1/images/search?limit=${limit}&breed_ids=${breed}&api_key=${process.env.NEXT_PUBLIC_CAT_API}`);
    return data;
}

export async function fetchByLimit(limit = 5) {
    const { data } = await axios.get(`https://api.thecatapi.com/v1/images/search?limit=${limit}&api_key=${process.env.NEXT_PUBLIC_CAT_API}`);
    return data;
}