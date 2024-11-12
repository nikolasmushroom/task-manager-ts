import {Grid} from "@mui/material";
import Paper from "@mui/material/Paper";
import {Todolist} from "./Todolist";
import React from "react";
import {addTaskAC} from "./model/tasks-reducer";
import {useAppDispatch, useAppSelector} from "./app/hook";

export const Todolists = () => {
    const dispatch = useAppDispatch()
    const todolists = useAppSelector(state => state.todolists)

    const addTask = (title: string, todolistId: string) => {
        dispatch(addTaskAC(title, todolistId))
    }
    return (
        <>
            {todolists.map((tl) => {
                return (
                    <Grid key={tl.id}>
                        <Paper sx={{p: '0 20px 20px 20px'}}>
                            <Todolist
                                key={tl.id}
                                todolist={tl}
                                addTask={addTask}
                            />
                        </Paper>
                    </Grid>
                )
            })}
        </>
    )
}