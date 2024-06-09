import React, { useEffect, useState } from 'react'
import { TodoProvider } from './context/TodoContext'
import TodoForm from './components/TodoForm'
import TodoItem from './components/TodoItem'

function App() {
  const [todos, setTodos] = useState([])

  const addTodo = (todo) => {
    setTodos((prev) => [{ ...todo }, ...prev])
  }

  const toggleComplete = (id) => {
    setTodos((prev) => prev.map((prevTodo) => (prevTodo.id === id ? { ...prevTodo, completed: !prevTodo.completed } : prevTodo)))
  }

  const updateTodo = (id, todo) => {
    setTodos((prev) => prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo)))
  }

  const removeTodo = (id) => {
    setTodos((prev) => prev.filter((todoItem) => todoItem.id !== id))
  }

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem('todos'))
    if (todos && todos.length > 0) {
      setTodos(todos)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  return (
    <TodoProvider value={{ todos, addTodo, toggleComplete, updateTodo, removeTodo }}>
      <div className="bg-white min-h-screen pt-5">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">Todo Manager</h1>
          <div className="mb-4">
            <TodoForm />
          </div>
          <div className="flex flex-wrap gap-y-3">
            <div className='w-full p-2'>
              {todos.map((todo) => (
                <TodoItem key={todo.id} todo={todo} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </TodoProvider>
  )
}

export default App
