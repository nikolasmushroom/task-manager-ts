import {Grid} from "@mui/material";
import {AddItemForm} from "./AddItemForm";
import Paper from "@mui/material/Paper";
import {Todolist} from "./Todolist";
import Container from "@mui/material/Container";
import React from "react";
import {addTodolistAC} from "./model/todolists-reducer";

import {useAppDispatch} from "./app/hook";
import {Todolists} from "./fuetures/todolists/Todolists/Todolists";

export const Main = () => {

    const dispatch = useAppDispatch()

    const addTodolist = (title: string) => {
        const action = addTodolistAC(title)
        dispatch(action)
    }
    return (
        <Container fixed>
            <Grid container sx={{mb: '30px'}}>
                <AddItemForm addItem={addTodolist}/>
            </Grid>

            <Grid container spacing={4}>
                <Todolists/>
            </Grid>
        </Container>
    )
}