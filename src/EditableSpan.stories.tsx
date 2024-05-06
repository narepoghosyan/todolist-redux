import React from 'react';
import {action} from '@storybook/addon-actions'
import EditableSpan from "./EditableSpan";

export default {
    title: "Editable span component",
    component: EditableSpan
}

const callback = action("Value changed")

export const EditableSpanBaseComponent = () => {
    return <EditableSpan title={'Start value'} onChange={callback}/>
}