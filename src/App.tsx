import Header from "./components/header";
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

function IndexPopup() {
  return (
    <>
      <div>
        <header>
          <Header />
        </header>
        <main className="w-[50%] m-auto">
          <Outlet />
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
