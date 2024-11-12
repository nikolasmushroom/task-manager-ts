import axios from "axios";

export const baseURL = axios.create({
    withCredentials: true,
    baseURL: `https://social-network.samuraijs.com/api/1.1`,
    headers: {
        Authorization: 'Bearer ' + '898be8e5-e84b-44ba-98d1-88d64eb60f12',
        'API-KEY': 'fd5f9688-ccfd-40b8-ab09-e5882d839628'
    }
})
export const todolistAPI = {
    getTodolists() {
        return baseURL.get(`/todo-lists`, {})
            .then(res => {
                return res
            })
    },
    createTodolist(title: string) {
        baseURL.post('todo-lists', title)
            .then((response) => {
                console.log(response.data)
            })
    },
    deleteTodolist(id: string) {
        baseURL.delete(`todo-lists/${id}`)
            .then((response) => {
                console.log(response.data)
            })
    },
    updateTodolist(id: string, title: string) {
        baseURL.put(`todo-lists/${id}`, {title: title})
            .then((response) => {
                console.log(response.data)
            })
    },
}