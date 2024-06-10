import { createContext, useContext } from "react"

export const TodoContext = createContext({
    todos: [
        {
            id: 1,
            todo: "todo 1",
            completed: false
        }
    ],
    addTodo: (todo) => {},
    toggleComplete: (id) => {},
    updateTodo: (id, todo) => {},
    removeTodo: (id) => {}
})

export const TodoProvider = TodoContext.Provider

export default function useTodo() {
    return useContext(TodoContext)
}