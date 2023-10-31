import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../app/store";
import { setShowModal, setCredentials } from "../../features/authSlice";
import { useLoginMutation } from "../../features/userApiSlice";
import { useNavigate } from "react-router-dom";
import { LogInSubmitForm } from "../../types/form";
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const LogIn = () => {
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
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [login] = useLoginMutation();

  const { userInfo } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate('/');
    }
  }, [navigate, userInfo]);

  const submit = async (data: LogInSubmitForm) => {
    const { loginEmail, loginPassword } = data;
    const email = loginEmail;
    const password = loginPassword;
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      toast('Login is successful. 🎉', {
        toastId: 1
      })
      reset();
      dispatch(setShowModal(false));
    } catch (err) {
      console.log(err)
    }
  };

  // const showForgetPasswordModal = useSelector((state: RootState) => state.auth.showForgetPasswordModal);

  return (
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
          Log In
        </button>
      </div>
    </form>
  )
};

export default LogIn;