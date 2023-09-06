import { useForm, SubmitHandler } from "react-hook-form";
import { useDispatch } from 'react-redux';
import { addTodo } from '../features/todoSlice';
import { MdAdd } from "react-icons/md";


type FormData = {
    taskInput: string;
};

const TodoForm = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm({
        defaultValues: {
            taskInput: "",
        },
    });
    const dispatch = useDispatch();

    const submit: SubmitHandler<FormData> = (data) => {
        const { taskInput } = data;
        dispatch(addTodo(taskInput))
        reset()
    }

    return (
        <>
            <form onSubmit={handleSubmit(submit)}>
                <div className="flex flex-row justify-center items-start gap-4">
                    <div>
                        <input
                            className="p-2 w-[100%] border"
                            type="text"
                            {...register("taskInput", {
                                required: "Please enter your Task",
                            })}
                            placeholder="Enter a new task..."
                        />
                        {errors.taskInput != null && (
                            <small className="error-message block text-red-600 mt-2 text-start">
                                {errors.taskInput.message}
                            </small>
                        )}
                    </div>
                    <button className={`font-bold py-3 px-4 ${isSubmitting
                        ? "bg-gray-100 text-black border border-black"
                        : "bg-blue-500 hover:bg-blue-700 text-white focus:outline-none focus:shadow-outline"
                        }`} type="submit" disabled={isSubmitting}><MdAdd /></button>
                </div>
            </form>
        </>
    )
}

export default TodoForm