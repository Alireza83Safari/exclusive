import { useLocation, useRoutes } from "react-router-dom";
import "./App.css";
import routes from "./routes/routes";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getUserInfos } from "./Redux/slices/auth";

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

  return <div className="App">{route}</div>;
}

export default App;
