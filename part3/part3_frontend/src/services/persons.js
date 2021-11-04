import axios from 'axios'
const baseUrl = "/api/persons"

const getAll = () => {
    return axios.get(baseUrl).then(res => res.data)
}

const create = (newObj) => {
    return axios.post(baseUrl, newObj).then(res => res.data)
}

const update = (id, Obj) => {
    return axios.put(`${baseUrl}/${id}`, Obj).then(res => res.data)
}

const remove = (deleteObj) => {
    return axios.delete(`${baseUrl}/${deleteObj.id}`).then(res => res.data)
}

const personService = {
    getAll,
    create,
    remove,
    update
}

export default personService