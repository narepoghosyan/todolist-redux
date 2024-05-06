import {TasksStateType, TodoListType} from "../AppWithRedux";
import {AddTodolistAC, todolistsReducer} from "./todolists-reducer";
import {tasksReducer} from "./tasks-reducer";

test('ids should be equal', () => {
    const startTasksState : TasksStateType = {};
    const startTodolistsState: Array<TodoListType> = [];

    const action = AddTodolistAC('new todolist');

    const endTasksState = tasksReducer(startTasksState, action);
    const endTodolistsState = todolistsReducer(startTodolistsState, action);

    const keys = Object.keys(endTasksState);
    const idFromTask = keys[0];
    const idFromTodolist = endTodolistsState[0].id;

    expect(idFromTask).toBe(action.id);
    expect(idFromTodolist).toBe(action.id);
})