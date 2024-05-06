import React, {ChangeEvent, useState} from "react";
import {TextField} from "@mui/material";

type EditableSpanPropsType = {
    title: string
    onChange: (value: string) => void
}

export const EditableSpan = React.memo(function(props: EditableSpanPropsType) {
    console.log('Editable span')
    const [editMode, setEditMode] = useState(false);
    const [title, setTitle] = useState('')

    const activateEditMode = () => {
        setEditMode(true);
        setTitle(props.title)
    };
    const activateViewMode = () => {
        setEditMode(false);
        props.onChange(title)
    };
    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)


    return editMode ? <TextField value={title} autoFocus onBlur={activateViewMode} onChange={onChangeTitleHandler}/> :
        <span onDoubleClick={activateEditMode}>{props.title}</span>
})

export default EditableSpan;