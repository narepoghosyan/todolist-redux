import axios from "axios";

const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': 'e5b134f1-894f-468a-ae2c-5ec0c7434468'
    }
}

const instance = axios.create({
    'baseURL': 'https://social-network.samuraijs.com/api/1.1/',
    ...settings
})

export type TodolistType = {
    id: string,
    title: string,
    addedDate: string,
    order: number
}

type ResponseType<D = {}> = {
    resultCode: number,
    messages: Array<string>,
    data: D
}

export type TaskType = {
    description: string
    title: string
    status: number
    priority: number
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

type TaskModelType = {
    title: string
    description: string | null
    status: number
    priority: number
    startDate: string | null
    deadline: string | null
}

type GetTasksResponse = {
    error: string | null,
    totalCount: number,
    items: TaskType[]
}

export const todolistsAPI = {
    getTodolists(){
        return instance.get<Array<TodolistType>>('todo-lists');
    },
    createTodolist(title: string) {
        return instance.post<ResponseType<{item: TodolistType}>>('todo-lists', {title});
    },
    deleteTodolist(id: string) {
        return instance.delete<ResponseType>(`todo-lists/${id}`)
    },
    updateTodolist(id: string, title: string) {
        return instance.put<ResponseType>(`todo-lists/${id}`, {title})
    },
    getTasks(todolistId: string) {
        return instance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`)
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}` )
    },
    createTask(todolistId: string, title: string) {
        return instance.post<ResponseType<{item: TaskType}>>('todo-lists/' + todolistId + '/tasks', {title})
    },
    updateTask(todolistId: string, taskId: string, model: TaskModelType) {
        return instance.put(`todo-lists/${todolistId}/tasks/${taskId}`, model)
    }
}