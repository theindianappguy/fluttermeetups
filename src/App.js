import HomePage from "./pages/home";
import SubmitEventPage from "./pages/submit";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

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
        </Switch>
      </Router>
    </div>
  );
}
