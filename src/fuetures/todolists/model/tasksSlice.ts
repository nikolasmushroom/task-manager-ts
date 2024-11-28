import {
  addTodolist,
  AddTodolistActionType, removeTodolist,
  RemoveTodolistActionType, setTodolists,
  setTodolistsActionType
} from "./todolistsSlice";
import {
  setAppStatus
} from "../../../app/model/appSlice";
import { ResultCode, taskAPI, TaskType, UpdateTaskModel } from "../api/tasks-api";
import { handlerServerAppError, handlerServerNetworkError } from "common/utils/error-utils";
import { AppThunk } from "../../../app/store";
import { createSlice } from "@reduxjs/toolkit";

const initialState: TasksStateType = {};
export type TasksStateType = {
  [key: string]: TaskType[]
}
export const tasksSlice = createSlice({
  name: "tasks",
  initialState: initialState,
  selectors : {
    selectTasks : sliceState => sliceState
  },
  reducers: create => ({
    setTasks: create.reducer<{ tasks: TaskType[], todolistId: string }>((state, action) => {
      state[action.payload.todolistId] = action.payload.tasks;
    }),
    removeTask: create.reducer<{ taskId: string, todolistId: string }>((state, action) => {
      const tasks = state[action.payload.todolistId];
      const index = tasks.findIndex(task => task.id === action.payload.taskId);
      if (index !== - 1) {
        tasks.splice(index, 1);
      }
    }),
    addTask: create.reducer<{ task: TaskType }>((state, action) => {
      const tasks = state[action.payload.task.todoListId];
      tasks.unshift(action.payload.task);
    }),
    updateTask: create.reducer<{ task: TaskType, model: UpdateDomainTaskModel }>((state, action) => {
      const tasks = state[action.payload.task.todoListId];
      const index = tasks.findIndex(task => task.id === action.payload.task.id);
      if (index !== -1) {
        tasks[index] = { ...tasks[index], ...action.payload.model };
      }
    }),
    clearTasksData: create.reducer((state, action) => {
      return {}
    }),
  }),
  extraReducers: builder => {
    builder
      // 1 аргумент - action creator, который мы хотим обработать
      // 2 аргумент - reducer, в котором изменяем state
      .addCase(addTodolist, (state, action) => {
        state[action.payload.todolist.id] = [];
      })
      .addCase(removeTodolist, (state, action) => {
        delete state[action.payload.id];
      })
      .addCase(setTodolists, (state, action) => {
        action.payload.todolists.forEach(todolist => {
          state[todolist.id] = [];
        });
      })

  }
});

export const {selectTasks} = tasksSlice.selectors
export const {setTasks, addTask, clearTasksData, removeTask, updateTask} = tasksSlice.actions;
export const tasksReducer = tasksSlice.reducer;
export const getTasksTC = (todolistId: string): AppThunk => (dispatch) => {
  dispatch(setAppStatus({ status : "loading" }));
  taskAPI.getTasks(todolistId).then((response) => {
    dispatch(setTasks({tasks :  response.data.items, todolistId }));
    dispatch(setAppStatus({ status : "succeeded" }));
  })
    .catch((error) => {
      handlerServerNetworkError(error, dispatch);
    })
  ;
};
export const removeTaskTC = (args: { taskId: string, todolistId: string }): AppThunk<Promise<void>> => async (dispatch) => {
  const { todolistId } = args;
  dispatch(setAppStatus({ status : "loading" }));
   return taskAPI.deleteTask(args).then((response) => {
    if (response.data.resultCode === ResultCode.Success) {
      dispatch(removeTask(args));
      dispatch(setAppStatus({ status : "succeeded" }));
    } else {
      handlerServerAppError(response.data, dispatch);
    }
  })
    .catch((error) => {
      handlerServerNetworkError(error, dispatch);
    })
  ;
};
export const addTaskTC = (args: { todolistId: string, title: string }): AppThunk => (dispatch) => {
  dispatch(setAppStatus({ status : "loading" }));
  taskAPI.createTask(args).then((response) => {
    if (response.data.resultCode === ResultCode.Success) {
      dispatch(addTask({ task: response.data.data.item }));
      dispatch(setAppStatus({ status : "succeeded" }));
    } else {
      handlerServerAppError(response.data, dispatch);
    }
  })
    .catch((error) => {
      handlerServerNetworkError(error, dispatch);
    })
  ;
};
export type UpdateDomainTaskModel = {
  title?: string
  description?: string | null
  status?: number
  priority?: number
  startDate?: string
  deadline?: string
}
export const updateTaskTC = (args: { model: UpdateDomainTaskModel, task: TaskType }): AppThunk => (dispatch) => {
  const { model, task } = args;
  const taskId = task.id;
  const apiModel: UpdateTaskModel = {
    title: task.title,
    description: task.description,
    status: task.status,
    priority: task.priority,
    startDate: task.startDate,
    deadline: task.deadline,
    ...model
  };
  dispatch(setAppStatus({ status : "loading" }));
  taskAPI.updateTask({ todolistId: task.todoListId, taskId, apiModel }).then((response) => {
    if (response.data.resultCode === ResultCode.Success) {
      dispatch(updateTask({ task, model: response.data.data.item }));
      dispatch(setAppStatus({ status : "succeeded" }));
    } else {
      handlerServerAppError(response.data, dispatch);
    }
  })
    .catch((error) => {
      handlerServerNetworkError(error, dispatch);
    })
  ;
};


export type TaskActionsTypes =
  | ReturnType<typeof removeTask>
  | ReturnType<typeof addTask>
  | ReturnType<typeof updateTask>
  | ReturnType<typeof setTasks>
  | ReturnType<typeof clearTasksData>
  | AddTodolistActionType
  | RemoveTodolistActionType
  | setTodolistsActionType

