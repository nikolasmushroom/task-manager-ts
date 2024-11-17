import { EditableSpan } from "common/components"
import {
  deleteTodolistTC,
  TodolistDomainType,
  updateTodolistTitleTC
} from "../../../model/todolists-reducer";
import { useAppDispatch } from "common/hooks"
import deleteIcon from './../../../../../asserts/delete.png'
import { IconButton } from "common/components/Button/IconButton";
type TodolistTitle = {
  todolist: TodolistDomainType
}
export const TodolistTitle = ({ todolist }: TodolistTitle) => {
  const dispatch = useAppDispatch()
  const updateTodolist = (title: string) => {
    dispatch(updateTodolistTitleTC({ id: todolist.id, title }))
  }
  const removeTodolist = () => {
    dispatch(deleteTodolistTC(todolist.id))
  }
  return (
    <div className={"todolist-title-container"}>
      <h3>
        <EditableSpan disabled={todolist.entityStatus === 'loading'} value={todolist.title} onChange={updateTodolist} />
      </h3>
      <IconButton iconUrl={deleteIcon}  onClick={removeTodolist} disabled={todolist.entityStatus === 'loading'}/>
    </div>
  )
}
