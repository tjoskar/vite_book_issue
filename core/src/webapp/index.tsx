import { render } from "react-dom";
import { Code } from "@mantine/core";

function App() {
  return <Code>Hello</Code>;
}

render(<App />, document.querySelector("#app"));
