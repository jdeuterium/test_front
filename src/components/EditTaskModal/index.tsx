import React, {useState} from 'react';
import {ITask} from "../../models";
import {updateTaskApi} from "../../api";
import '../common.css';

interface Props {
    onCloseModal: () => void;
    token: string;
    task: ITask | {id: number | null, text: '', status: 0};
}
export const EditTaskModal = (props: Props) => {
    const {onCloseModal, task, token} = props;

    const [text, setText] = useState(task.text);
    const [status, setStatus] = useState<any>(task.status);
    const [error, setError] = useState<any>();

    const getStatus = () => {
        if (task.text === text && status === 0) {
            return 0;
        }
        if (task.text !== text && status === 0) {
            return 1;
        }
        if (task.text === text && status === 10) {
            return 10;
        }
        if (task.text !== text && status === 10) {
            return 11;
        }
    }

    const onUpdateTask = () => task.id && updateTaskApi(task.id, {
        text,
        status: getStatus(),
        token
    })
        .then((result) => {
            result.data.status === 'error' && setError(result.data.message);
            result.data.status === 'ok' && onCloseModal();
        });

    return (
        <div className='modal_backdrop'>
            <div className="modal">
                <div className="modal_close" onClick={onCloseModal}>&times;</div>
                <div className="modal_body">
                    {error
                        ? <div className='error'>
                            {error ? Object.entries(error)
                                .map(([key, value], index) => <p key={index}>{key}: {value}</p>)
                            : null}
                        </div>
                        : null}
                    <input
                        className='text_input'
                        type="text"
                        placeholder='Text'
                        defaultValue={task.text}
                        onChange={(event => setText(event.target.value))}
                        autoFocus={true}
                        autoComplete='off'/>
                    <select
                        className='text_input'
                        onChange={(event => setStatus(+event.target.value))}
                        defaultValue={task.status}>
                        <option value="0">задача не выполнена</option>
                        <option value="10">задача выполнена</option>
                    </select>
                </div>
                <div className="modal_footer">
                    <div className="modal_btn" onClick={onUpdateTask}>Сохранить</div>
                </div>
            </div>
        </div>
    );
};