import {createContext, ReactNode, useReducer} from "react"
import {Todo} from "../../types.ts";
import React from "react"


interface TodoContextState {
    todos: Todo[] | null;
}

interface SetTodosAction {
    type: 'SET_TODOS';
    payload: Todo[];
}

interface CreateTodoAction {
    type: 'CREATE_TODO';
    payload: Todo;
}

interface DeleteTodoAction {
    type: 'DELETE_TODO';
    payload: {
        _id: string;
    };
}

type TodoAction = SetTodosAction | CreateTodoAction | DeleteTodoAction;

export interface TodoContextValue {
    todos: Todo[] | null;
    dispatch: React.Dispatch<TodoAction>;
}

export const TodoContext = createContext<TodoContextValue | undefined>(undefined);

export const todosReducer = (state: TodoContextState, action: TodoAction): TodoContextState => {
    switch (action.type){
        case 'SET_TODOS':
            return {
                todos: action.payload
            }
        case 'CREATE_TODO':
            return {
                todos: [action.payload, ...state.todos!]
            }
        case 'DELETE_TODO':
            return{
                todos: state.todos!.filter((t)=>t._id!= action.payload._id)
            }
        default:
            return state
    }
}

interface TodoContextProviderProps {
    children: ReactNode;
}

export const TodoContextProvider: React.FC<TodoContextProviderProps> = ({ children }) => {
    const [state, dispatch] = useReducer(todosReducer, {
        todos: null
    })


    return(
        <TodoContext.Provider value={{...state, dispatch}}>
            {children}
        </TodoContext.Provider>
    )
}