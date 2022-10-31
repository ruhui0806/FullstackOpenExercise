import axios from "axios";

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const createNew = (input) => {
    const object = {content: input, votes:0}
    return axios.post(baseUrl,object).then(res => res.data)
}

const update = (Obj) => {
    return axios.put(`${baseUrl}/${Obj.id}`, Obj).then(res => res.data)
}

const findOne = (id) => {
    return axios.get(`${baseUrl}/${id}/`).then(res => res.data)
}


export default {
    getAll,
    createNew,
    update,
    findOne
}
