import { Navbar } from "./components/Navbar";
import { Toaster } from "react-hot-toast";
import { Loader2 } from "lucide-react";

import AppRoutes from "./routes/AppRoutes";

import { useAuthStore } from "./store/useAuthStore";
import { useEffect } from "react";
import { useThemeStore } from "./store/useThemeStore";

const App = () => {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();
  const { theme } = useThemeStore();
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth && !authUser) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="size-10 animate-spin" />
      </div>
    );
  }

  return (
    <div data-theme={theme}>
      <Navbar />
      <AppRoutes />
      <Toaster />
    </div>
  );
};

export default App;
