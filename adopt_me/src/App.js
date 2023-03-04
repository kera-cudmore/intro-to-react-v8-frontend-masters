// Pet Component
const Pet = (props) => {
  return React.createElement("div", {}, [
    React.createElement("h1", {}, props.name),
    React.createElement("h2", {}, props.animal),
    React.createElement("h2", {}, props.breed),
  ]);
};

// creating App function
const App = () => {
  return React.createElement("div", {}, [
    React.createElement("h1", {}, "Adopt Me!"),
    React.createElement(Pet, {
      animal: "Dog",
      name: "Bubba",
      breed: "English Bulldog",
    }),
    React.createElement(Pet, {
      animal: "Dog",
      name: "Spud",
      breed: "Jack Russell",
    }),
    React.createElement(Pet, {
      animal: "Dog",
      name: "Shona",
      breed: "Boxer",
    }),
  ]);
};

// instantiating the function
const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);
root.render(React.createElement(App));
