import React from "react";

import { Navbar } from "./components/ui";
import AppLoader from "./components/ui/hoc/AppLoader";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "./store/usersSlice";
import { useLocation, useRoutes } from "react-router-dom";
import routes from "./components/routes/routes";

function App() {
  const isLoggedIn = useSelector(selectIsLoggedIn())
  const location = useLocation()
  const elements = useRoutes(routes(isLoggedIn,location))

  return (
    <AppLoader>
      <div style={{maxWidth: '1200px', width:'100%', margin:'0 auto', position: 'relative', marginTop: '10px', boxShadow: '0px 0px 10px 2px rgba(0, 211, 255, 0.2)', height: '97vh', borderRadius:'3px'}}>
      <Navbar />
      {elements}
      </div>
    </AppLoader>
  );
}

export default App;
