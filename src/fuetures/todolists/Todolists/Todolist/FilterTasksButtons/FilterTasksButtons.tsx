import {filterButtonsContainerSx} from "./Todolist.styles";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import {FilterValuesType, TodolistType} from "./app/App";
import {changeTodolistFilter} from "./model/todolists-reducer";
import {useAppDispatch} from "./app/hook";
type FilterTasksButtonsPropsType = {
    todolist : TodolistType
}
export const FilterTasksButtons = ({todolist} : FilterTasksButtonsPropsType) => {
    const dispatch = useAppDispatch()
    const changeFilter = (filter: FilterValuesType, id: string) => {
        dispatch(changeTodolistFilter({id, filter}))
    }
    return (
        <Box sx={filterButtonsContainerSx}>
            <Button
                variant={todolist.filter === 'all' ? 'outlined' : 'text'}
                color={'inherit'}
                onClick={() => changeFilter('all', todolist.id)}>
                All
            </Button>
            <Button
                variant={todolist.filter === 'active' ? 'outlined' : 'text'}
                color={'primary'}
                onClick={() => changeFilter('active', todolist.id)}>
                Active
            </Button>
            <Button
                variant={todolist.filter === 'completed' ? 'outlined' : 'text'}
                color={'secondary'}
                onClick={() => changeFilter('completed', todolist.id)}>
                Completed
            </Button>
        </Box>
    )
}