import HomePage from "./pages/home";
import SubmitEventPage from "./pages/submit";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AdminPage from "./pages/admin";

export default function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path='/'>
            <HomePage />
          </Route>
          <Route exact path='/submit'>
            <SubmitEventPage />
          </Route>
          <Route exact path='/admin'>
            <AdminPage />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}
