import { BaseResponse } from "common/types";
import { baseApi } from "../../../app/model/base-api";

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

export enum TodoTaskPriority {
  low,
  middle,
  height,
  urgently,
  later,
}
export const PAGE_SIZE = 4;

export const taskApi = baseApi.injectEndpoints({
  endpoints: build => ({
    getTasks: build.query<GetTaskResponse, { todolistId: string; args: {page: number} }>({
      query: ({ todolistId, args }) => {
        const params = {...args, count : PAGE_SIZE}
        return {
          url: `/todo-lists/${todolistId}/tasks`,
          params: params
        }

      },
      providesTags: (res, error, { todolistId }) =>
        res
          ? [...res.items.map(({ id }) => ({ type: "Task", id }) as const), { type: "Task", id: todolistId }]
          : ["Task"]

    }),
    addTask: build.mutation<BaseResponse, { todolistId: string; title: string }>({
      query: ({ todolistId, title }) => ({
        url: `/todo-lists/${todolistId}/tasks`,
        method: "POST",
        body: { title }
      }),
      invalidatesTags: (res, error, { todolistId }) => [{ type: "Task", id: todolistId }]
    }),
    removeTask: build.mutation<BaseResponse, { todolistId: string; taskId: string }>({
      query: ({ todolistId, taskId }) => ({
        url: `/todo-lists/${todolistId}/tasks/${taskId}`,
        method: "DELETE"
      }),
      invalidatesTags: (res, error, { taskId }) => [{ type: "Task", id: taskId }]
    }),
    updateTask: build.mutation<BaseResponse, { todolistId: string; taskId: string; model: UpdateTaskModel }>({
      query: ({ todolistId, taskId, model }) => ({
        url: `/todo-lists/${todolistId}/tasks/${taskId}`,
        method: "PUT",
        body: model
      }),
      invalidatesTags: (res, error, { taskId }) => [{ type: "Task", id: taskId }]
    })
  })
});
export const { useGetTasksQuery, useAddTaskMutation, useRemoveTaskMutation, useUpdateTaskMutation } = taskApi;