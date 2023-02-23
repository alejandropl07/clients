import AppRouter from "./router/AppRouter";
import { StateProvider } from "./context/StateProvider";
import {initialState, reducer} from './context/reducer'

const App = () => {
  return (
    <StateProvider initialState={initialState} reducer={reducer}>
      <AppRouter />
    </StateProvider>
  );
};

export default App;
