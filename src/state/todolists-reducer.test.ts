import {v1} from "uuid";
import {
    AddTodolistAC, ChangeTodolistFilterAC,
    ChangeTodolistFilterActionType,
    ChangeTodolistTitleAC,
    RemoveTodolistAC,
    todolistsReducer
} from "./todolists-reducer";
import {FilterValuesType, TodoListType} from "../AppWithRedux";

test('correct todolist should be removed', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let startState: Array<TodoListType> = [
        {id: todolistId1, title: 'What to do', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'}
    ]

    let endState = todolistsReducer(startState, RemoveTodolistAC(todolistId1));

    expect(endState[0].id).toBe(todolistId2);
    expect(endState.length).toBe(1);
})

test('correct todolist should be added', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let newTodolistTitle = 'New todolist'

    let startState: Array<TodoListType> = [
        {id: todolistId1, title: 'What to do', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'}
    ]

    let endState = todolistsReducer(startState, AddTodolistAC(newTodolistTitle));

    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe('New todolist')
    expect(endState[0].filter).toBe('all')
})

test('correct todolist should change its name', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let newTodolistTitle = 'New todolist'

    let startState: Array<TodoListType> = [
        {id: todolistId1, title: 'What to do', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'}
    ]

    let endState = todolistsReducer(startState, ChangeTodolistTitleAC(todolistId2, newTodolistTitle));

    expect(endState[0].title).toBe('What to do');
    expect(endState[1].title).toBe(newTodolistTitle)
})

test('correct todolist should change its filter', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let newTodolistFilter: FilterValuesType = 'completed'

    let startState: Array<TodoListType> = [
        {id: todolistId1, title: 'What to do', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'}
    ]

    let endState = todolistsReducer(startState, ChangeTodolistFilterAC(todolistId2, newTodolistFilter));

    expect(endState[0].filter).toBe('all');
    expect(endState[1].filter).toBe(newTodolistFilter)
})