import { createRoot } from 'react-dom';
import Pet from "./Pet";

// creating App function
// const App = () => {
//   return React.createElement("div", {}, [
//     React.createElement("h1", {}, "Adopt Me!"),
//     React.createElement(Pet, {
//       animal: "Dog",
//       name: "Bubba",
//       breed: "English Bulldog",
//     }),
//     React.createElement(Pet, {
//       animal: "Dog",
//       name: "Spud",
//       breed: "Jack Russell",
//     }),
//     React.createElement(Pet, {
//       animal: "Dog",
//       name: "Shona",
//       breed: "Boxer",
//     }),
//   ]);
// };

// instantiating the function
// const container = document.getElementById("root");
// const root = createRoot(container);
// root.render(React.createElement(App));

// App component with JSX
const App = () => {
  <div>
    <h1>Adopt Me!</h1>
    <Pet name="Bubba" animal="Dog" breed="Bulldog" />
    <Pet name="Spud" animal="Dog" breed="Jack Russell" />
    <Pet name="Shona" animal="Dog" breed="Boxer" />
  </div>
};

// instantiating the function - JSX
const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
