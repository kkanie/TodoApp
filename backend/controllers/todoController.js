const Todo = require('../models/todoModel')
const mongoose = require('mongoose')
//get all
const getTodos = async (req, res) =>{
    const todos = await Todo.find({}).sort({createdAt: -1})

    res.status(200).json(todos)
}

//get id
const getTodo = async (req, res) =>{
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:"Brak takiego todo"})
    }

    const todo = await Todo.findById(id)

    if(!todo){
        return res.status(404).json({error: "Brak takiego todo"})
    }

    res.status(200).json(todo)
}

//nowy
const createTodo = async (req, res) =>{
    const {title, description} = req.body

    let emptyFields = []

    if(!title){
        emptyFields.push('title')
    }
    if(!description){
        emptyFields.push('description')
    }
    if(emptyFields.length>0){
        return res.status(400).json({error: 'Prosze usupelnic wszystkie pola', emptyFields})
    }

    //dodawanie do bazy danych
    try{
        const todo = await Todo.create({title, description})
        res.status(200).json(todo)
    }catch(error){
        res.status(400).json({error: error.message})
    }
}
//usun
const deleteTodo = async (req, res) =>{
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:"Brak takiego todo"})
    }

    const todo = await Todo.findOneAndDelete({_id: id})

    if(!todo){
        return res.stat(404).json({error: "Brak takiego todo"})
    }

    res.status(200).json(todo)
}

//edytuj
const updateTodo = async (req, res) =>{
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:"Brak takiego todo"})
    }

    const todo = await Todo.findOneAndUpdate({_id:id}, {
        ...req.body
    })

    if(!todo){
        return res.stat(404).json({error: "Brak takiego todo"})
    }

    res.status(200).json(todo)

}

module.exports = {
    getTodos,
    getTodo,
    updateTodo,
    deleteTodo,
    createTodo
}