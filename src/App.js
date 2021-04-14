import HomePage from "./pages/home";
import SubmitEventPage from "./pages/submit";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AdminPage from "./pages/admin";
import { useContext, useEffect } from "react";
import { UserContext } from "./contexts/user-context";

export default function App() {
  const [user, setUser] = useContext(UserContext).user;

  useEffect(() => {
    if (localStorage.getItem("user")) {
      try {
        setUser(JSON.parse(localStorage.getItem("user")));
      } catch (error) {
        setUser(null);
      }
    }
  }, []);
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
            {user ? <AdminPage /> : <></>}
          </Route>
        </Switch>
      </Router>
    </div>
  );
}
