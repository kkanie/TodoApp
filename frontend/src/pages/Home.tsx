import React, {useEffect, useState} from "react";
import TodoDetails from "../Components/TodoDetails.tsx";
import TodoForm from "../Components/TodoForm.tsx";
import {Todo} from "../../types";
import {useTodoContext} from "../hooks/useTodoContext.tsx"

const Home = () => {
    //const [todos, setTodos] = useState<Todo[]>()
    const {todos, dispatch} = useTodoContext()
    useEffect(() => {
        const fetchTodos = async () => {
            const response = await fetch('/api/todos')
            const json: Todo[] = await response.json()

            if(response.ok){
                //setTodos(json)
                dispatch({type: 'SET_TODOS', payload: json})
            }
        }

        fetchTodos()
    }, []);
    console.log(todos)
    return(
        <div className="home">
            <div className="todos">
                {todos && todos.map((todo)=>(
                    <TodoDetails key={todo._id} todo={todo}/>
                ))}
            </div>
            <TodoForm/>
        </div>
    )
}

export default Home