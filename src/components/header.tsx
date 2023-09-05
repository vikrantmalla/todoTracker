import { useDispatch, useSelector } from "react-redux";
import { setShowModal } from "../features/authSlice";
import { AppDispatch, RootState } from "../app/store";
import AuthModal from "./auth/AuthModal";

const Header = () => {
    const dispatch = useDispatch<AppDispatch>();

    // modal open
    const showModal = useSelector((state: RootState) => state.authReducer.showModal);
    const toggleModal = () => {
        dispatch(setShowModal(true));
    };
    return (
        <div className="mb-5 flex justify-between items-center px-8 py-4 bg-sky-600">
            <h1 className="text-base font-medium text-white">TaskTracker</h1>
            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded"
                type="button" onClick={toggleModal}>
                Log In
            </button>
            {showModal ? <AuthModal /> : null}
        </div>
    )
}

export default Header