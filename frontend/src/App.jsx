import { Navbar } from "./components/Navbar";
import { Toaster } from "react-hot-toast";
import AppRoutes from "./routes/AppRoutes";

import { useAuthStore } from "./store/useAuthStore";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";

const App = () => {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  console.log("Auth User:", { authUser });

  if (isCheckingAuth && !authUser) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="size-10 animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <AppRoutes />
      <Toaster />
    </div>
  );
};

export default App;
