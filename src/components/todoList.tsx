import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from "react-redux";
import { editTodo, removeTodo } from "../features/todoSlice";
import { ContextData } from "../types/data";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { BiEdit } from "react-icons/bi"
import { toast } from 'react-toastify'

const TodoList = () => {
    const todos = useSelector((state: { todos: ContextData.TodoState }) => state.todos.todos);
    const dispatch = useDispatch();
    const [editedText, setEditedText] = useState("");
    const [editingId, setEditingId] = useState<string | null>(null);


    const handleEditTask = (id: string) => {
        setEditingId(id);
        const todoToEdit = todos.find((task) => task.id === id);
        if (todoToEdit) {
            setEditedText(todoToEdit.text);
        }
    };

    const handleSaveEdit = (id: string) => {
        dispatch(editTodo({ id, newText: editedText }));
        setEditingId(null);
        toast.success("Edit successful!");
    };

    const handleCancelEdit = () => {
        setEditingId(null);
        setEditedText("");
    };

    const handleTaskRemoval = (id: string) => {
        dispatch(removeTodo(id));
        toast.error("Remove successful!");
    }
    return (
        <>
            <ul className="list-none flex flex-col justify-between px-1 mt-3">
                {todos.map((task) => (
                    <li key={task.id} className="flex justify-between items-center capitalize text-sm font-normal">
                        {editingId === task.id ? (
                            <>
                                <input type="text" value={editedText} onChange={(e) => setEditedText(e.target.value)} />
                                <div className="flex justify-center items-center gap-3">
                                    <button onClick={() => handleSaveEdit(task.id)}>Save</button>
                                    <button onClick={handleCancelEdit}>Cancel</button>
                                </div>
                            </>
                        ) : (
                            <>
                                {task.text}
                                <div className="flex justify-center items-center gap-3">
                                    <button onClick={() => handleEditTask(task.id)}>
                                        <BiEdit />
                                    </button>
                                    <button onClick={() => handleTaskRemoval(task.id)}>
                                        <MdOutlineDeleteOutline />
                                    </button>
                                </div>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </>
    )
}

export default TodoList