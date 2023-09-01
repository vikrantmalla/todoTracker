import React from 'react'
import ComponentData from '../types/data';
import { MdAdd } from "react-icons/md";

const TodoForm = ({ tasks, setTasks, inputValue, setInputValue, editIndex, setEditIndex }: ComponentData.TodoForm) => {
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value)
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (inputValue.trim() !== "") {
            if (editIndex !== null) {
                // If editIndex is not null, it means we are editing an existing task
                const updatedTasks = [...tasks];
                updatedTasks[editIndex] = inputValue.trim();
                setTasks(updatedTasks);
                setEditIndex(null); // Reset editIndex after editing
            } else {
                setTasks([...tasks, inputValue.trim()]);
            }
            setInputValue("");
        }
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