import { createRoot } from 'react-dom/client';
import SearchParams from "./SearchParams";

// App component with JSX
const App = () => {
  return (
    <div>
      <h1>Adopt Me!</h1>
      <SearchParams />
    </div>
  )};

// instantiating the function - JSX
const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
