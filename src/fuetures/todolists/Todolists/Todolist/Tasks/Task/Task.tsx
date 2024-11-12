import {getListItemSx} from "./Todolist.styles";
import Checkbox from "@mui/material/Checkbox";
import {EditableSpan} from "./EditableSpan";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import ListItem from "@mui/material/ListItem";
import {TaskType} from "./app/App";
import {ChangeEvent} from "react";
import {useAppDispatch} from "./app/hook";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./model/tasks-reducer";
type TaskPropsType = {
    task: TaskType
    todolistId: string
}
export const Task = ({task, todolistId} : TaskPropsType) => {
    const dispatch = useAppDispatch()
    const removeTaskHandler = () => {
        dispatch(removeTaskAC(task.id, todolistId))
    }

    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const newStatusValue = e.currentTarget.checked
        dispatch(changeTaskStatusAC(task.id, newStatusValue, todolistId))
    }

    const changeTaskTitleHandler = (title: string) => {
        dispatch(changeTaskTitleAC(task.id, title, todolistId))
    }
    return (
        <ListItem sx={getListItemSx(task.isDone)}>
            <div>
                <Checkbox checked={task.isDone} onChange={changeTaskStatusHandler}/>
                <EditableSpan value={task.title} onChange={changeTaskTitleHandler}/>
            </div>
            <IconButton onClick={removeTaskHandler}>
                <DeleteIcon/>
            </IconButton>
        </ListItem>
    )
}