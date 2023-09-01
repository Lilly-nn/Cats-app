import axios from "axios"

async function addToDB(data, path) {
    await axios.post(`https://api.thecatapi.com/v1/${path}`, data, {
        headers: {
            'Content-Type': 'application/json', 
          'x-api-key': process.env.NEXT_PUBLIC_CAT_API
        }
      }).then(res => console.log(res)).catch(err => console.log(err))

}

export default class VotingService {
    static async upvote(imgId, userToken) {
        await addToDB({
            "image_id": imgId,
            "sub_id": userToken,
            "value": 1
        }, "votes")
    }
    static async downvote(imgId, userToken) {
        await addToDB({
            "image_id": imgId,
            "sub_id": userToken,
            "value": -1
        }, "votes")
    }

    static async like(imgId, userToken) {
        await addToDB({
            "image_id": imgId,
            "sub_id": userToken,
        }, "favourites")
    }

    static async unlike(id) {
        await axios.delete(`https://api.thecatapi.com/v1/favourites/${id}`, {
             headers: {
                  'Content-Type': 'application/json',
                  'x-api-key': process.env.NEXT_PUBLIC_CAT_API
            }
        }) 
    }
    static async getVoted(userId) {
        const {data} = await axios.get(`https://api.thecatapi.com/v1/votes?${userId}`, {
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': process.env.NEXT_PUBLIC_CAT_API
          }
        })
        return data;
    }
}