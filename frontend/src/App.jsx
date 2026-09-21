import Home from "./pages/Home";
import { useEffect } from "react";
import { getCurrentUser } from "./features/getCurrentUser.js";
import { useDispatch } from "react-redux";
import { setUserData } from "./redux/userSlice.js";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./utils/firebase.js";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Wait for Firebase to restore the auth session before calling /api/me.
    // Without this, auth.currentUser is null on page load, so the axios
    // interceptor sends no Authorization header and the request fails.
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const user = await getCurrentUser();
          console.log("Current user:", user);
          dispatch(setUserData(user));
        } catch (error) {
          console.error("Error fetching current user:", error);
        }
      } else {
        // No Firebase user → clear Redux state
        dispatch(setUserData(null));
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  return (
    <>
      <Home />
    </>
  );
};

export default App;
