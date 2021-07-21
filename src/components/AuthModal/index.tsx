import React, {useEffect, useState} from 'react';
import {useDispatch} from "react-redux";
import {login} from "../../store";
import {dataState, IDataState} from "../../store/common";
import '../common.css';

interface Props {
    onCloseModal: () => void;
    token: string;
    state: IDataState;
    error: {} | null
}
export const AuthModal = (props: Props) => {
    const dispatch = useDispatch();
    const {onCloseModal, error, state, token} = props;

    useEffect(() => {
        token && onCloseModal();
    }, [token])

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const onClickAuthBtn = () => login({username, password}, dispatch);

    return (
        <div className='modal_backdrop'>
            <div className="modal">
                <div className="modal_close" onClick={onCloseModal}>&times;</div>
                <div className="modal_body">
                    {state === dataState.Failed
                        ? <div className='error'>
                            {error && Object.entries(error)
                                .map(([key, value], index) => <p key={index}>{key}: {value}</p>)}
                        </div>
                        : null}
                    <input
                        className='text_input'
                        type="text"
                        placeholder='Username'
                        onChange={(event => setUsername(event.target.value))}
                        autoFocus={true}
                        autoComplete='off'/>
                    <input
                        className='text_input'
                        type="text"
                        placeholder='Password'
                        onChange={(event => setPassword(event.target.value))}
                        autoComplete='off'/>
                </div>
                <div className="modal_footer">
                    <div className="modal_btn" onClick={onClickAuthBtn}>Авторизоваться</div>
                </div>
            </div>
        </div>
    );
};