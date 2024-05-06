import AddItemForm from "./AddItemForm";
import React from 'react';
import {action} from '@storybook/addon-actions'

export default {
    title: "AddItemForm component",
    component: AddItemForm
}

const callback = action("Button add pas pressed inside the form")

export const AddItemFormBaseComponent = () => {
    return <AddItemForm addItem={callback}/>
}