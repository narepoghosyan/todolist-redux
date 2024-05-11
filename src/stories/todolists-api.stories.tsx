import {useEffect, useState} from "react";
import axios from "axios";
import {todolistsAPI} from "../api/todolists-api";

export default {
    title: "API"
}

const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': 'e5b134f1-894f-468a-ae2c-5ec0c7434468'
    }
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>({name: 'Nare'});
    useEffect(() => {
        todolistsAPI.getTodolists().then((res) => {
            setState(res.data)
        })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null);

    useEffect(() => {
        todolistsAPI.createTodolist('Nare todolist').then((res) => {
            setState(res.data)
        })
    })

    return <div>{JSON.stringify(state)}</div>
}

export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null);

    useEffect(() => {
        const todolistId = '225387bc-7354-424e-9d26-bbee842f44b7'
        todolistsAPI.deleteTodolist(todolistId).then((res) => {
            setState(res.data)
        })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null);

    useEffect(() => {
        const todolistId = '933b1413-c23f-493d-9c91-c29ad553e8a9'
        todolistsAPI.updateTodolist(todolistId, 'yoyo').then((res) => {
            setState(res.data)
        })
    })

    return <div>{JSON.stringify(state)}</div>
}

export const GetTasks = () => {
    const [state, setState] = useState<any>({name: 'Nare'});
    useEffect(() => {
        const todolistId = '933b1413-c23f-493d-9c91-c29ad553e8a9'
        todolistsAPI.getTasks(todolistId).then((res) => {
            setState(res.data)
        })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const DeleteTask = () => {
    const [state, setState] = useState<any>({name: 'Nare'});
    const [taskId, setTaskId] = useState<string>('');
    const [todolistId, setTodolistId] = useState<string>('')
    const deleteTask = () => {
        todolistsAPI.deleteTask(todolistId, taskId).then((res) => {
            setState(res.data)
        })
    }
    return <div>{JSON.stringify(state)}
        <div>
            <input value={taskId} onChange={(e) => {
                setTaskId(e.currentTarget.value)
            }} placeholder={'Task id'}/>
            <input value={todolistId} onChange={(e) => {
                setTodolistId(e.currentTarget.value)
            }} placeholder={'Todolist id'}/>
            <button onClick={deleteTask}>delete task</button>
        </div>
    </div>
}

export const CreateTask = () => {
    const [state, setState] = useState<any>({name: 'Nare'});
    useEffect(() => {
        const todolistId = '933b1413-c23f-493d-9c91-c29ad553e8a9';
        const title = "I'm a taskkkkk"
        todolistsAPI.createTask(todolistId, title).then((res) => {
            setState(res.data)
        })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const UpdateTaskTitle = () => {
    const [state, setState] = useState<any>(null);

    useEffect(() => {
        const todolistId = '933b1413-c23f-493d-9c91-c29ad553e8a9';
        const taskId = '03e9797d-3d36-4167-94e1-3ed9350bb8aa';
        const model = {
            title: 'Jana',
            description: null,
            status: 0,
            priority: 1,
            startDate: null,
            deadline: null,
        }
        todolistsAPI.updateTask(todolistId, taskId, model).then((res) => {
            setState(res.data)
        })
    })

    return <div>{JSON.stringify(state)}</div>
}