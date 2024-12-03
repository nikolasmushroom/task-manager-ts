import { ChangeEvent, useState } from "react";
import {
  TaskStatus,
  TaskType,
  UpdateTaskModel,
  useRemoveTaskMutation,
  useUpdateTaskMutation
} from "../../api/tasks-api";

export const useTask = (task : TaskType, todolistId : string) => {
  const [isDisabled, setIsDisabled] = useState(false);
  const [removeTask] = useRemoveTaskMutation();
  const [updateTask] = useUpdateTaskMutation();
  const model: UpdateTaskModel = {
    title: task.title,
    description: task.description,
    status: task.status,
    priority: task.priority,
    startDate: task.startDate,
    deadline: task.deadline
  };

  const removeTaskHandler = () => {
    setIsDisabled(true);
    removeTask({ taskId: task.id, todolistId }).catch(() => {

      setIsDisabled(false);
    });
  };

  const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const status = e.currentTarget.checked ? TaskStatus.done : TaskStatus.notReady;
    updateTask({
      model: {
        ...model, status: status
      },
      taskId: task.id,
      todolistId: task.todoListId
    });
  };

  const changeTaskTitleHandler = (title: string) => {
    updateTask({ model : {...model, title : title}, taskId: task.id, todolistId: task.todoListId });
  };
  const TaskStatusValue = task.status === TaskStatus.done;
  return {TaskStatusValue, changeTaskTitleHandler, changeTaskStatusHandler, removeTaskHandler, isDisabled, setIsDisabled}
}