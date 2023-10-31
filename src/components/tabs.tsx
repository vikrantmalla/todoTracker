import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../app/store";
import { setOpenTab } from "../features/authSlice";
import { TabType } from "../types/enum";
import SignUp from "./auth/signUp";
import LogIn from "./auth/logIn";

const Tabs = () => {
  const dispatch = useDispatch<AppDispatch>();
  // const showForgetPasswordModal = useSelector((state: RootState) => state.auth.showForgetPasswordModal);
  const openTab = useSelector((state: RootState) => state.auth.openTab);
  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full">
          <ul
            className="flex flex-column mb-0 list-none flex-wrap pt-3 pb-4"
            role="tablist"
          >
            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
              <button
                className={
                  "w-[100%] text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                  (openTab === TabType.logIn ? "bg-yellow-400 text-white" : "bg-white")
                }
                onClick={() => dispatch(setOpenTab(TabType.logIn))}
                data-toggle="tab"
                role="tablist"
              >
                LOGIN
              </button>
            </li>
            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
              <button
                className={
                  "w-[100%] text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                  (openTab === TabType.signUp ? "bg-yellow-400 text-white" : "bg-white")
                }
                onClick={() => dispatch(setOpenTab(TabType.signUp))}
                data-toggle="tab"
                role="tablist"
              >
                SIGNUP
              </button>
            </li>
          </ul>
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full rounded">
            <div className="px-4 py-5 flex-auto">
              <div className="tab-content tab-space">
                <div
                  className={`w-full max-w-lg ${openTab === TabType.logIn ? "block" : "hidden"
                    }`}
                  id="link1"
                >
                  <LogIn />
                </div>
                <div
                  className={`w-full max-w-lg ${openTab === TabType.signUp ? "block" : "hidden"
                    }`}
                  id="link2"
                >
                  <SignUp />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default function TabsRender() {
  return (
    <Tabs />
  );
}
