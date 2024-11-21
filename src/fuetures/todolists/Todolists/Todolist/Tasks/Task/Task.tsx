import { EditableSpan } from "common/components";
import { ChangeEvent, useState } from "react";
import { removeTaskTC, updateTaskTC } from "../../../../../../model/tasks-reducer";
import { useAppDispatch } from "common/hooks";
import { TaskStatus, TaskType } from "../../../../api";
import styles from "./Task.module.css";
import deleteIcon from "../../../../../../asserts/delete.png";
import { IconButton } from "common/components/Button/IconButton";
import { handlerServerNetworkError } from "common/utils/error-utils";

type TaskPropsType = {
  task: TaskType
  todolistId: string
  disabled? : boolean
}
export const Task = ({ task, todolistId , disabled}: TaskPropsType) => {
  const [isDisabled, setIsDisabled] = useState(false);
  const dispatch = useAppDispatch();
  const removeTaskHandler = () => {
    setIsDisabled(true)
    dispatch(removeTaskTC({ taskId: task.id, todolistId })).catch((e) => {
      handlerServerNetworkError(e.message, dispatch)
      setIsDisabled(false)
    });
  };

  const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const status = e.currentTarget.checked ? TaskStatus.done : TaskStatus.notReady;
    dispatch(updateTaskTC({
      model: {
        status
      }, task
    }));
  };

  const changeTaskTitleHandler = (title: string) => {
    dispatch(updateTaskTC({ model: { title }, task }));
  };
  const TaskStatusValue = task.status === TaskStatus.done;
  return (
    <div className={styles.task}>
      <div>
        <input disabled={isDisabled || disabled} type="checkbox" checked={TaskStatusValue} onChange={changeTaskStatusHandler} />
        <EditableSpan disabled={isDisabled || disabled} value={task.title} onChange={changeTaskTitleHandler} />
      </div>
      <IconButton disabled={isDisabled || disabled} iconUrl={deleteIcon} onClick={removeTaskHandler} />
    </div>
  );
};
