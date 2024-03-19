const express = require('express')
const Todo = require('../models/todoModel')
const {
    createTodo,
    getTodos,
    getTodo,
    deleteTodo,
    updateTodo
} = require('../controllers/todoController')
const router = express.Router()

//cala lista
router.get('/', getTodos)

//jedno
router.get('/:id', getTodo)

//dodaj nowe
router.post('/', createTodo)

//usun
router.delete('/:id', deleteTodo)

//edytuj
router.patch('/:id', updateTodo)


module.exports = router