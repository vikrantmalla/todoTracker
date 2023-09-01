import { useEffect, useState } from "react"
import { ToastContainer } from 'react-toastify'
import Header from "./components/header";
import TodoForm from "./components/todoForm";
import TodoList from "./components/todoList";
import "react-toastify/dist/ReactToastify.css";

function IndexPopup() {
  const [tasks, setTasks] = useState<string[]>([])
  const [inputValue, setInputValue] = useState<string>("")
  const [editIndex, setEditIndex] = useState<number | null>(null);

  // Load tasks from localStorage on component mount
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]")
    setTasks(storedTasks)
  }, [])

  useEffect(() => {
    // Save tasks to localStorage whenever tasks state changes
    localStorage.setItem("tasks", JSON.stringify(tasks))
  }, [tasks])

  return (
    <>
      <div className="App p-4">
        <header>
          <Header />
        </header>
        <main>
          <TodoForm tasks={tasks} setTasks={setTasks} inputValue={inputValue} setInputValue={setInputValue} editIndex={editIndex} setEditIndex={setEditIndex} />
          <TodoList tasks={tasks} setTasks={setTasks} setInputValue={setInputValue} setEditIndex={setEditIndex} />
        </main>
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  )
}

export default IndexPopup
