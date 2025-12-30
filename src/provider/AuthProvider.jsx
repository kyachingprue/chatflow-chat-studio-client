import { useEffect, useState } from "react";
import auth from "../firebase/firebase.config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendEmailVerification,
  onAuthStateChanged,
  sendPasswordResetEmail,
  confirmPasswordReset,
  updateProfile,
} from "firebase/auth";
import toast from "react-hot-toast";
import axios from "axios";
import AuthContext from "../context/AuthContext";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Register
  const registerUser = async (email, password) => {
    setLoading(true);
    const result = await createUserWithEmailAndPassword(auth, email, password);
    await sendEmailVerification(result.user);
    setLoading(false);
    toast.success("Verification email sent. Check your inbox.");
    return result;
  };

  // ✅ Login
  const loginUser = async (email, password) => {
    setLoading(true);
    const result = await signInWithEmailAndPassword(auth, email, password);

    if (!result.user.emailVerified) {
      setLoading(false);
      toast.error("Please verify your email first");
      await signOut(auth);
      throw new Error("Email not verified");
    }

    setLoading(false);
    toast.success("Login successful");
    return result;
  };

  // ✅ Profile update
  const profileUpdate = async (user, profile) => {
    try {
      setLoading(true);
      await updateProfile(user, profile);
    } finally {
      setLoading(false);
    }
  };

  const logoutUser = async () => {
    setLoading(true);
    await axios.post(
      "https://chatflow-studio-server.vercel.app/logout",
      {},
      { withCredentials: true }
    );

    await signOut(auth);
    setUser(null);
    setLoading(false);
  };

  const forgotPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  const resetPassword = (oobCode, newPassword) => {
    return confirmPasswordReset(auth, oobCode, newPassword);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser?.email) {
        await axios.post(
          "https://chatflow-studio-server.vercel.app/jwt",
          { email: currentUser?.email },
          { withCredentials: true }
        );
      } else {
        await axios.post(
          "https://chatflow-studio-server.vercel.app/logout",
          {},
          { withCredentials: true }
        );
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const authInfo = {
    user,
    loading,
    registerUser,
    loginUser,
    logoutUser,
    forgotPassword,
    resetPassword,
    profileUpdate,
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
