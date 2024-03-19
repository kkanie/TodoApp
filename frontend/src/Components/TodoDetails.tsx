import {Todo} from "../../types";
import React, {CSSProperties, useState} from "react";
import {useTodoContext} from "../hooks/useTodoContext"
import {Link} from "react-router-dom";
interface Props{
    todo: Todo
}
const TodoDetails = ({todo}:Props) => {
    const [data, setData] = useState({
        _id: '',
        title: '',
        description: '',
        satus: false

    });
    const {dispatch} = useTodoContext()
    const handleClick = async() =>{
        const response =await fetch('/api/todos/' + todo._id, {
            method: 'DELETE'
        })
        const json = await response.json()

        if(response.ok){
            dispatch({type: 'DELETE_TODO', payload: json})
        }
    }

    const handleChange = async(e:any)=>{
        todo.status=e.target.checked
        console.log(todo.status)
        const response =await fetch('/api/todos/' + todo._id, {
            method: 'PATCH',
            body: JSON.stringify(todo),
            headers:{
                'Content-Type': 'application/json'
            }
        })
        //console.log(json)
        if(response.ok){
            const odp = await response.json()
            setData(odp)
            // return response.json()

        }
        return  todo
    }

    const style: CSSProperties | undefined = todo.status ? {
        color: '#ED3B3E'
    }: undefined;

    return(
        <div className="todo-details">
            <h4 style={style}>{todo.title}</h4>
            <p><strong>Opis: </strong>{todo.description}</p>
            <p>{todo.createdAt!.toString().slice(0,10)}</p>
            <span className="material-symbols-outlined" onClick={handleClick}>delete_forever</span>
            <input type="checkbox"
                checked={todo.status}
                   onChange={e => handleChange(e)}
            />
            <Link to="/todo/${todo._id}" state={{id: todo._id}}>
                <button>
                    Edytuj
                </button>
            </Link>
        </div>
    )
}

export default TodoDetails