import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { FrontPage } from "./pages/FrontPage";

export function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/"  element={ <FrontPage /> } />
      </Routes>
    </Router>
  );
}


