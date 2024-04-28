import React, {useReducer, useState} from 'react';
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

export type FilterValuesType = 'all' | 'completed' | 'active';

export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function AppWithReducers() {
    const todolist1Id = v1();
    const todolist2Id = v1();

    const [todoLists, dispatchTodolistsReducer] = useReducer(todolistsReducer, [
        {id: todolist1Id, title: 'What to learn', filter: 'all'},
        {id: todolist2Id, title: 'What to buy', filter: 'all'}
    ])

    const [tasksObj, dispatchTasksReducer] = useReducer(tasksReducer, {
        [todolist1Id]: [
            {id: v1(), text: "CSS", isDone: true},
            {id: v1(), text: "JS", isDone: true},
            {id: v1(), text: "React", isDone: false}
        ],
        [todolist2Id]: [
            {id: v1(), text: "coffee", isDone: true},
            {id: v1(), text: "ice-cream", isDone: true},
            {id: v1(), text: "cake", isDone: false}
        ]
    })

    function removeTask(id: string, todolistId: string) {
        const action = removeTaskAC(id, todolistId);
        dispatchTasksReducer(action);
    }

    function addTask(title: string, todolistId: string) {
        const action = addTaskAC(title, todolistId);
        dispatchTasksReducer(action);
    }

    function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
        const action = changeTaskStatusAC(taskId, isDone, todolistId);
        dispatchTasksReducer(action);
    }

    function changeTitle(taskId: string, newValue: string, todolistId: string) {
        const action = changeTaskTitleAC(taskId, newValue, todolistId);
        dispatchTasksReducer(action)
    }

    function changeFilter(value: FilterValuesType, todolistId: string) {
        dispatchTodolistsReducer(ChangeTodolistFilterAC(todolistId, value));
    }


    function removeTodolist(todolistId: string) {
        const action = RemoveTodolistAC(todolistId);
        dispatchTasksReducer(action);
        dispatchTodolistsReducer(action);
    }

    function addTodolist(title: string) {
        const action = AddTodolistAC(title);
        dispatchTodolistsReducer(action);
        dispatchTasksReducer(action);
    }

    function changeTodolistTitle(title: string, todolistId: string) {
        dispatchTodolistsReducer(ChangeTodolistTitleAC(todolistId, title));
    }

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
                        let tasksForTodoList = tasksObj[tl.id];

                        if (tl.filter === 'completed') {
                            tasksForTodoList = tasksForTodoList.filter(t => t.isDone === true)
                        }

                        if (tl.filter === 'active') {
                            tasksForTodoList = tasksForTodoList.filter(t => t.isDone === false)
                        }

                        return <Grid item>
                            <Paper style={{padding: "10px"}}>
                                <Todolist
                                    id={tl.id}
                                    title={tl.title} tasks={tasksForTodoList} removeTask={removeTask}
                                    changeFilter={changeFilter}
                                    addTask={addTask}
                                    changeTaskStatus={changeStatus}
                                    changeTaskTitle={changeTitle}
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


export default AppWithReducers;
