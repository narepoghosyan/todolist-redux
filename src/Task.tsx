import {useDispatch} from "react-redux";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton} from "@mui/material";
import EditableSpan from "./EditableSpan";
import {Delete} from "@mui/icons-material";
import {TaskType} from "./Todolist";

type TaskPropsType = {
    task: TaskType
    todolistId: string
}

export const Task = React.memo((props: TaskPropsType) => {
    const dispatch = useDispatch();

    const onRemoveHandler = () => {
        const action = removeTaskAC(props.task.id, props.todolistId);
        dispatch(action);
    }
    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const action = changeTaskStatusAC(props.task.id, e.currentTarget.checked, props.todolistId);
        dispatch(action);
    }

    const onChangeTitleHandler = useCallback((newValue: string) => {
        const action = changeTaskTitleAC(props.task.id, newValue, props.todolistId);
        dispatch(action)
    }, [props.task.id, props.todolistId, dispatch])

    return <div key={props.task.id} className={props.task.isDone ? 'is-done' : ''}>
        <Checkbox checked={props.task.isDone} onChange={onChangeStatusHandler}/>
        <EditableSpan title={props.task.text} onChange={onChangeTitleHandler}/>
        <IconButton aria-label="delete" onClick={onRemoveHandler}>
            <Delete/>
        </IconButton>
    </div>
})
