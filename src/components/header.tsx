import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../app/store";
import { setShowModal } from "../features/authSlice";
import { useLogoutMutation } from "../features/userApiSlice";
import { logout } from "../features/authSlice";
import AuthModal from "./auth/authModal";

const Header = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    // modal open
    const showModal = useSelector((state: RootState) => state.auth.showModal);
    const { userInfo } = useSelector((state: RootState) => state.auth);
    const toggleModal = () => {
        dispatch(setShowModal(true));
        navigate('/auth');
    };

    const [logoutApiCall] = useLogoutMutation();
    const logoutHandler = async () => {
        const logoutData = {};
        try {
            await logoutApiCall(logoutData).unwrap();
            dispatch(logout());
            navigate('/login');
        } catch (err) {
            console.error(err);
        }
    };
    return (
        <div className="mb-5 flex justify-between items-center px-8 py-4 bg-sky-600">
            <h1 className="text-base font-medium text-white">TaskTracker</h1>
            {!userInfo ? (
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded"
                    type="button" onClick={toggleModal}>
                    Log In
                </button>
            ) : (
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded"
                    type="button" onClick={logoutHandler}>
                    Log Out
                </button>
            )}
            {showModal ? <AuthModal /> : null}
        </div>
    )
}

export default Header