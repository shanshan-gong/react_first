import React, {useState} from "react";

function TodoApp() {

    const [input, setInput] = useState('')
    const [todos, setTodos] = useState([])
    const [todoCount, setTodoCount] = useState(0)
    // const [toggle, setToggle] = useState(false)

    const handleAdd = () => {
        const newTodos = [...todos]
        newTodos.push({
            key: todoCount,
            value: input, 
            tog: false, 
            edit: false, 
            newValue: input
        })
        setTodos(newTodos)
        setInput('')
        setTodoCount(todoCount + 1)
    }

    const handleDelete = (id) => {
        setTodos(prev => prev.filter((i) => i.key !== id))
    }

    const handleToggle = (id) => {
        setTodos(todos.map((todo) => {
            return(
                todo.key === id ? {...todo, tog: !todo.tog} : todo
            )
        }))
    }

    const handleEdit = (id) => {
        setTodos(todos.map((todo) => {
            return(
                todo.key === id ? {...todo, edit: true, newValue: ""} : {...todo, edit: false}
            )
        }))
    }

    const handleChangeEdit = (id, newValue) => {
        setTodos(todos.map(todo => todo.key === id ? {...todo, newValue: newValue} : todo));
    };

    const handleSave = (id, newValue) => {
        setTodos(todos.map(todo => todo.key === id ? {...todo, value: newValue, edit: false} : todo));
    }
    const handleUndo = (id) => {
        setTodos(todos.map(todo => todo.key === id ? {...todo, edit: false} : todo));
    }

    return(
        <div>
            <h1>Todo App</h1>
            <input value={input} onChange={(e) => setInput(e.target.value)}/>
            <button onClick={handleAdd}>Add</button>
            {
                todos.map((i) => {
                    const strikeThrough = i.tog ? "line-through" : "none"

                    return(
                        <p style={{ textDecoration: strikeThrough}}>
                            {i.edit ? (
                                <>
                                    <input value={i.newValue} onChange={(e) => handleChangeEdit(i.key, e.target.value)}/>
                                    <button onClick={() => handleSave(i.key, i.newValue)}>Save</button>
                                    <button onClick={() => handleUndo(i.key)}>Undo</button>
                                </>
                            ) : (
                                <>
                                    {i.value}
                                    <button onClick={() => handleToggle(i.key)}>Toggle</button>
                                    <button onClick={() => handleEdit(i.key)}>Edit</button>
                                    <button onClick={() => handleDelete(i.key)}>Delete</button>
                                </>
                            )}
                            
                        </p>
                    )
                })
            }
        </div>
    )
}

export default TodoApp