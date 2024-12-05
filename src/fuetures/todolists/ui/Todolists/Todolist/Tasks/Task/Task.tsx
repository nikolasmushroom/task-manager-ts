import { EditableSpan } from "common/components";
import { TaskType } from "../../../../../api";
import styles from "./Task.module.css";
import deleteIcon from "../../../../../../../asserts/delete.png";
import { IconButton } from "common/components/Button/IconButton";
import { useTask } from "../../../../../lib/hooks/useTask";


type TaskPropsType = {
  task: TaskType
  todolistId: string
  disabled?: boolean
}
export const Task = ({ task, todolistId, disabled }: TaskPropsType) => {
  const {isDisabled, TaskStatusValue, changeTaskStatusHandler, removeTaskHandler, changeTaskTitleHandler} = useTask(task, todolistId)
  return (
    <div className={styles.task}>
      <div>
        <input disabled={isDisabled || disabled} type="checkbox" checked={TaskStatusValue}
               onChange={changeTaskStatusHandler} />
        <EditableSpan disabled={isDisabled || disabled} value={task.title} onChange={changeTaskTitleHandler} />
      </div>
      <IconButton disabled={isDisabled || disabled} iconUrl={deleteIcon} onClick={removeTaskHandler} />
    </div>
  );
};
