import {TasksStateType} from "../AppWithRedux";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./tasks-reducer";
import {AddTodolistAC, RemoveTodolistAC} from "./todolists-reducer";

test('correct task should be deleted from correct array', () => {
    const startState: TasksStateType = {
        "todolistId1": [
            {id: "1", text: "jump", isDone: false},
            {id: "2", text: "run", isDone: true},
            {id: "3", text: "rest", isDone: false},
        ],
        "todolistId2": [
            {id: "1", text: "jumpsuit", isDone: false},
            {id: "2", text: "skirt", isDone: true},
            {id: "3", text: "gloves", isDone: false},
        ]
    }

    const action = removeTaskAC("2", "todolistId2");

    const endState = tasksReducer(startState, action);

    expect(endState['todolistId1'].length).toBe(3);
    expect(endState['todolistId2'].length).toBe(2);
    expect(endState['todolistId2'].every((t: any) => t.id !== '2')).toBeTruthy();
})

test('task should be added to the specified todolist', () => {
    const startState: TasksStateType = {
        "todolistId1": [
            {id: "1", text: "jump", isDone: false},
            {id: "2", text: "run", isDone: true},
            {id: "3", text: "rest", isDone: false},
        ],
        "todolistId2": [
            {id: "1", text: "jumpsuit", isDone: false},
            {id: "2", text: "skirt", isDone: true},
            {id: "3", text: "gloves", isDone: false},
        ]
    }

    const action = addTaskAC('juice', 'todolistId2');
    const endState = tasksReducer(startState, action);

    expect(endState['todolistId1'].length).toBe(3);
    expect(endState['todolistId2'].length).toBe(4);
    expect(endState['todolistId2'][0].id).toBeDefined();
    expect(endState['todolistId2'][0].text).toBe('juice');
    expect(endState['todolistId2'][0].isDone).toBe(false);
})

test('status of specified task should be changed', () => {
    const startState: TasksStateType = {
        "todolistId1": [
            {id: "1", text: "jump", isDone: false},
            {id: "2", text: "run", isDone: true},
            {id: "3", text: "rest", isDone: false},
        ],
        "todolistId2": [
            {id: "1", text: "jumpsuit", isDone: false},
            {id: "2", text: "skirt", isDone: true},
            {id: "3", text: "gloves", isDone: false},
        ]
    }

    const action = changeTaskStatusAC('2', false, 'todolistId2');
    const endState = tasksReducer(startState, action);

    expect(endState['todolistId1'][1].isDone).toBeTruthy();
    expect(endState['todolistId2'][1].isDone).toBeFalsy();
})

test('title of specified task should be changed', () => {
    const startState: TasksStateType = {
        "todolistId1": [
            {id: "1", text: "jump", isDone: false},
            {id: "2", text: "run", isDone: true},
            {id: "3", text: "rest", isDone: false},
        ],
        "todolistId2": [
            {id: "1", text: "jumpsuit", isDone: false},
            {id: "2", text: "skirt", isDone: true},
            {id: "3", text: "gloves", isDone: false},
        ]
    }

    const action = changeTaskTitleAC('2', 'Shorts', 'todolistId2');
    const endState = tasksReducer(startState, action);

    expect(endState['todolistId1'][1].text).toBe('run');
    expect(endState['todolistId2'][1].text).toBe('Shorts');
})

test('new property with new array should be added when new todolist is added', () => {
    const startState: TasksStateType = {
        "todolistId1": [
            {id: "1", text: "jump", isDone: false},
            {id: "2", text: "run", isDone: true},
            {id: "3", text: "rest", isDone: false},
        ],
        "todolistId2": [
            {id: "1", text: "jumpsuit", isDone: false},
            {id: "2", text: "skirt", isDone: true},
            {id: "3", text: "gloves", isDone: false},
        ]
    }

    const action = AddTodolistAC('new todolist');

    const endState = tasksReducer(startState, action);

    const keys = Object.keys(endState);
    const newKey = keys.find(k => k != 'todolistId1' && k != 'todolistId2');

    if(!newKey) {
        throw Error('new key should be added')
    }

    expect(keys.length).toBe(3);
    expect(endState[newKey]).toEqual([]);
})

test('property with todolistId should be deleted', () => {
    const startState: TasksStateType = {
        "todolistId1": [
            {id: "1", text: "jump", isDone: false},
            {id: "2", text: "run", isDone: true},
            {id: "3", text: "rest", isDone: false},
        ],
        "todolistId2": [
            {id: "1", text: "jumpsuit", isDone: false},
            {id: "2", text: "skirt", isDone: true},
            {id: "3", text: "gloves", isDone: false},
        ]
    }

    const action = RemoveTodolistAC('todolistId2');
    const endState = tasksReducer(startState, action);

    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState['todolistId2']).toBeUndefined();
})