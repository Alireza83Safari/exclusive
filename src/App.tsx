import { useRoutes } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import Header from "./pages/Header";
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
