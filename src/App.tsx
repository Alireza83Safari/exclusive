import { useRoutes } from "react-router-dom";
import "./App.css";
import Arrival from "./components/Arrival";
import BestSelling from "./components/BestSelling";
import Category from "./components/Category/Category";
import Content from "./components/Content/Content";
import Footer from "./components/Footer";
import Header from "./pages/Header";
import Options from "./components/Options";
import OurProducts from "./components/OurProducts";
import Promotion from "./components/Promotion/Promotion";
import Suggestion from "./components/Suggestion";
import routes from "./routes/routes";

function App() {
  const route = useRoutes(routes);
  return (
    <div className="App">
      <Header />
      {route}
      <Footer />
    </div>
  );
}

export default App;
