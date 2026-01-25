import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebase/firebase.init";
import axios from "axios";

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  /* ================= REGISTER ================= */
  const registerUser = async (email, password) => {
    setLoading(true);

    const result = await createUserWithEmailAndPassword(auth, email, password);

    // 🔐 Get JWT from backend
    const res = await axios.post(
      `${import.meta.env.VITE_API_URL}/jwt`,
      { email: result.user.email }
    );

    // ✅ Save JWT
    localStorage.setItem("access-token", res.data.token);

    return result;
  };

  /* ================= LOGIN ================= */
  const signInUser = async (email, password) => {
    setLoading(true);

    const result = await signInWithEmailAndPassword(auth, email, password);

    const res = await axios.post(
      `${import.meta.env.VITE_API_URL}/jwt`,
      { email: result.user.email }
    );

    localStorage.setItem("access-token", res.data.token);

    return result;
  };

  /* ================= GOOGLE LOGIN ================= */
  const GoogleSignIn = async () => {
    setLoading(true);

    const result = await signInWithPopup(auth, googleProvider);

    const res = await axios.post(
      `${import.meta.env.VITE_API_URL}/jwt`,
      { email: result.user.email }
    );

    localStorage.setItem("access-token", res.data.token);

    return result;
  };

  /* ================= LOGOUT ================= */
  const logOut = async () => {
    setLoading(true);

    // 🧹 Remove JWT
    localStorage.removeItem("access-token");

    return signOut(auth);
  };

  /* ================= UPDATE PROFILE ================= */
  const updateUserProfile = (profile) => {
    return updateProfile(auth.currentUser, profile);
  };

  /* ================= AUTH STATE ================= */
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  /* ================= CONTEXT VALUE ================= */
  const authInfo = {
    user,
    loading,
    registerUser,
    signInUser,
    GoogleSignIn,
    logOut,
    updateUserProfile,
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
