import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../app/store";
import { useLogoutMutation } from "../features/userApiSlice";
import { logout, setShowModal } from "../features/authSlice";
import ResetPassword from "./auth/resetPassword";

const Header = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const popupRef = useRef<HTMLDivElement | null>(null);
    const [isPopUpOpen, setIsPopUpOpen] = useState<boolean>(false);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
                setIsPopUpOpen(false);
            }
        };

        // Add the event listener when the pop-up is open
        if (isPopUpOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isPopUpOpen]);

    const { userInfo } = useSelector((state: RootState) => state.auth);
    const userName = userInfo?.name?.charAt(0);

    const popUpHandler = () => {
        setIsPopUpOpen((prevState) => !prevState);
    };
    const [logoutApiCall] = useLogoutMutation();
    const logoutHandler = async () => {
        const logoutData = {};
        try {
            await logoutApiCall(logoutData).unwrap();
            dispatch(logout());
            setIsPopUpOpen(false);
            navigate('/');
        } catch (err) {
            console.error(err);
        }
    };

    const showModal = useSelector((state: RootState) => state.auth.showModal);

    const handleShowForgetPasswordModal = () => {
        dispatch(setShowModal(true));
        setIsPopUpOpen(false);
    };

    return (
        <div className="mb-5 flex justify-between items-center px-8 py-4 bg-sky-600">
            <h1 className="text-base font-medium text-white">TaskTracker</h1>
            <div className="d-flex flex-row relative ">
                {userInfo && (
                    <div className="rounded-full bg-purple-800" onClick={popUpHandler} >
                        <p className="py-3 px-5 text-lg text-white">{userName}</p>
                    </div>
                )}
                {isPopUpOpen &&
                    <div ref={popupRef} className="absolute top-20 -right-0 w-48 h-44 border bg-slate-100 rounded-md">
                        {userInfo && (
                            <>
                                <div className="flex gap-5 justify-center items-center mb-2 pb-2 border-b-2 border-black">
                                    <div className="rounded-full w-11 h-11 bg-purple-800 mt-2">
                                        <p className="text-lg text-white py-2">{userName}</p>
                                    </div>
                                    <div className="text-left">
                                        <h1 className="mt-2">{userInfo?.name}</h1>
                                        <p className="text-sm">{userInfo?.email}</p>
                                    </div>
                                </div>
                            </>
                        )}
                        <ul className="mt-5">
                            <li onClick={handleShowForgetPasswordModal} className="cursor-pointer">
                                Forgot Password?
                            </li>
                            <li
                                className="text-black font-bold py-2 px-6 rounded cursor-pointer"
                                onClick={logoutHandler}>
                                Log Out
                            </li>
                        </ul>
                    </div>}
                {showModal ? <ResetPassword /> : null}
            </div>
        </div>
    )
}

export default Header