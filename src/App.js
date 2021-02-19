import Routes from "./components/routes";
import {Provider} from "react-redux";
import promiseMW from "redux-promise"
import reducers from "./reducers";
import {applyMiddleware , createStore } from "redux";

const App = ()=> {
    const createStoreWithMDW = applyMiddleware(promiseMW)(createStore)
    return (
        <Provider store = {createStoreWithMDW(reducers)}>
            <Routes/>
        </Provider>
    )
}

export default App;