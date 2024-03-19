import {useContext} from "react";
import {TodoContext, TodoContextValue} from "../context/TodoContext.tsx";

export const useTodoContext = (): TodoContextValue => {
    const context = useContext(TodoContext);

    if(!context){
        throw Error('useTodoContext musi byc uzyty w TodoContextProvider')
    }

    return context
}