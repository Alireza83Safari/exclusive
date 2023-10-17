import { useLocation, useRoutes } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import Header from "./pages/Header";
import routes from "./routes/routes";
import { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getUserInfos } from "./Redux/Store/auth";

function App() {
  const route = useRoutes(routes);
  const location = useLocation();
  const dispatch = useDispatch();
  const [dataFetched, setDataFetched] = useState<boolean>(false);
  useEffect(() => {
    if (!dataFetched) {
      dispatch(getUserInfos() as any);
      setDataFetched(true);
    }
  }, [dataFetched]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
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
