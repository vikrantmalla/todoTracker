import { useState } from "react"
import Header from "./components/header";
import TodoForm from "./components/todoForm";
import TodoList from "./components/todoList";
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

function IndexPopup() {
  const [inputValue, setInputValue] = useState<string>("")
  return (
    <>
      <div>
        <header>
          <Header />
        </header>
        <main className="w-[50%] m-auto">
          <TodoForm inputValue={inputValue} setInputValue={setInputValue} />
          <TodoList />
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
