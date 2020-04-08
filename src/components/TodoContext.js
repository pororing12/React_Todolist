import React, { useReducer, createContext,useContext, useRef } from 'react';

const initialTodos = [
    {
        id: 1, 
        text: '프로젝트 생성하기',
        done: true
    },
    {
        id: 2, 
        text: '컴포넌트 스타일링하기',
        done: true
    },
    {
        id: 3, 
        text: 'Context 만들기',
        done: true
    },
    {
        id: 3, 
        text: '기능 구현하기',
        done: true
    }
];

/*
    CREATE
    TOGGLE
    REMOVE
*/
function todoReducer(state, action) {
    switch (action.type) {
        case 'CREATE':
            return state.concat(action.todo);
        case 'TOGGLE':
            //모든 todo에 대해서 변환
            return state.map(
                todo => todo.id === action.id ? { ...todo, done: !todo.done } : todo
            );
            //action.id와 일치하지않는 값만 가져옴
        case 'REMOVE':
            return state.filter(todo => todo.id !== action.id);
            //처리할 수 없는 액션
        default : 
            throw new Error(`Unhandled action type: ${action.type}`);
    }
}


const TodoStateContext = createContext();
const TodoDispatchContext = createContext();
const TodoNextIdContext = createContext();



export function TodoProvider({ children }) {
    const [state, dispatch] = useReducer(todoReducer, initialTodos);
    const nextId = useRef(5);

    return (
        <TodoStateContext.Provider value = {state}>
            <TodoDispatchContext.Provider value = {dispatch}>
                <TodoNextIdContext.Provider value = {nextId}>
                {children}
                </TodoNextIdContext.Provider>
            </TodoDispatchContext.Provider>
        </TodoStateContext.Provider>
    )
}

export function useTodoState() {
    //에러 처리
    const context = useContext(TodoStateContext);
    if (!context) {
        throw new Error('Cannot find TodoProvider');
    }
    return context;
}

export function useTodoDispatch() {
    //에러 처리
    const context = useContext(TodoDispatchContext);
    if (!context) {
        throw new Error('Cannot find TodoProvider');
    }
    return context;
}


export function useTodoNextId() {
    //에러 처리
    const context = useContext(TodoNextIdContext);
    if (!context) {
        throw new Error('Cannot find TodoProvider');
    }
    return context;
}


function TodoContext() {
    return (
        <div>
            
        </div>
    )
}
export default TodoContext;