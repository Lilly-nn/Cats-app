import axios from "axios";

export default class Service {
    static async uploadImage(file, userToken) {
        const dataForUpload = {
          file,
          sub_id: userToken
        }
       return axios.post('https://api.thecatapi.com/v1/images/upload', dataForUpload, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'x-api-key': process.env.NEXT_PUBLIC_CAT_API
          }
        }
        )
        .then((response) => {
          return response.status;
        })
        .catch((err) => {
          return err.response.status;
        })
    }
    static async fetchImg(id) {
        const {data} = await axios.get(`https://api.thecatapi.com/v1/images/${id}`);
        return data.url;
    }
    static async fetchByBreed(breed, limit = 5) {
        const { data } = await axios.get(`https://api.thecatapi.com/v1/images/search?limit=${limit}&breed_ids=${breed}&api_key=${process.env.NEXT_PUBLIC_CAT_API}`);
        return data;
    }
    
    static async fetchByLimit(limit = 5) {
        const { data } = await axios.get(`https://api.thecatapi.com/v1/images/search?limit=${limit}&api_key=${process.env.NEXT_PUBLIC_CAT_API}`);
        return data;
    }
}