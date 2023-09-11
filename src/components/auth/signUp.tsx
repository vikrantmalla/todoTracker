import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../app/store";
import { setCredentials, setShowModal } from "../../features/authSlice";
import { SignUpSubmitForm } from "../../types/form";
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useNavigate } from "react-router-dom";
import { useRegMutation } from "../../features/userApiSlice";
import { useEffect } from "react";


const SignUp = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    reset
  } = useForm({
    defaultValues: {
      signupName: "",
      signupEmail: "",
      signupPassword: "",
      signupConfirmPassword: "",
    },
  });
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [reg] = useRegMutation();

  const { userInfo } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate('/');
    }
  }, [navigate, userInfo]);


  const submit = async (formData: SignUpSubmitForm) => {
    const { signupName, signupEmail, signupPassword, signupConfirmPassword } = formData
    const name = signupName;
    const email = signupEmail;
    const password = signupPassword;
    if (signupPassword !== signupConfirmPassword) {
      toast.error('Passwords do not match');
    } else {
      try {
        const res = await reg({ name, email, password }).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate('/');
        toast('Registration is successful. 🎉', {
          toastId: 1
        })
        dispatch(setShowModal(false));
        reset();
      } catch (err) {
        console.log(err)
      }
    }
  };

  const validatePassword = (value: string) => {
    if (!value) {
      return "Please enter your password";
    }
    if (value.length < 4) {
      return "Password must be at least 4 characters long";
    }
  };

  const validateConfirmPassword = (value: string) => {
    const password = watch("signupPassword");
    if (!value) {
      return "Please enter your confirm password";
    }
    if (value !== password) {
      return "Passwords do not match";
    }
  };

  return (
    <form onSubmit={handleSubmit(submit)}>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="name"
        >
          Name
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="name"
          type="name"
          placeholder="Enter Name"
          {...register("signupName", {
            required: "Please enter your name",
          })}
        />
        {errors.signupName != null && (
          <small className="error-message block text-red-600 mt-2">
            {errors.signupName.message}
          </small>
        )}
      </div>
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
          {...register("signupEmail", {
            required: "Please enter your email",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              message: "Please enter a valid email",
            },
          })}
        />
        {errors.signupEmail != null && (
          <small className="error-message block text-red-600 mt-2">
            {errors.signupEmail.message}
          </small>
        )}
      </div>
      <div className="mb-4">
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
          {...register("signupPassword", {
            validate: validatePassword,
          })}
        />
        {errors.signupPassword != null && (
          <small className="error-message block text-red-600 mt-2">
            {errors.signupPassword.message}
          </small>
        )}
      </div>
      <div className="mb-6">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="password"
        >
          Confirm Password
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          id="password"
          type="password"
          placeholder="Confirm Password"
          {...register("signupConfirmPassword", {
            validate: validateConfirmPassword,
          })}
        />
        {errors.signupConfirmPassword != null && (
          <small className="error-message block text-red-600 mt-2">
            {errors.signupConfirmPassword.message}
          </small>
        )}
      </div>
      <div className="my-auto">
        <button
          className={`w-full font-bold py-2 px-4 rounded ${isSubmitting ? 'bg-gray-100 text-black border border-black' : 'bg-blue-500 hover:bg-blue-700 text-white focus:outline-none focus:shadow-outline'}`}
          type="submit"
          disabled={isSubmitting}
        >
          Sign In
        </button>
      </div>
    </form>
  );
};

export default SignUp;