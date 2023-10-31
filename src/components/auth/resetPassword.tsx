import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../../app/store";
import { setCredentials, setShowModal } from "../../features/authSlice";
import { LogInSubmitForm } from "../../types/form";
import { useUpdateUserMutation } from "../../features/userApiSlice";
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const ResetPassword = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      loginEmail: "",
      loginPassword: "",
    },
  });

  const navigate = useNavigate();

  const [updateUser] = useUpdateUserMutation();

  const submit = async (data: LogInSubmitForm) => {
    const { loginEmail, loginPassword } = data;
    const email = loginEmail;
    const password = loginPassword;
    try {
      const res = await updateUser({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate('/');
      toast('Login is successful. 🎉', {
        toastId: 1
      });
      reset();
      dispatch(setShowModal(false));
    } catch (err) {
      console.log(err)
    }
  };

  const dispatch = useDispatch<AppDispatch>();

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-6 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0  bg-gray-500 opacity-75"></div>
        </div>
        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>
        <div
          className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6"
        >
          <div>
            <form onSubmit={handleSubmit(submit)}>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="email"
                  type="email"
                  placeholder="Enter Email"
                  {...register("loginEmail", {
                    required: "Please enter your email",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                      message: "Please enter a valid email",
                    },
                  })}
                />
                {errors.loginEmail != null && (
                  <small className="error-message block text-red-600 mt-2">
                    {errors.loginEmail.message}
                  </small>
                )}
              </div>
              <div className="mb-6">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  id="password"
                  type="password"
                  placeholder="Enter Password"
                  {...register("loginPassword", {
                    required: "Please enter your password",
                  })}
                />
                {errors.loginPassword != null && (
                  <small className="error-message block text-red-600 mt-2 mx-0">
                    {errors.loginPassword.message}
                  </small>
                )}
              </div>
              <div className="my-auto">
                <button
                  className={`w-full font-bold py-2 px-4 h-[50px] ${isSubmitting
                    ? "bg-gray-100 text-black border border-black"
                    : "bg-blue-500 hover:bg-blue-700 text-white focus:outline-none focus:shadow-outline"
                    }`}
                  type="submit"
                  disabled={isSubmitting}
                >
                  Reset Password
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
