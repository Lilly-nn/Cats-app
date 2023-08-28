import axios from "axios";

export async function fetchImg(id) {
    const {data} = await axios.get(`https://api.thecatapi.com/v1/images/${id}`);
    return data.url;
}
