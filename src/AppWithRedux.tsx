import React, {useCallback, useReducer, useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";
import AddItemForm from "./AddItemForm";
import {AppBar, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";
import {
    AddTodolistAC,
    ChangeTodolistFilterAC,
    ChangeTodolistTitleAC,
    RemoveTodolistAC,
    todolistsReducer
} from "./state/todolists-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./state/store";

export type FilterValuesType = 'all' | 'completed' | 'active';

export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function AppWithRedux() {
    const dispatch = useDispatch();

    const todoLists = useSelector<AppRootState, Array<TodoListType>>(state => state.todolists);

    const changeFilter = useCallback(function(value: FilterValuesType, todolistId: string) {
        dispatch(ChangeTodolistFilterAC(todolistId, value));
    }, [dispatch]);


    const removeTodolist = useCallback(function(todolistId: string) {
        const action = RemoveTodolistAC(todolistId);
        dispatch(action);
    }, [dispatch]);

    const addTodolist = useCallback((title: string) => {
        const action = AddTodolistAC(title);
        dispatch(action);
    }, [dispatch])

    const changeTodolistTitle = useCallback(function(title: string, todolistId: string) {
        dispatch(ChangeTodolistTitleAC(todolistId, title));
    }, [dispatch])

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar variant="dense">
                    <IconButton edge="start" color="inherit" aria-label="menu" sx={{mr: 2}}>
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6" color="inherit" component="div">
                        Photos
                    </Typography>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: "20px"}}>
                    <AddItemForm addItem={addTodolist}/></Grid>
                <Grid container spacing={3}>
                    {todoLists.map((tl => {
                        return <Grid item>
                            <Paper style={{padding: "10px"}}>
                                <Todolist
                                    id={tl.id}
                                    title={tl.title}
                                    changeFilter={changeFilter}
                                    filter={tl.filter}
                                    removeTodolist={removeTodolist}
                                    changeTodolistTitle={changeTodolistTitle}/>
                            </Paper>
                        </Grid>
                    }))}</Grid>
            </Container>
        </div>
    );
}


export default AppWithRedux;
