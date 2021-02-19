import { getSessionCookie, SessionContext } from "./session";
import { useContext } from "react";


const Home = ()=>
 {const session = useContext(SessionContext);
  
    return (
        <div>
          <h1>Home Works</h1>
          <p>{session.email}</p>
        </div>
    )
}

export default Home;