import {EditableSpan} from "./EditableSpan";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {changeTodolistTitleAC, removeTodolistAC} from "./model/todolists-reducer";
import {useAppDispatch} from "./app/hook";
import {TodolistType} from "./app/App";
type TodolistTitle = {
    todolist: TodolistType
}
export const TodolistTitle = ({todolist} : TodolistTitle) => {
    const dispatch = useAppDispatch()
    const updateTodolist = (title: string) => {
        dispatch(changeTodolistTitleAC({id : todolist.id, title}))
    }
    const removeTodolist = () => {
        dispatch(removeTodolistAC(todolist.id))
    }
    return (
        <div className={"todolist-title-container"}>
            <h3><EditableSpan value={todolist.title} onChange={updateTodolist}/></h3>
            <IconButton onClick={removeTodolist}>
                <DeleteIcon/>
            </IconButton>
        </div>
    )
}