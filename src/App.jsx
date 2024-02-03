import { DefaultTemplate } from "./componets/DefaultTemplate";
import { RouteMain } from "./routes";

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