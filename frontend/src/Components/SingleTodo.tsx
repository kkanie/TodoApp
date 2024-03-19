import React, {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {Todo} from "../../types.ts";

export const SingleTodo = () =>{
    const location=useLocation()
    const [locationState, setLocationState]=useState({id:''})
    const [data, setData] = useState({
        _id: '',
        title: '',
        description: ''
    });
    const [show, setShow] = useState({
        _id: '',
        title: '',
        description: ''
    });

    useEffect(() => {

        const fetchTodo = async () => {
            setLocationState(location.state)
            const response = await fetch('/api/todos/'+location.state.id,{
                method: 'GET'
            })
            const json: Todo = await response.json()

            if(!response.ok){
                console.log('error')
            }

            if (response.ok) {
                setData(json)
                setShow(json)
                console.log(show)
            }
        }
        fetchTodo()
    }, []);

    const navigate = useNavigate()
    const handleSubmit= async (e:any)=>{
        if(data.title===''){
            data.title=show.title
        }
        if(data.description===''){
            data.description=show.description
        }
            const response = await fetch('/api/todos/' + locationState.id, {
                method: 'PATCH',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const odp = await response.json()
            if (!response.ok) {
            }
            console.log("error")


            if (response.ok) {

                setData(odp)
                navigate("/")
                navigate(0)
            }
       // }

    }
    console.log(locationState.id)
    //console.log(data)

    return (
        <div>
            <form className="create" onSubmit={handleSubmit}>
                <h3>Edycja zadania</h3>

                <label>Tytul:</label>
                <input
                    type="text"
                    placeholder='Wprowadź tytuł'
                    value={data.title}
                    onChange={ e => setData({...data, title: e.target.value})}
                />

                <label>Opis:</label>
                <input
                    type="text"
                    placeholder='Wprowadź opis'
                    value={data.description}
                    onChange={ e => setData({...data, description: e.target.value})}
                />

                <button>Edytuj zadanie</button>
            </form>
        </div>
    );
}

export default SingleTodo