import { DefaultTemplate } from "./componets/DefaultTemplate";
import { RouteMain } from "./routes";
import "./styles/index.scss";

function App() {
  return (
    <>
      <DefaultTemplate>
          <RouteMain/>
      </DefaultTemplate>
    </>
);
}

export default App;