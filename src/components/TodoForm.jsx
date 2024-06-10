import React, { useState } from 'react'
import useTodo from '../contexts/TodoContext'

function TodoForm() {
    const [todo, setTodo] = useState('')
    const { addTodo } = useTodo()

    const add = (e) => {
        e.preventDefault()

        if (!todo) return
        addTodo({ id: Date.now(), todo, completed: false })
        setTodo('')
    }

    return (
        <form onSubmit={add} className="flex">
            <input
                type="text"
                placeholder="Write Todo..."
                className="w-full border border-gray-300 rounded-l-lg px-3 outline-none duration-150 dark:placeholder:text-slate-400 bg-white dark:text-white dark:bg-gray-700 py-1.5"
                value={todo}
                onChange={(e) => setTodo(e.target.value)}
            />
            <button type="submit" className="rounded-r-lg px-3 py-1 bg-green-600 text-white shrink-0">
                Add
            </button>
        </form>
    )
}

export default TodoForm