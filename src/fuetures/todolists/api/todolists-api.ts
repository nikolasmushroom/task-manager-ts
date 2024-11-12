import axios from "axios";

export const baseURL = axios.create({
    withCredentials: true,
    baseURL: `https://social-network.samuraijs.com/api/1.1`,
    headers: {
        'API-KEY': 'fd5f9688-ccfd-40b8-ab09-e5882d839628'
    }
})
export const todolistAPI = {
    getTodolists() {
        const promise = baseURL.get('todo-lists')
            .then((response) => {
                console.log(response)
            })
    }
}