import {
  AddTodolistActionType,
  RemoveTodolistActionType,
  setTodolistEntityStatus,
  setTodolistsActionType
} from "../fuetures/todolists/model/todolists-reducer";
import {
  setAppStatusAC
} from "../app/app-reducer";
import { ResultCode, taskAPI, TaskType, UpdateTaskModel } from "../fuetures/todolists/api/tasks-api";
import { handlerServerAppError, handlerServerNetworkError } from "common/utils/error-utils";
import {AppThunk } from "../app/store";

const initialState: TasksStateType = {};
export type TasksStateType = {
  [key: string]: TaskType[]
}
export const tasksReducer = (state: TasksStateType = initialState, action: TaskActionsTypes): TasksStateType => {
  switch (action.type) {
    case "REMOVE-TASK": {
      return {
        ...state,
        [action.payload.todolistId]: state[action.payload.todolistId].filter((t) => t.id !== action.payload.taskId)
      };
    }
    case "ADD-TASK": {
      const newTask: TaskType = action.payload.task;
      return {
        ...state,
        [action.payload.task.todoListId]: state[action.payload.task.todoListId] ? [newTask, ...state[action.payload.task.todoListId]] : [newTask]
      };
    }
    case "UPDATE-TASK": {
      const task = action.payload.task;
      return {
        ...state,
        [task.todoListId]: state[task.todoListId].map((t) =>
          t.id === task.id
            ? {
              ...t,
              ...action.payload.model
            }
            : t
        )
      };
    }
    case "ADD-TODOLIST":
      return {
        ...state,
        [action.todolist.id]: []
      };
    case "SET_TODOLISTS":
      const copyState = { ...state };
      action.todolists.forEach((tl) => {
        copyState[tl.id] = [];
      });
      return copyState;
    case "REMOVE-TODOLIST":
      const stateCopy = { ...state };
      delete stateCopy[action.payload.id];
      return stateCopy;
    case "SET-TASKS":
      return { ...state, [action.todolistId]: action.tasks };
    default:
      return state;
  }
};

// Action creators
export const removeTaskAC = (args: { taskId: string, todolistId: string }) => {
  return { type: "REMOVE-TASK", payload: args } as const;
};
export const addTaskAC = (args: { task: TaskType }) => {
  return { type: "ADD-TASK", payload: args } as const;
};
export const updateTaskAC = (args: { task: TaskType, model: UpdateDomainTaskModel }) => {
  return { type: "UPDATE-TASK", payload: args } as const;
};
export const setTasks = (tasks: TaskType[], todolistId: string) => {
  return {
    type: "SET-TASKS",
    tasks: tasks,
    todolistId: todolistId
  } as const;
};

export const getTasksTC = (todolistId: string): AppThunk => (dispatch) => {
  dispatch(setAppStatusAC("loading"));
  taskAPI.getTasks(todolistId).then((response) => {
    dispatch(setTasks(response.data.items, todolistId));
    dispatch(setAppStatusAC("succeeded"));
  })
    .catch((error) => {
      handlerServerNetworkError(error, dispatch);
    })
  ;
};
export const removeTaskTC = (args: { taskId: string, todolistId: string }): AppThunk => (dispatch) => {
  const { todolistId } = args;
  dispatch(setAppStatusAC("loading"));
  dispatch(setTodolistEntityStatus({ id: todolistId, status: "loading" }));
  taskAPI.deleteTask(args).then((response) => {
    if (response.data.resultCode === ResultCode.Success) {
      dispatch(removeTaskAC(args));
      dispatch(setAppStatusAC("succeeded"));
      dispatch(setTodolistEntityStatus({ id: todolistId, status: "succeeded" }));
    } else {
      handlerServerAppError(response.data, dispatch);
      dispatch(setTodolistEntityStatus({ id: todolistId, status: "succeeded" }));
    }
  })
    .catch((error) => {
      handlerServerNetworkError(error, dispatch);
    })
  ;
};
export const addTaskTC = (args: { todolistId: string, title: string }): AppThunk => (dispatch) => {
  dispatch(setAppStatusAC("loading"));
  taskAPI.createTask(args).then((response) => {
    if (response.data.resultCode === ResultCode.Success) {
      dispatch(addTaskAC({ task: response.data.data.item }));
      dispatch(setAppStatusAC("succeeded"));
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
  dispatch(setAppStatusAC("loading"));
  taskAPI.updateTask({ todolistId: task.todoListId, taskId, apiModel }).then((response) => {
    if (response.data.resultCode === ResultCode.Success) {
      dispatch(updateTaskAC({ task, model: response.data.data.item }));
      dispatch(setAppStatusAC("succeeded"));
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
  | ReturnType<typeof removeTaskAC>
  | ReturnType<typeof addTaskAC>
  | ReturnType<typeof updateTaskAC>
  | ReturnType<typeof setTasks>
  | AddTodolistActionType
  | RemoveTodolistActionType
  | setTodolistsActionType

