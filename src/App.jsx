import React, { useEffect, useState } from 'react'
import { TodoProvider } from './contexts/TodoContext'
import { ThemeProvider } from './contexts/ThemeContext'
import TodoForm from './components/TodoForm'
import TodoItem from './components/TodoItem'
import ThemeBtn from './components/ThemeBtn'

function App() {
  const [todos, setTodos] = useState([])
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark')

  const lightMode = () => {
    setTheme('light')
    localStorage.setItem('theme', 'light')
  }

  const darkMode = () => {
    setTheme('dark')
    localStorage.setItem('theme', 'dark')
  }

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

    const storedTheme = localStorage.getItem('theme')
    if (storedTheme == 'dark' || storedTheme == 'light') {
      setTheme(storedTheme)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  useEffect(() => {
    document.querySelector('html').classList.remove('light', 'dark')
    document.querySelector('html').classList.add(theme)
  }, [theme])

  return (
    <>
      <TodoProvider value={{ todos, addTodo, toggleComplete, updateTodo, removeTodo }}>
        <div className="bg-white dark:bg-gray-900 min-h-screen pt-5">
          <ThemeProvider value={{ theme, lightMode, darkMode }}>
            <ThemeBtn />
          </ThemeProvider>
          <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 dark:bg-gray-800 dark:shadow-sm">
            <h1 className="text-2xl font-bold text-center mb-8 mt-2 dark:text-white">Todo Manager</h1>
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
    </>
  )
}

export default App