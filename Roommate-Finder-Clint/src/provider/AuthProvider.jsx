import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { auth } from "../firebase/firebase.init";
import { AuthContext } from "../contexts/auth";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Set persistence to LOCAL at initialization
  useEffect(() => {
    setPersistence(auth, browserLocalPersistence).catch((error) => {
      console.error("Auth persistence error:", error);
    });
  }, []);

  // Monitor auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    // Cleanup subscription
    return () => unsubscribe();
  }, []);

  // Create user with email/password
  const createUser = async (email, password) => {
    setLoading(true);
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      setUser(result.user);
      return result;
    } finally {
      setLoading(false);
    }
  };

  // Sign in with email/password
  const signIn = async (email, password) => {
    setLoading(true);
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      setUser(result.user);
      return result;
    } finally {
      setLoading(false);
    }
  };

  // Sign in with Google
  const signInWithGoogle = async () => {
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
      return result;
    } finally {
      setLoading(false);
    }
  };

  // Update user profile
  const updateUserProfile = (userData) => {
    return updateProfile(auth.currentUser, userData);
  };

  // Sign out
  const logOut = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      setUser(null);
      Swal.fire({
        icon: "success",
        title: "Logged Out!",
        text: "You have been successfully logged out",
        timer: 1500,
        showConfirmButton: false,
        position: "top-end",
        toast: true,
      });
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Failed to log out. Please try again.",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const authInfo = {
    user,
    loading,
    createUser,
    signIn,
    signInWithGoogle,
    updateUserProfile,
    logOut,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
