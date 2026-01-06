import { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { FcGoogle } from 'react-icons/fc';
import { TbFidgetSpinner } from 'react-icons/tb';

import useAuth from '../../../hooks/useAuth';
import Loading from '../../../Components/Loading';

const Login = () => {
  const { signInUser, GoogleSignIn, loading, user } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate(from, { replace: true });
    }
  }, [user, from, navigate]);

  // Email & Password Login
  const onSubmit = async (data) => {
    try {
      await signInUser(data.email, data.password);
      toast.success('Login Successful');
      navigate(from, { replace: true });
    } catch (err) {
      toast.error(err?.message || 'Login failed');
    }
  };

  // Google Login
  const handleGoogleSignIn = async () => {
    try {
      await GoogleSignIn();
      toast.success('Login Successful');
      navigate(from, { replace: true });
    } catch (err) {
      toast.error(err?.message || 'Google login failed');
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="flex flex-col max-w-md p-6 rounded-md bg-white shadow-md space-y-6">

        <h1 className="text-3xl font-bold text-center">Login</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

          {/* Email */}
          <div>
            <label className="block mb-1 text-sm">Email</label>
            <input
              type="email"
              {...register('email', { required: 'Email is required' })}
              className="w-full px-3 py-2 border rounded-md bg-gray-100 focus:outline-lime-500"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block mb-1 text-sm">Password</label>
            <input
              type="password"
              {...register('password', { required: 'Password is required' })}
              className="w-full px-3 py-2 border rounded-md bg-gray-100 focus:outline-lime-500"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-lime-500 text-white py-3 rounded-md flex justify-center items-center"
          >
            {loading ? (
              <TbFidgetSpinner className="animate-spin text-xl" />
            ) : (
              'Login'
            )}
          </button>
        </form>

        {/* Google Login */}
        <div
                  onClick={handleGoogleSignIn}
                  className="flex justify-center items-center space-x-2 p-2 border rounded cursor-pointer"
                >
                  <FcGoogle size={28} />
                  <p>Continue with Google</p>
                </div>
        
                <p className="text-center text-gray-500 text-sm">
                  Don't have an account?{' '}
                  <Link to="/register" className="text-lime-500 hover:underline">
                    Register
                  </Link>
                </p>
              </div>
    </div>
  );
};

export default Login;
