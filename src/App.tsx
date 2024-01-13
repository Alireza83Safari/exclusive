import { useLocation, useRoutes } from "react-router-dom";
import "./App.css";
import routes from "./routes/routes";
import { useEffect, useState } from "react";
import { AuthContextProvider } from "./context/authContext";
import { Toaster } from "react-hot-toast";
import ErrorBoundary from "./components/ErrorBoundary";

function App() {
  const route = useRoutes(routes);
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const [showAlert, setShowAlert] = useState(true);
  useEffect(() => {
    if (showAlert) {
      alert(
        "جهت دسترسی به پنل مدیریت با این اکانت وارد شوید =>  admin1  password= Aa@123456"
      );
      setShowAlert(false);
    }
  }, [showAlert]);

  return (
    <div className="App">
      <ErrorBoundary>
        <AuthContextProvider>{route}</AuthContextProvider>
      </ErrorBoundary>
      <Toaster />
    </div>
  );
}

export default App;
