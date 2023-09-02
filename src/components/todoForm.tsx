import React from 'react'
import { useDispatch } from 'react-redux';
import { addTodo } from '../features/todoSlice';
import { ComponentData } from '../types/data';
import { MdAdd } from "react-icons/md";

const TodoForm = ({ inputValue, setInputValue }: ComponentData.TodoForm) => {
    const dispatch = useDispatch();
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value)
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        dispatch(addTodo(inputValue))
        setInputValue('')
    }
    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="flex flex-row justify-center items-center gap-4 border">
                    <input
                        className="p-2"
                        type="text"
                        value={inputValue}
                        onChange={handleInputChange}
                        placeholder="Enter a new task..."
                    />
                    <button className="p-2" type="submit"><MdAdd /></button>
                </div>
            </form>
        </>
    )
}

export default TodoForm