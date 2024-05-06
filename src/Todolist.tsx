import React, {useCallback} from 'react';
import {FilterValuesType} from "./AppWithRedux";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./state/store";
import {addTaskAC} from "./state/tasks-reducer";
import {Task} from "./Task";

export type TaskType = {
    id: string
    text: string
    isDone: boolean
}

type PropsType = {
    title: string
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    filter: FilterValuesType
    id: string
    removeTodolist: (todolistId: string) => void
    changeTodolistTitle: (title: string, todolistId: string) => void
}

export const Todolist = React.memo(function (props: PropsType) {
    console.log('Todolist called')
    const dispatch = useDispatch();

    const tasks = useSelector<AppRootState, TaskType[]>(state => state.tasks[props.id]);

    const removeTodolist = () => {
        props.removeTodolist(props.id);
    }

    const changeTodolistTitle = useCallback((title: string) => {
        props.changeTodolistTitle(title, props.id);
    }, [props.changeTodolistTitle, props.id])

    const addTask = useCallback((title: string) => {
        dispatch(addTaskAC(title, props.id));
    }, [dispatch, props.id])

    const onAllClickHandler = useCallback(() => props.changeFilter('all', props.id), [props.changeFilter, props.id]);
    const onActiveClickHandler = useCallback(() => props.changeFilter('active', props.id), [props.changeFilter, props.id]);
    const onCompletedClickHandler = useCallback(() => props.changeFilter('completed', props.id), [props.changeFilter, props.id]);

    let tasksForTodoList = tasks;

    if (props.filter === 'completed') {
        tasksForTodoList = tasksForTodoList.filter(t => t.isDone === true)
    }

    if (props.filter === 'active') {
        tasksForTodoList = tasksForTodoList.filter(t => t.isDone === false)
    }


    return (
        <div>
            <h3><EditableSpan title={props.title} onChange={changeTodolistTitle}/>
                {/*<button onClick={removeTodolist}>x</button>*/}
                <IconButton aria-label="delete" onClick={removeTodolist}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask}/>
            <div>
                {tasksForTodoList.map(t => {
                        return <Task task={t} todolistId={props.id} key={t.id}/>
                    }
                )}
            </div>
            <div>
                <Button variant={props.filter === 'all' ? 'contained' : 'text'} onClick={onAllClickHandler}>All
                </Button>
                <Button color={'primary'} variant={props.filter === 'active' ? 'contained' : 'text'}
                        onClick={onActiveClickHandler}>Active
                </Button>
                <Button color={'secondary'} variant={props.filter === 'completed' ? 'contained' : 'text'}
                        onClick={onCompletedClickHandler}>Completed
                </Button>
            </div>
        </div>
    )
})