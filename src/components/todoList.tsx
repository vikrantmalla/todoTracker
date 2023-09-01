import { MdOutlineDeleteOutline } from "react-icons/md";
import { BiEdit } from "react-icons/bi"
import { toast } from 'react-toastify'

const TodoList = ({ tasks, setTasks, setInputValue, setEditIndex }) => {
    const handleEditTask = (index: number) => {
        setEditIndex(index);
        setInputValue(tasks[index]);
        toast.success("Login successful!");
    };

    const handleTaskRemoval = (index: number) => {
        const updatedTasks = [...tasks]
        updatedTasks.splice(index, 1)
        setTasks(updatedTasks)
    }
    return (
        <>
            <ul className="list-none flex flex-col justify-between px-1 mt-3">
                {tasks.map((task, index) => (
                    <li key={index} className="flex justify-between items-center capitalize text-sm font-normal">
                        {task}
                        <div className="flex justify-center items-center gap-3">
                            <button onClick={() => handleEditTask(index)}><BiEdit /></button>
                            <button onClick={() => handleTaskRemoval(index)}><MdOutlineDeleteOutline /></button>
                        </div>
                    </li>
                ))}
            </ul>
        </>
    )
}

export default TodoList