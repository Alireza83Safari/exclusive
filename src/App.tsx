import { useLocation, useRoutes } from "react-router-dom";
import "./App.css";
import routes from "./routes/routes";
import { useEffect } from "react";
import { AuthContextProvider } from "./context/authContext";
import { Toaster } from "react-hot-toast";
import { ErrorBoundary } from "./components";

function App() {
  const route = useRoutes(routes);
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

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
