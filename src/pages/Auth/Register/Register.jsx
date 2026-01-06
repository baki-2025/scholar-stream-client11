import { Link, useNavigate, useLocation } from 'react-router';
import { FcGoogle } from 'react-icons/fc';
import { TbFidgetSpinner } from 'react-icons/tb';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import useAuth from '../../../hooks/useAuth';
import Loading from '../../../Components/Loading';
import toast from 'react-hot-toast';

const Register = () => {
  const { registerUser, GoogleSignIn, updateUserProfile, loading, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // ✅ Redirect if user is already logged in
  useEffect(() => {
    if (user) {
      navigate(from, { replace: true });
    }
  }, [user, from, navigate]);

  if (loading) return <Loading />;

  const onSubmit = async (data) => {
    const { name, email, photoURL, password } = data;

    try {
      // 1️⃣ Create user
      const result = await registerUser(email, password);
      console.log(result);

      // 2️⃣ Update profile
      await updateUserProfile({
        displayName: name,
        photoURL: photoURL,
      });

      // 3️⃣ Send user info to backend with default role "Student"
      await fetch(`${import.meta.env.VITE_API_URL}/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, photoURL, role: 'Student' }),
      });

      toast.success('Registration Successful!');
      navigate(from, { replace: true });
    } catch (err) {
      console.error(err);
      toast.error(err.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await GoogleSignIn();
      const loggedUser = result.user;

      // Save to backend with role "Student" if not exists
      await fetch(`${import.meta.env.VITE_API_URL}/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: loggedUser.displayName,
          email: loggedUser.email,
          photoURL: loggedUser.photoURL,
          role: 'Student',
        }),
      });

      toast.success('Login Successful');
      navigate(from, { replace: true });
    } catch (err) {
      console.error(err);
      toast.error(err.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="flex flex-col max-w-md p-6 rounded-md bg-white shadow-md space-y-6">
        <h1 className="text-3xl font-bold text-center">Register</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block mb-1 text-sm">Full Name</label>
            <input
              {...register('name', { required: 'Name is required' })}
              type="text"
              className="w-full px-3 py-2 border rounded-md bg-gray-100 focus:outline-lime-500"
            />
            {errors.name && (
              <span className="text-red-500 text-sm">{errors.name.message}</span>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block mb-1 text-sm">Email</label>
            <input
              {...register('email', {
                required: 'Email is required',
                pattern: { value: /\S+@\S+\.\S+/, message: 'Invalid Email' },
              })}
              type="email"
              className="w-full px-3 py-2 border rounded-md bg-gray-100 focus:outline-lime-500"
            />
            {errors.email && (
              <span className="text-red-500 text-sm">{errors.email.message}</span>
            )}
          </div>

          {/* Photo URL */}
          <div>
            <label className="block mb-1 text-sm">Photo URL</label>
            <input
              {...register('photoURL')}
              type="text"
              className="w-full px-3 py-2 border rounded-md bg-gray-100 focus:outline-lime-500"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block mb-1 text-sm">Password</label>
            <input
              {...register('password', {
                required: 'Password is required',
                minLength: { value: 6, message: 'Minimum 6 characters' },
                pattern: {
                  value: /^(?=.*[A-Z])(?=.*[!@#$%^&*])/,
                  message: 'One uppercase & one special character required',
                },
              })}
              type="password"
              className="w-full px-3 py-2 border rounded-md bg-gray-100 focus:outline-lime-500"
            />
            {errors.password && (
              <span className="text-red-500 text-sm">{errors.password.message}</span>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-lime-500 text-white py-3 rounded-md flex justify-center"
          >
            {loading ? <TbFidgetSpinner className="animate-spin" /> : 'Register'}
          </button>
        </form>

        <div
          onClick={handleGoogleSignIn}
          className="flex justify-center items-center space-x-2 p-2 border rounded cursor-pointer"
        >
          <FcGoogle size={28} />
          <p>Continue with Google</p>
        </div>

        <p className="text-center text-gray-500 text-sm">
          Already have an account?{' '}
          <Link to="/login" className="text-lime-500 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
