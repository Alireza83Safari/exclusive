import { useRoutes } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import Header from "./pages/Header";
import routes from "./routes/routes";
import { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getUserInfos } from "./Redux/Store/auth";

function App() {
  const route = useRoutes(routes);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserInfos() as any);
  }, []);

  return (
    <div className="App">
      <Header />
      <Toaster />
      {route}
      <Footer />
    </div>
  );
}

export default App;
