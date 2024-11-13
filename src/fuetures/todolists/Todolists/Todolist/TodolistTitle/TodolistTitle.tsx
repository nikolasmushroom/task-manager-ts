import { EditableSpan } from "common/components"
import {
  deleteTodolistTC,
  TodolistDomainType,
  updateTodolistTitleTC
} from "../../../../../model/todolists-reducer";
import { useAppDispatch } from "common/hooks"
import deleteIcon from './../../../../../asserts/delete.png'
import { Button } from "common/components/Button/Button";
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
        <EditableSpan value={todolist.title} onChange={updateTodolist} />
      </h3>
      <Button onClick={removeTodolist} disabled={todolist.entityStatus === 'loading'}>
        <img src={deleteIcon} alt="delete icon"/>
      </Button>
    </div>
  )
}
