import { EditableSpan } from "common/components";
import { ChangeEvent } from "react";
import { removeTaskTC, updateTaskTC } from "../../../../../../model/tasks-reducer";
import { useAppDispatch } from "common/hooks";
import { TaskStatus, TaskType } from "../../../../api";
import styles from "./Task.module.css";
import deleteIcon from "./../../../../../../asserts/delete.png";
import { IconButton } from "common/components/Button/IconButton";

type TaskPropsType = {
  task: TaskType
  todolistId: string
}
export const Task = ({ task, todolistId }: TaskPropsType) => {
  const dispatch = useAppDispatch();
  const removeTaskHandler = () => {
    dispatch(removeTaskTC({ taskId: task.id, todolistId }));
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
        <input type="checkbox" checked={TaskStatusValue} onChange={changeTaskStatusHandler} />
        <EditableSpan value={task.title} onChange={changeTaskTitleHandler} />
      </div>
      <IconButton iconUrl={deleteIcon} onClick={removeTaskHandler}/>
    </div>
  );
};
