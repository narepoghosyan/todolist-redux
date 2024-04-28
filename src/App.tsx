import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";
import AddItemForm from "./AddItemForm";
import {AppBar, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";

export type FilterValuesType = 'all' | 'completed' | 'active';

export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function App() {
    const todolist1Id = v1();
    const todolist2Id = v1();

    const [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {id: todolist1Id, title: 'What to learn', filter: 'all'},
        {id: todolist2Id, title: 'What to buy', filter: 'all'}
    ])

    const [tasksObj, setTasks] = useState<TasksStateType>({
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
        const tasks = tasksObj[todolistId];
        let filteredTasks = tasks.filter(t => t.id !== id);
        tasksObj[todolistId] = filteredTasks;

        setTasks({...tasksObj})
    }

    function changeFilter(value: FilterValuesType, todolistId: string) {
        let todolist = todoLists.find(tl => tl.id === todolistId);

        if (todolist) {
            todolist.filter = value;
            setTodoLists([...todoLists])
        }
    }

    function addTask(title: string, todolistId: string) {
        const newTask = {id: v1(), text: title, isDone: false};
        const tasks = tasksObj[todolistId]
        const newTasks = [newTask, ...tasks];
        tasksObj[todolistId] = newTasks
        setTasks({...tasksObj});
    }

    function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
        const tasks = tasksObj[todolistId];
        const task = tasks.find(t => t.id === taskId);

        if (task) {
            task.isDone = isDone;
            setTasks({...tasksObj});
        }
    }

    function removeTodolist(todolistId: string) {
        const filteredTodolists = todoLists.filter(t => t.id !== todolistId);
        setTodoLists(filteredTodolists);

        delete tasksObj[todolistId];
        setTasks({...tasksObj});
    }

    function addTodolist(title: string) {
        const todolist: TodoListType = {
            id: v1(),
            title: title,
            filter: 'all'
        }

        setTodoLists([todolist, ...todoLists])
        setTasks({...tasksObj, [todolist.id]: []})
    }

    function changeTitle(taskId: string, newValue: string, todolistId: string) {
        const tasks = tasksObj[todolistId];
        const task = tasks.find(t => t.id === taskId);

        if (task) {
            task.text = newValue;
            setTasks({...tasksObj});
        }
    }

    function changeTodolistTitle(title: string, todolistId: string) {
        const todolist = todoLists.find(t => t.id === todolistId);
        if (todolist) {
            todolist.title = title;
            setTodoLists([...todoLists]);
        }
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


export default App;
