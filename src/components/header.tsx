import { useSelector } from "react-redux";
import { RootState } from "../app/store";
// import { useLogoutMutation } from "../features/userApiSlice";
// import { logout } from "../features/authSlice";

const Header = () => {
    const { userInfo } = useSelector((state: RootState) => state.auth);
    const userName = userInfo.name.charAt(0);
    // const [logoutApiCall] = useLogoutMutation();
    // const logoutHandler = async () => {
    //     const logoutData = {};
    //     try {
    //         await logoutApiCall(logoutData).unwrap();
    //         dispatch(logout());
    //         navigate('/login');
    //     } catch (err) {
    //         console.error(err);
    //     }
    // };
    return (
        <div className="mb-5 flex justify-between items-center px-8 py-4 bg-sky-600">
            <h1 className="text-base font-medium text-white">TaskTracker</h1>
            {userInfo && (
                <div className="rounded-full bg-purple-800">
                   <p className="p-3 px-5 text-lg text-white">{userName}</p>
                </div>
            )}
        </div>
    )
}

export default Header