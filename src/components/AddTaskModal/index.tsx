import React, {useState} from 'react';
import {createTaskApi} from "../../api";
import '../common.css';

interface Props {
    onCloseModal: () => void;
    handleAfterAddTask: () => void;
}
export const AddTaskModal = (props: Props) => {
    const {onCloseModal, handleAfterAddTask} = props;

    const [error, setError] = useState<any>();

    const [email, setEmail] = useState('');
    const [notValidEmailError, setNotValidEmailError] = useState('');
    const [username, setUsername] = useState('');
    const [text, setText] = useState('');
    const onAddTask = () => createTaskApi({
        email,
        username,
        text
    })
        .then((result) => {
            result.data.status === 'error' && setError(result.data.message);
            if (result.data.status === 'ok') {
                handleAfterAddTask()
                onCloseModal();
            }
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
                    {notValidEmailError
                        ? <div className="error">{notValidEmailError}</div>
                        : null}
                    <input
                        className='text_input'
                        type="email"
                        placeholder='Email'
                        pattern='/^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/'
                        onChange={(event => {
                            if (!event.target.value.match(/^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/)) {
                                setNotValidEmailError('Email не валиден')
                            } else {
                                setNotValidEmailError('')
                            }

                            setEmail(event.target.value);
                        })}
                        autoFocus={true}
                        autoComplete='off'/>
                    <input
                        className='text_input'
                        type="text"
                        placeholder='Username'
                        onChange={(event => setUsername(event.target.value))}
                        autoComplete='off'/>
                    <input
                        className='text_input'
                        type="text"
                        placeholder='Text'
                        onChange={(event => setText(event.target.value))}
                        autoComplete='off'/>
                </div>
                <div className="modal_footer">
                    <div className="modal_btn" onClick={onAddTask}>Сохранить</div>
                </div>
            </div>
        </div>
    );
};