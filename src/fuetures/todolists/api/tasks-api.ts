import { baseURL } from "common/instance"
import { BaseResponse } from "common/types"

export type GetTaskResponse = {
  totalCount: number
  error: string
  items: TaskType[]
}
export type TaskType = {
  description: string | null
  title: string
  completed: boolean
  status: TaskStatus
  priority: TodoTaskPriority
  startDate: string
  deadline: string
  id: string
  todoListId: string
  order: number
  addedDate: string
}
export type UpdateTaskModel = {
  title: string
  description: string | null
  status: number
  priority: number
  startDate: string
  deadline: string
}

export enum TaskStatus {
  notReady,
  part,
  done,
}
export enum ResultCode {
  Success,
  Failed,
}
export enum TodoTaskPriority {
  low,
  middle,
  height,
  urgently,
  later,
}

export const taskAPI = {
  getTasks(todolistId: string) {
    return baseURL.get<GetTaskResponse>(`/todo-lists/${todolistId}/tasks`).then((response) => {
      return response
    })
  },
  createTask(params: { todolistId: string; title: string }) {
    const { todolistId, title } = params
    return baseURL.post<BaseResponse<{ item: TaskType }>>(`/todo-lists/${todolistId}/tasks`, { title: title }, {}).then((response) => {
      return response
    })
  },
  deleteTask(params: { todolistId: string; taskId: string }) {
    const { todolistId, taskId } = params
    return baseURL.delete<BaseResponse>(`/todo-lists/${todolistId}/tasks/${taskId}`).then((response) => {
      return response
    })
  },
  updateTask(params: { todolistId: string; taskId: string; apiModel: UpdateTaskModel }) {
    const { todolistId, taskId, apiModel } = params
    return baseURL.put<BaseResponse<{ item: TaskType }>>(`/todo-lists/${todolistId}/tasks/${taskId}`, apiModel).then((response) => {
      return response
    })
  },
}
