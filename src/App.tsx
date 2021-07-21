import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {
    getTasks, login,
    selectAuth,
    selectAuthError,
    selectAuthState,
    selectQueryParams,
    selectTasks,
    selectTasksError,
    selectTasksState,
    setQueryParams, unLogin
} from "./store";
import {AddTaskModal, AuthModal, EditTaskModal, Pagination, TaskRow} from "./components";
import {dataState} from "./store/common";
import {ITask} from "./models";
import './App.css';
import {isAuthorizedApi} from "./api";

function App() {
    const dispatch = useDispatch();

    const [viewAuthModal, setViewAuthModal] = useState(false);
    const onToggleViewAuthModal = () => setViewAuthModal(!viewAuthModal);

    const [viewAddTaskModal, setViewAddTAskModal] = useState(false);
    const onToggleViewAddTaskModal = () => setViewAddTAskModal(!viewAddTaskModal);

    const [taskForEdit, setTaskForEdit] = useState<ITask | null>();
    const onSelectTaskForEdit = (id: number) => setTaskForEdit(tasks.tasks.find(_ => _.id === id));
    const onCloseEditTaskModal = () => setTaskForEdit(null);

    const [viewInfoBlock, setViewInfoBlock] = useState(false);
    const onCloseInfoBlock = () => setViewInfoBlock(false);

    const authToken = useSelector(selectAuth);
    const authState = useSelector(selectAuthState);
    const authError = useSelector(selectAuthError);

    const tasks = useSelector(selectTasks);
    const tasksState = useSelector(selectTasksState);
    const tasksError = useSelector(selectTasksError);

    const queryParams = useSelector(selectQueryParams);

    useEffect(() => {
        isAuthorizedApi({username: 'admin', password: '123'}).then((result) => {
            result.data.token && login({username: 'admin', password: '123'}, dispatch);
        });
    }, [])

    useEffect(() => {
        getTasks(queryParams, dispatch);
    }, [queryParams])

    const onSelectPage = (pageNumber: number) => {
        setQueryParams({
            ...queryParams,
            page: pageNumber
        }, dispatch);
    };

    const onChangeFieldDirectionParam = (sort_field: 'id' | 'username' | 'email' | 'status') => {
        setQueryParams({
            ...queryParams,
            sort_field: sort_field,
            sort_direction: queryParams.sort_field === sort_field ? 'desc' : 'asc'
        }, dispatch);
    };

    const handleAfterAddTask = () => {
        setViewInfoBlock(true);
        getTasks(queryParams, dispatch);
    };

    const onUnlogin = () => unLogin(authToken, dispatch);

    return (
        <div>
            <div className="head">
                <div className='add_task_btn' onClick={onToggleViewAddTaskModal}>Добавить задачу</div>
                {authToken
                    ? <div
                        className='auth_btn'
                        onClick={onUnlogin}>Выйти</div>
                    :
                    <div
                        className='auth_btn'
                        onClick={onToggleViewAuthModal}>Авторизоваться</div>
                }
            </div>
            {tasksState === dataState.Fetched
                ? <>
                    {viewInfoBlock
                        ? <div className="info">
                            <div className="modal_close" onClick={onCloseInfoBlock}>&times;</div>
                            Задача успешно добавлена!
                        </div>
                        : null}
                    <table className='table'>
                        <colgroup>
                            <col style={{width: 50, maxWidth: 50}}/>
                            <col style={{width: 180, maxWidth: 180}}/>
                            <col style={{width: 180, maxWidth: 180}}/>
                            <col/>
                            <col style={{width: 380, maxWidth: 380}}/>
                            <col style={{width: 80, maxWidth: 80}}/>
                        </colgroup>
                        <thead>
                        <tr>
                            <th onClick={() => onChangeFieldDirectionParam('id')}>Id</th>
                            <th onClick={() => onChangeFieldDirectionParam('username')}>Username</th>
                            <th onClick={() => onChangeFieldDirectionParam('email')}>Email</th>
                            <th>Text</th>
                            <th onClick={() => onChangeFieldDirectionParam('status')}>Status</th>
                            <th/>
                        </tr>
                        </thead>
                        <tbody>
                        {tasks && tasks.tasks
                            ? tasks.tasks.length && tasks.tasks
                            .map(task => <TaskRow
                                key={task.id}
                                onSelectTaskForEdit={onSelectTaskForEdit}
                                isCanEdit={!!authToken}
                                task={task}/>)
                            : null}
                        </tbody>
                    </table>
                    <div className='total_count'>Всего задач: {tasks.total_task_count}</div>
                    <Pagination count={tasks.total_task_count} onSelectPage={onSelectPage}/>
                </>

                : tasksState === dataState.Failed
                    ? <div>[tasksError]: {tasksError}</div>
                    : 'Загрузка...'}
            {viewAuthModal
                ? <AuthModal
                    onCloseModal={onToggleViewAuthModal}
                    token={authToken}
                    state={authState}
                    error={authError}/>
                : null}
            {taskForEdit && authToken
                ? <EditTaskModal
                    onCloseModal={onCloseEditTaskModal}
                    token={authToken}
                    task={(tasks.tasks.find(_ => _.id === taskForEdit.id) || {id: null, text: '', status: 0})}/>
                : null}
            {viewAddTaskModal
                ? <AddTaskModal onCloseModal={onToggleViewAddTaskModal} handleAfterAddTask={handleAfterAddTask}/>
                : null}
        </div>
    );
}

export default App;
