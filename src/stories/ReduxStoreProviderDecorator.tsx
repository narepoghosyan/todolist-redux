import {Provider} from "react-redux";
import {AppRootState, store} from "../state/store";
import {combineReducers, createStore} from "redux";
import {tasksReducer} from "../state/tasks-reducer";
import {todolistsReducer} from "../state/todolists-reducer";
import {v1} from "uuid";


const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
})

const initialGlobalState = {
    todolists: [
        {id: 'todolistId1', title: 'What to learn', filter: 'all'},
        {id: 'todolistId2', title: 'What to buy', filter: 'all'},
    ],
    tasks: {
        ['todolistId1']: [
            {id: v1(), text: 'HTML', isDone: true},
            {id: v1(), text: 'CSS', isDone: true},
        ],
        ['todolistId2']: [
            {id: v1(), text: 'tomato', isDone: true},
            {id: v1(), text: 'potato', isDone: true},
        ]
    }
}
export const storyBookStore = createStore(rootReducer, initialGlobalState as any)
export const ReduxStoreProviderDecorator = (story: any) => {
    return <Provider store={storyBookStore}>{story()}</Provider>
}