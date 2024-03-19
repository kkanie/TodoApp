import React, {useState} from "react";
import {useTodoContext} from "../hooks/useTodoContext"

const TodoForm = () =>{
    const {dispatch} = useTodoContext()
    const [title, setTitle] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const [error, setError] = useState<string|null>(null)
    const [emptyFields, setEmptyFields] = useState<string[]>([])

    const handleSubmit = async (e:any)=> {
        e.preventDefault()

        const todo = {title, description}

        const response = await fetch('/api/todos', {
            method: 'POST',
            body: JSON.stringify(todo),
            headers:{
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()

        if(!response.ok){
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }
        if(response.ok){
            setTitle('')
            setDescription('')
            setError(null)
            setEmptyFields([])
            console.log('Dodanie powiodlo sie', json)
            dispatch({type: 'CREATE_TODO', payload: json})
        }


    }
    return(
        <form className="create" onSubmit={handleSubmit}>
            <h3>Dodaj nowe zadanie</h3>

            <label>Tytul:</label>
            <input
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                className={emptyFields.includes('title')?'error':''}
            />

            <label>Opis:</label>
            <input
                type="text"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                className={emptyFields.includes('description')?'error':''}
            />

            <button>Dodaj zadanie</button>
            {error &&<div className="error">{error}</div>}
        </form>
    )
}

export default TodoForm