import React from 'react';
import {action} from '@storybook/addon-actions'
import {Task} from "./Task";
import {store} from "./state/store";
import AppWithRedux from "./AppWithRedux";
import {Provider} from "react-redux";

export default {
    title: "Task component",
    component: Task
}

const callback = action("Button add pas pressed inside the form")

export const TaskBaseComponent = () => {
    return <div>
        <Provider store={store}>
        <Task task={{id: "1", isDone: true, text: 'CSS'}} todolistId={"todolistId1"}/>
        <Task task={{id: "2", isDone: false, text: 'JS'}} todolistId={"todolistId2"}/>
        </Provider>
    </div>
}