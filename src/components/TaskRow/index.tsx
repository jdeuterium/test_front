import React from 'react';
import {ITask} from "../../models";
import './index.css';

interface Props {
    isCanEdit: boolean;
    task: ITask;
    onSelectTaskForEdit: (id: number) => void;
}
export const TaskRow = (props: Props) => {
    const {task, isCanEdit, onSelectTaskForEdit} = props;
    const onClickEditTaskBtn = () => onSelectTaskForEdit(task.id);

    const getStatusText = () => {
        switch (task.status) {
            case 0:
                return 'задача не выполнена';
            case 1:
                return 'задача не выполнена, отредактирована админом';
            case 10:
                return 'задача выполнена';
            case 11:
                return 'задача отредактирована админом и выполнена';
            default:
                return 'статус не опреелен';
        }
    }

    return <tr key={task.id}>
        <td>{task.id}</td>
        <td>{task.username}</td>
        <td>{task.email}</td>
        <td>{task.text}</td>
        <td>{getStatusText()}</td>
        <td>
            <div className={`edit_btn ${isCanEdit ? '' : 'edit_btn_disabled'}`} onClick={onClickEditTaskBtn}>Edit</div>
        </td>
    </tr>;
};