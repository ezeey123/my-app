import Layout from "./lay/Layout";
import { Provider } from "react-redux";
import { store } from "./store/store";
const App = () => {
  return (
    <Provider store={store}>
      <Layout />
    </Provider>
  );
};

export default App;
