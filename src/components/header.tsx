import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../app/store";
import { useLogoutMutation } from "../features/userApiSlice";
import { logout } from "../features/authSlice";

const Header = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { userInfo } = useSelector((state: RootState) => state.auth);
    const userName = userInfo?.name?.charAt(0);

    const [isPopUpOpen, setIsPopUpOpen] = useState<boolean>(false);


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
                    <div className="absolute top-20 -right-0 w-48 h-44 border bg-slate-100 rounded-md">
                        {userInfo && (
                            <>
                                <div className="rounded-full w-11 h-11 bg-purple-800 mt-2 m-auto">
                                    <p className="text-lg text-white py-2">{userName}</p>
                                    <h1 className="mt-2">{userInfo?.name}</h1>
                                </div>
                                <br />
                            </>
                        )}
                        <ul>
                            <li
                                className="text-black font-bold py-2 px-6 rounded"
                                onClick={logoutHandler}>
                                Log Out
                            </li>
                        </ul>
                    </div>}
            </div>
        </div>
    )
}

export default Header