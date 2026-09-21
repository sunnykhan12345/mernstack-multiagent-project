import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../utils/firebase";
import api from "../utils/axios";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../redux/userSlice";

const Home = () => {
  const userData = useSelector((state) => state.user.userData);
  const dispatch = useDispatch();

  const handleLogin = async (token) => {
    try {
      const { data } = await api.post("/api/auth/login", { token });

      console.log("Login response:", data);
      dispatch(setUserData(data.user));
    } catch (error) {
      console.error("Backend Login Error:", error);
    }
  };

  const googleLogin = async () => {
    try {
      // 1. Google/Firebase login
      const result = await signInWithPopup(auth, googleProvider);

      // 2. Get Firebase ID token
      const token = await result.user.getIdToken();

      console.log("Firebase token received");

      // 3. Send token to backend
      await handleLogin(token);

      console.log("User:", result.user);
    } catch (error) {
      console.error("Google Login Error:", error);
    }
  };

  return (
    <div className="flex items-center justify-center w-full bg-black h-screen">
      {!userData ? (
        <div className="w-full max-w-md p-8 rounded-xl shadow-lg border bg-white">
          <h1 className="text-2xl font-bold text-center mb-6 text-black">
            Welcome to Multi-Agent AI Project
          </h1>

          <button
            onClick={googleLogin}
            className="w-full flex items-center justify-center gap-3 border border-gray-300 rounded-lg px-4 py-3 hover:bg-gray-100 transition text-black"
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              className="w-5 h-5"
            />

            <span>Continue with Google</span>
          </button>
        </div>
      ) : (
        <div className="text-white text-center">
          <h1 className="text-3xl font-bold">
            Welcome, {userData.name || "User"} 👋
          </h1>

          <p className="mt-2 text-gray-300">You are successfully logged in.</p>
        </div>
      )}
    </div>
  );
};

export default Home;
