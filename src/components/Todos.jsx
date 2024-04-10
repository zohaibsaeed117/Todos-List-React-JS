import React, { useEffect } from 'react'
import Todo from './Todo'
import carddata from '../carddata'
import { nanoid } from 'nanoid'

export default function Todos() {

    //States for input of todos
    const [input, setInput] = React.useState({
        title: "",
        description: ""
    })

    function handleChange(e) {
        setInput(prevInput => {
            return {
                ...prevInput,
                [e.target.name]: e.target.value
            }
        })
    }

    //States for todos

    const [todos, setTodos] = React.useState([]);


    function addTodo() {
        if (input.title !== "" && input.description !== "") {
            setTodos(prevTodos => {
                return [...prevTodos,
                {
                    id: nanoid(),
                    title: input.title,
                    description: input.description,
                    done: false
                }
                ]
            }
            )
            setInput(() => {
                return {
                    title: "",
                    description: ""
                }
            })
        }
        else {
            alert("Please Enter title and description")
        }
    }

    function onDelete(id) {
        setTodos(prevTodos => prevTodos.filter(todo => id !== todo.id))
    }
    const onDone = (id) => {
        setTodos(prevTodos => prevTodos.map(todo => {
            if (todo.id === id) {
                return { ...todo, done: !todo.done }
            }
            return todo
        }))
    }

    const todosArray = todos.map(todo => <Todo key={todo.id} id={todo.id} done={todo.done} title={todo.title} description={todo.description} onDelete={onDelete} onDone={onDone} />)

    useEffect(() => {
        const savedTodos = localStorage.getItem('todos');
        console.log(savedTodos);
        if (savedTodos) {
            setTodos(JSON.parse(savedTodos));
        }
    }, [])

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos))
    }, [todos])

    return (
        <>
            <div className="flex flex-col items-center">
                <input
                    name="title"
                    value={input.title}
                    type="text"
                    placeholder="Enter your Todo"
                    className="input input-bordered input-primary w-full  my-4 max-w-xs text-lg"
                    onChange={handleChange}
                />
                <textarea
                    name="description"
                    value={input.description}
                    className="textarea textarea-primary w-full h-28 resize-none max-w-xs my-4 text-lg"
                    placeholder="Enter Description..."
                    onChange={handleChange}>
                </textarea>
                <button className="btn btn-primary max-w-xs my-4" onClick={addTodo}>Add Todo</button>
            </div>
            {todosArray.length > 0 ?
                <section className="grid grid-cols-1 gap-x-4 gap-y-8 mt-4 md:grid-cols-3 sm:grid-cols-2">
                    {todosArray}
                </section>
                :
                <h1 className='text-center text-5xl mt-4 w-full'>No Todos to Show</h1>
            }
        </>
    )
}
