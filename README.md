# Introduction to React

![Banner](documentation/banner.png)

Introduction to React V8 course at Frontend Masters taught by Brian Holt.

This repository holds my coursework and notes taken whilst completing the course.

[Course Website](https://react-v8.holt.courses/)

* To run the project in development: `npm run dev`

---

## Welcome

### Introduction

* [Lesson Outline](https://react-v8.holt.courses/lessons/welcome/intro)

React apps are made out of components. A component is a piece of the UI (user interface) that has its own logic and appearance. A component can be as small as a button, or as large as an entire page.

React components are JavaScript functions that return markup, and once declared can be nested inside other components.

---

## No Frills React

### Pure React

* [Lesson Outline](https://react-v8.holt.courses/lessons/no-frills-react/pure-react)

#### Creating our first Pure React Component

``` javascript
const App = () => {
        return React.createElement(
          "div",
          {},
          React.createElement("h1", {}, "Adopt Me!")
        )
      };
```

Components are always capitalised. This is required and becomes more important when we start using JSX. In this example our component is called App.

The function will return the results of whatever the React.createElement does: 

1. The element to create, in this example a div.
2. An object with whatever attributes you want to assign to the element, such as a style tag or a class name, ID etc. There has to be something passed here, so you can also use an empty object, or null (which essentially mean the same thing to React). 
3. The children of the element, so this will go inside the div. In this example we have a h1, with no attributes and the raw text adopt me.

`createElement` = creates new HTML tags

So now we have our function, we need to instantiate it, so it shows in the browser:

``` javascript
const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(React.createElement(App));
```

First we create a container to place our component, in this example, we are using the div with the ID of root as the container for our component. This could be called anything, but typically it is called root.

We then need to create the root, which we pass the container to. (In older versions of React this would be done with `ReactDOM.render(container, <App />);` - this can still be found if you are using an older version of React, but has been replaced by the new, better `createRoot` in React 18.)

Finally we use createElement to render the App in the root - attributes and children can also be added here after the App, however as we don't have any we can just omit them here.

Note that although this uses createElement, this time we are passing it a component rather than a string. If you gave it text in a string, it would render that as the tag name. If you give it a component, it will render that component out.

This will probably be the last time you write code using React.createElement etc, as React developers use JSX. However, JSX gets compiled down into JavaScript like shown above, so it is helpful to be able to understand how this works. It is also helpful to know for when createElement shows on stack tracing, as you will understand why its there.

### Components

* [Lesson Outline](https://react-v8.holt.courses/lessons/no-frills-react/components)

We can put the contents of our script into its own Javascript file called App.js and add that as the source in our script tags (note the capitalisation of App)

We are then going to create a pet component in App.js

``` JavaScript
const Pet = () => {
  return React.createElement("div", {}, [
    React.createElement("h1", {}, "Bubba"),
    React.createElement("h2", {}, "Dog"),
    React.createElement("h2", {}, "English Bulldog"),
  ])
};
```

Note that for this component, we have passed it an array of child elements to render. As we've used an array in the pets component, we will also change it in the App component to use an array, as we are going to add three pet components there.

When we add the Pet component into the App component 3 times, it displays the content of the Pet component three times. However this is not ideal, as in the real world we would want to be able to have a bit more flexibility of displaying different pets.

React uses one way data flows - which means we can pass data from App down to Pet, but we can't pass data from Pet up to App. As we know that the parent App can affect the Children, but not the other way around, it makes it more straightforward when it comes to debugging. It also makes the data flow explicit, as if Pet has weird data being passed into it, you'll know that its source is the App, as the data flows from parent to child.

So to pass properties from the parent to the child we will need to pass props as an argument into the Pet function, and then state the name of the props within the element, note that props are not strings:

``` Javascript
const Pet = (props) => {
  return React.createElement("div", {}, [
    React.createElement("h1", {}, props.name),
    React.createElement("h2", {}, props.animal),
    React.createElement("h2", {}, props.breed),
  ])
};
```

Then in App, we can pass the data we want to use to populate the props, note that this data is in strings, but we can also pass booleans, objects, urls etc:

``` Javascript
const App = () => {
  return React.createElement(
    "div",
    {},
    [
    React.createElement("h1", {}, "Adopt Me!"),
    React.createElement(Pet, {
      animal: "Dog",
      name: "Bubba",
      breed: "English Bulldog"
  }),
    React.createElement(Pet, {
      animal: "Dog",
      name: "Spud",
      breed: "Jack Russell"
  }),
    React.createElement(Pet, {
      animal: "Dog",
      name: "Shona",
      breed: "Boxer"
  }),
    ]  
    );
};
```

🏁 [Project Checkpoint 1](https://github.com/btholt/citr-v8-project/tree/main/01-no-frills-react)

---

## JS Tools

### npm

* [Lesson Outline](https://react-v8.holt.courses/lessons/js-tools/npm)

npm stands for node package manager and requires node.js to be installed on your computer in order to be able to use it. It is the worlds largest software registry and is free to use without any registration or login, which makes it a very popular choice for open source developers who use it to share software.

All npm packages installed will be defined in the package.json file, which is written in JSON. It is very similar to a requirements.txt file, which stores the package name and its version.

We can open and close a terminal within VSCode using the shortcut <kbd>control</kbd> + <kbd>backtick</kbd>

Make sure your in the project folder that you want to run npm in and we can start a brand new npm project (this will allow us to keep track of our dependancies) with:

```bash
npm init -y
```

Note: the `-y` is added to prevent npm asking you a bunch of config questions, by using the `-y` it will just generate everything for you.

There will now be a package.json file in the adopt_me folder, which is where all the dependencies will be stored (this is very common in projects that use node.js).

### Prettier

* [Lesson Outline](https://react-v8.holt.courses/lessons/js-tools/prettier)

To add an auto formatter called Prettier, which formats the code everytime you hit save, we need to run the following in the terminal:

``` bash
npm i -D prettier@2.7.1
```
Note: the `i` stands for install, which can also be written as `install`. The `-D` flag lets it know to put it in the developer dependencies, this can also be done with the flag `--save-dev`. 

If you go into the package.json file now you can see that prettier is listed in the devDependencies section. Just before the version number is a  little `^` - which means if you go to install this again it will install a patch of that version if available, eg 2.7.2 - for the sake of this course we want to keep it as an exact version, so will remove the `^`, but normally you would leave it there.

Our next step is to create a configuration object to allow us to use prettier. We do that by creating a new file in the root of the project called .prettierrc - within this folder we can configure prettier, for this project we will just use the default by adding an empty object to the file. If you had a preference for 2 or 4 spaces etc, this is the place to configure this.

Next make sure you have the prettier extension installed, and then in the settings of VSCode enable the format on save, then look for prettier - make sure that prettier:enabled and prettier: require config are checked.

When you create new projects, you will need to install prettier and create the .prettierrc file - but you won't have to configure any of the VSCode stuff.

We can also leave commands in the scripts section of our package.json file so that others can use the tool the same way I am. This is configuring it for JavaScript, JSX, TypeScript and TSX.

```json
"scripts": {
    "format": "prettier --write \"src/**/*.js, jsx, ts, tsx\"",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
```

`prettier` is the CLI command, which means it doesn't have to be installed, it will just find it in the node modules. `--write` means write it back to the file, so it will overwrite everything. We use the `\` to escape the double quote, this is done so prettier is passed the whole string of the path, otherwise bash will expand it for you - `"src/**/*.{js,jsx,ts,tsx}\"` this tells prettier to format everything inside of the source directory, no matter how deep, as long as it has the following file extensions: js, jsx, ts & tsx.

You should now be able to run

```bash
npm run format
```

in the terminal and it will run the format script we just created, checking for JavaScript, JSX, TypeScript and TSX files in the scr folder and formatting any files that need it. It will list the files, and if they are grey it means nothing has changed in the file, if they are white it means changes were made.

We can select prettier from the dropdown on the right of the terminal and select the output tab - this will show us a debug logout of things that it can't run on. If this is empty it can be a good indication that its not installed properly. Prettier also cannot deal with syntax errors, so for example if you added 3 ; - these would show in the problems tab of the terminal.

### EsLint

* [Lesson Outline](https://react-v8.holt.courses/lessons/js-tools/eslint)

Eslint is an open source project that helps to find and fix simple problems in your JavaScript code.

We can install eslint using npm by running the following command in the terminal:

```bash
npm i -D eslint@8.24.0 eslint-config-prettier@8.5.0
```

We will then need to create a file called .eslintrc.json - this is where we will set up the config for eslint. 

```json
{
    "extends": [
        "eslint:recommended",
        "prettier"
    ],
    "plugins": [],
    "parserOptions":{
        "ecmaVersion": 2022,
        "sourceType": "module",
        "ecmaFeatures": {
            "jsx": true
        }
    },
    "env": {
        "es6": true,
        "browser": true,
        "node": true
    }
}
```

In the extends array we are adding `eslint:recommended` as this will flag any issues that would be raised by esline, and these are issues that should definately be addressed. 

We are also adding `prettier` in the extends array - this doesn't add anything, its just removes formatting stuff from eslint, as we are telling it we are using prettier for the formatting. It's important that prettier always comes last in the array.

Next we have an array for plugins - this will currently be empty. 

Next we will add some parserOptions, we are telling it we which `ecmaVersion` to use - we want the 2022 version of javaScript, the `sourceType` is saying to use modules for imports and exports. As we are going to be using JSX, we include that in the `ecmaFeatures` so it accounts for that. We include the `browser` and `node` as true to prevent any errors relating to them causing an issue, by telling it what kind of environments its going to be working in and what kind of Globals are available.

We will now need to make sure we have the ESLint extension installed in VSCode. Note that you may need to restart VSCode to get it to work.

Finally we can add it into our package.json file, to allow others to run the same thing:

```json
"lint": "eslint \"src/**/*.{js,jsx,ts,tsx}\" --quiet",
```

This is the same as the format key with the file path - and the `--quiet` part is to prevent it alerting to every little thing, we want it to just let us know when there are problems.

A nice trick we can use when debugging is we can run the following:

```bash
npm run lint -- --debug
```

So we are telling it to run our lint script, the `--` means that we don't want to perform this with npm, but rather eslint, which is the underlying command, followed by the `--debug` flag. This will show you what it loaded, how it loaded it etc. In a few cases it will be able to fix an issue - you can perform this using `--fix`.

### Git

* [Lesson Outline](https://react-v8.holt.courses/lessons/js-tools/git)

We are going to create a .gitignore file, which tells git what files to ignore, so these won't be pushed to our repo. We will need to include the following:

```
node_modules/
dist/
.env
.DS_Store
coverage/
.vscode/
```

### Vite

* [Lesson Outline](https://react-v8.holt.courses/lessons/js-tools/vite)

Vite is what we will be using as our build tool. Other tools that do the same thing include parcel and webpack. Vite was created by Rich Harris, who also created Svelte.

To install we run the following:

```bash
npm i -D vite@3.1.4 @vitejs/plugin-react@2.1.0
```

Back in our index.html file we are now going to delete the 2 React scripts, as we are going to be bundling React into our project. We will also need to change our script that points to App.js to be App.jsx as we will be using JSX add then add `type="module"` to our script tag. This is so Vite knows we aren't using common JS, we are using ES6 modules.

Some React developers don't use the jsx file extension, and just use js - however as we are using Vite, it requires that files have the jsx extension otherwise it won't perform the jsx translation.

To configure Vite, we will need to create a vite.config.js file in the root of our project, and this is what will define our build process:

```javascript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  root: "src",
});
```

Note: If the index.html file is in the root of the project you don't need the `root: "src" line.

This build process will then go into the src directory (which is listed as the root), it finds the index.html file and then it finds the App.jsx file and will crawl the graph from there. It will understand your JS and CSS.

If you had different heads (index.html is the head file that it will crawl out of), you can identify that to Vite within the config file and it will go find that file.

As we deleted the React script tags in our index.hmtl we will need to install React to allow it to build correctly:

```bash
npm i react@18.2.0 react-dom18.2.0
```

Note: we are installing React and ReactDom without the `-D` flag, this is because React is a production dependancy rather than a developer dependancy.

Vite has something called tree shaking, which is another word for live code inclusion - this means that it only includes code that is being actively used. Dead code elimination is where it goes in and sees if there is any code it can eliminate that is never called. Live code inclusion is in most cases the better of the two.

so rather than using `import ReactDOM from "react-dom";` we could tell it to only import what we are using: `import { createRoot } from "react-dom";` this would make the bundle smaller as its only including what is used. The curly braces are indicating that we are only using part of the package.

Now we are going to add some more scripts in our package.json file:

```json
"dev": "vite",
"build": "vite build",
"preview": "vite preview",
```

Dev will start our development server, build will get ready for production and build the project to static files (this is what you would run in CI), and finally preview will allow us to see the production build before we go to production.

We can now run our script `npm run dev` and it will give us a message letting us know what Local is (which we can <kbd>command</kbd> + click on) and this will open the project in the browser. Note that the port for Vite is always localhost:5173.

🏁 [Project Checkpoint 2](https://github.com/btholt/citr-v8-project/tree/main/02-js-tools)

## Core React Concepts

### JSX

* [Lesson Outline](https://react-v8.holt.courses/lessons/core-react-concepts/jsx)

Up to now, we have been writing JavaScript that imitates the html that we want to output - so we are having to think of what we want as a finished product, translate that into JavaScript, which is then be translated back into html at the end. JSX is the tool that allows us to just write what it is we want and it performs the multiple hops to get there.

In Pet.jsx I have replaced the original Pet component that was creating html using JavaScript with the JSX equivalent. The JSX is easier to read due to it using actual HMTL tags and we simply pass our props within the tags.

In Pet.jsx we use `export default Pet;` - the default means the top level, so in this case, Pet. We can also declare things with const - and this would require the curly braces to import.

In App.jsx we can remove the import React, as due to this being a jsx file we don't need to import it. When we are calling the Pet component, JSX is able to tell that this is a component rather than a string to render because of the capitalised name. We can then pass in the props to the component. 

It is optional with self-closing tags in html if we close them with the trailing slash `/>`, however this is required in JSX.

We are now getting errors in our App.js file telling us that App and Pet are declared but aren't being used - this is because eslint doesn't currently understand JSX and so we need to configure this:

```bash
npm install -D eslint-plugin-import@2.26.0 eslint-plugin-jsx-a11y@6.6.1 eslint-plugin-react@7.31.8
```

and then add the following to the .eslintrc.json file under extends (remember  that the order doesn't matter, we just need to make sure that prettier comes last):

```json
"plugin:import/errors",
"plugin:react/recommended",
"plugin:jsx-a11y/recommended",
```

These plugins just augment eslint, by adding additional capabilities to eslint. These are standard recommended things that should always be followed. 

We will now need to create a new key called rules underneath extends and add the following: 

```json
"rules": {
        "react/prop-types": 0,
        "react/react-in-jsx-scope": 0
    },
```

This is saying don't use prop types as we'll be using typescript, and its also saying that we want to ignore the react in jsx scope rule which required react to be imported to use jsx - by giving these a value of 0 we are saying to ignore these rules (1 means warn, and 2 means error).

For the plugins section, we will add the following:

```json
    "plugins": ["react", "import", "jsx-a11y"],

```

This is saying that we have a React plugin, an import plugin - which allows eslint to follow imports, for example when we export something from one file but import something different into another file, it will follow the export->import and find the error that they don't match. JSX-a11y works making sure things are accessible in your code and pointing them out if not - for example if you put a click listener on something not clickable, this plugin will let you know its not accessible.

Finally we need to add one more new key at the bottom called settings:

```json
"settings": {
        "react": {
            "version": "detect"
        },
        "import/resolver": {
            "node":
            {
                "extensions": [".js", ".jsx"]
            }
        }
    }
```

Eslint will want to know what version of React we're using, so we tell it to go and detect this itself by reading the package.json file. We also need to let it know that when importing we want it to look at .jsx files as well as .js files.

🏁 [Project Checkpoint 3](https://github.com/btholt/citr-v8-project/tree/main/03-jsx)

### Hooks

* [Lesson Outline](https://react-v8.holt.courses/lessons/core-react-concepts/hooks)

By convention all hooks start with use. The examples we are using are function components with hooks. This is the newer way to use hooks in React.

The SearchParams component is going to use an API that has been created and is hosted by Frontend Mentors so that it should always be available.

When writing our searchParams return function, we are using parentheses so that we can write on the next line, if we just hit enter and started writing on the next line this wouldn't work as it would think that the return had ended, so we need the parentheses to let JavaScript know we're going to the next line.

There are a number of words that are reserved in JavaScript that we cannot use as we normally would - for example class or for. If we wanted to add a class to the div, we would need to use className, and if we wanted to use for in a label we would need to use htmlFor.

```jsx
const SearchParams = () => {
    const location = "Orlando, FL";
    return (
        <div className="search-params">
            <form>
                <label htmlFor="location">
                    Location
                    <input id="location" value={location} placeholder="Location" />
                </label>
                <button>Submit</button>
            </form>
        </div>
    )
}

export default SearchParams;
```

In the input we are using curly braces for the value attributes value - this is because if we used quotation marks around it, this would make it a string and it would use the value inside as a string. By using the curly braces, we are saying use the value of the variable location. This variable is known as a JavaScript expression, and anything that could be an expression can be written within the curly braces - so for example we could also add `.toUpperCase()` within the curly braces and it would use the value of the variable location and change it to be uppercase.

We are now going to import this component into our App.js file. First, remove the pet import and add the SearchParams import, then remove all the Pet components and add the SearchParams component.

```jsx
import { createRoot } from 'react-dom/client';
import SearchParams from "./SearchParams";

const App = () => {
  return (
    <div>
      <h1>Adopt Me!</h1>
      <SearchParams />
    </div>
  )};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
```

NOTE: We have updated the reactDOM import to now include client: `import { createRoot } from "react-dom/client` and we will also need to add a return in the app function to be able to view the SearchParam component, otherwise this would be being declared but never used.

So how does React work, and know when to re-render? The SearchParams component in SearchParams.jsx works is that it will continually re-render this a bunch of times. The re-render functions are run a lot, so need to be fairly fast. Every time an event happens in JavaScript it will re-render everything from top to bottom. So if we type in the input and click a button and a top level DOM event happens - React will say the user has done something so something has probably changed and will re-render itself.

In our code however, we can type whatever we want into the input and nothing will ever change, because nothing is changing the location. If you look in the console, it is telling you what the issue is, and that is that there is no onchange handler - React is telling us that this is the issue.

To enable the location value to change, we will need to use something called a hook. There are numerous different hooks in React (you can find out about each of them in the [Hooks API Reference](https://reactjs.org/docs/hooks-reference.html)) but for the location we are going to be looking at `useState`.

We will first need to import the hook, then we will need to change our location variable to be an array that holds the name of the variable, and then the setLocation, which is the function that we call to update the location. We then tell the variable that we want the value to useState with the default to display in the brackets, in our example, we are using an empty string as we don't want to have a value. This is only displayed the first time the component runs, every time after that it'll be ignored.

Now in our input we will need to add an onChange which will take in an event and will then use setLocation which will be the event targets value (so the value of the input in this example)

We are calling the setLocation function to let React know that something has changed and it needs to update itself.

```jsx
import { useState } from 'react';

const SearchParams = () => {
    const [location, setLocation] = useState("");
    return (
        <div className="search-params">
            <form>
                <label htmlFor="location">
                    Location
                    <input
                      onChange={e => setLocation(e.target.value)}
                      id="location"
                      value={location}
                      placeholder="Location"
                    />
                </label>
                <button>Submit</button>
            </form>
        </div>
    )
}

export default SearchParams;
```

This will now allow us to be able to update the text in the input. When our render functions we need to make sure its fast and stateless (stateless means they're not modifying global variables)

So the way to use state inside of the function is to use the hooks, and the hooks are passed to React and then React gives them back to you. In our example location gives you a piece of state which we are keeping track of internally to a React application, and which can change when the user updates the form.

Important! Hooks have to be called every single time in the same order - so they won't work with if's or for loops, as that will change the order that things are called in, which could result in you getting your state back out of order.

As we are now using hooks there is one more eslint rule we will want. In the terminal run:

```bash
npm i -D eslint-plugin-react-hooks@4.6.0
```

This is an official eslint tool from the React team that ensures you are using hooks in the correct way. We will then need to also add to our .eslintrc.json file the following just above prettier:

```json
"plugin:react-hooks/recommended",
```

This plugin will catch the weird rules that hooks have, like not using within an if or for loop and will warn you that you're using it incorrectly.


Map is used a lot in React, as it allows us to take an array and return it as another array of something else - so in our example we are taking an array of animals and then mapping it into an array of options using those animals. This gives us an array of React components which React knows how to render.

```jsx
<label htmlFor="animal">
  Animal
  <select
    id="animal"
    value={animal}
    onChange={e => {setAnimal(e.target.value)}}
  >    
    <option />
    {ANIMALS.map((animal) => (
      <option key="{animal}">{animal}</option>
    ))}
  </select>
</label>
```

If we wanted to make the select dropdown disabled if there are no breeds to select, we can add the following:

```jsx
disabled={breeds.length === 0}
```

This uses a triple equals to see if the length of the breeds array is equal to 0 (empty) and if it is it will disable the select.

We can also add the following to the animal onChange, so that it clears the breed selection if a different animal is chosen:

```jsx
setBreed("");
```

🏁 [Project Checkpoint 4](https://github.com/btholt/citr-v8-project/tree/main/04-hooks)

### Effects

* [Lesson Outline](https://react-v8.holt.courses/lessons/core-react-concepts/effects)

An effect is something that is going to happen outside of your component, so within our component we have location, animal and breed, so once we have those and when the user clicks on the submit button we want to make a request to the API for a new list of pets to allow the user to see what they've searched for. So the effect is basically saying go and retrieve this from some other place, or go and do something outside of the life cycle of my component. Typically this would be an API request, but it could also be a request to get something from local storage or another location, or post this information to an API or storage.

We will need to set another useState for pets, this will be an empty array that we retrieve from the API. We will then create a useEffect with a requestPet function (so we will also need to import useEffect from React at the top of our file) and then call the function below:

```jsx
useEffect(() => {
  requestPets();
});

async function requestPets() {
  const res = await fetch(
    `https://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`
  );

  const json = await res.json();

  setPets(json.pets);
  }
```

Note the use of JavaScript template strings, using the backticks - which allows us to inject the animal, location and breed into the url for the API call. We are then going to save the results of that API request in a variable called json and then assign Pets the pets results of the json.

When we render our Pets, we will need to give it a key, otherwise React will complain. This key can also be used if we wanted to change the order of things such as sorting by breed rather than animal. We would have the same group of elements in the array, but would be ordering them differently. All React knows is that the array changed, but not how it changed, and so would destroy everything in that render tree and re-render it all from scratch. It would be better if it could recognise that we have the same things, just in a different order, so rather than destroying everything and re-rendering it we can just swap them. This is where we can use key, by giving it something unique per object in the array (in our example each pet has an id) it will be able to figure it out on its own due to the key being a unique thing that stays the same.


Effects run every single time you re-render the application by default, so in our example - every single time we type it will re-render, which is not what we want, we can it to only re-render on submit events. We can do this by giving it an array of dependancies. The array will tell it when to run again - so if we give the array nothing it will only request once at the beginning and then not again. The only time after the initial render that we want to call requestPets is when we submit.

```jsx
useEffect(() => {
  requestPets();
}, [animal, location]);
```

If we wanted this to re-search when we change the parameters, we will need to pass in the location and animal to the dependencies array. We will leave the array empty, as we only want this to render once - this will show a warning as it would rather you put requestPets into the array, however this is not what we want as we want to only call on submit. So to do that we will add an onSubmit to our form, and to get rid of the warning we can add a comment to that line `// eslint-disable-line react-hooks/exhaustive-deps` - adding this comment makes it clear that we are choosing to ignore this warning as its not what we wanted to do with our code.

This example shows the best practice way of using an API with a form.

🏁 [Project Checkpoint 5](https://github.com/btholt/citr-v8-project/tree/main/05-useeffect)


### Custom Hooks

* [Lesson Outline](https://react-v8.holt.courses/lessons/core-react-concepts/custom-hooks)

What we have created is a controlled form, which is using React to precisely control this form. This isn't best practice, but is helpful to know how to do, as it is a good way of understanding how state works.

Now we are going to build a custom hook to allow us to select an animal and then see the breeds for that animal - so for example if we select bird, we want to see breed options such as macaw, budgie, raven etc. Custom hooks are basically other hooks packaged together. In our example we are packaging up a number of useState and useEffect hooks so that we can just call our one hook, useBreedList, rather than having to call numerous things.

We first need to create a new file in our scr folder called useBreedList - this can be a js or jsx file extension, either will work. I have chosen to go with js as this file has no jsx code. We will need to import useState and useEffect from React, and we will declare a variable localCache which will be an empty object.

```javascript
import { useState, useEffect } from "react";

const localCache = {};
```

Next we will write our function useBreedList - and we will want to put the export details at the front of this as we will be importing this in our SearchParams file. We will pass animal to our function. Now we are going to define our breedList and status. Our breedList will take in an animal, and then will serve the breed list from the cache when called again. Status allows us to show different loading states - by default its unloaded.

```javascript
export default function useBreedList(animal) {

  const [breedList, setBreedList] = useState([]);
  const [status, setStatus] = useState("unloaded");
```

After defining breedList and status, we can start working on our useEffect.

```javascript
useEffect(() => {
    // If animal is not selected - breed list should be empty array
    if (!animal) {
      setBreedList([]);
      // If animal has been stored in local cache, use local cache to display breed list
    } else if (localCache[animal]) {
      setBreedList(localCache[animal]);
      // If animal is selected but not in local cache, request the breed list
    } else {
      requestBreedList();
    }

    async function requestBreedList() {
      setBreedList([]);
      setStatus("loading");

      const res = await fetch(
        `https://pets-v2.dev-apis.com/breeds?animal=${animal}`
      );
      const json = await res.json();
      localCache[animal] = json.breeds || [];
      setBreedList(localCache[animal]);
      setStatus("loaded");
    }
  }, [animal]);

  return [breedList, status];
}
```

First we will state if the breedList is empty or null, use an empty array for the breedList - this will make the breeds dropdown empty. Else if the animal is already stored in the local cache, we will say to use the local cache to display the breedList. Else, request the breedList from the API. Below the if block we will then create a function to request the breedList - this will set the breedList as an empty array and will change the status to loading. It will then declare a variable res to fetch the breedList from the API, the variable json will store the json results from the API call and we will then tell the local cache to store the json.breeds or an empty array. We then call the function with the animal stored in local cache and change the status to loaded.

Outside of the useEffect we pass the animal, and finally we return the breedList and status.

Finally, we will need to import our useBreedList into our SearchParams file and then declare breeds.

```jsx
import { useState, useEffect } from "react";
import Pet from "./Pet";
import useBreedList from "./useBreedList";
const ANIMALS = ["bird", "cat", "dog", "rabbit", "reptile"];

const SearchParams = () => {
  const [location, setLocation] = useState("");
  const [animal, setAnimal] = useState("");
  const [breed, setBreed] = useState("");
  const [pets, setPets] = useState([]);
  const [breeds] = useBreedList(animal);
```

Note: We have status in our SearchParams, but aren't actually using it - so why bother? The reason for this is to make it easy for us to do testing. So if we create custom hooks that are doing something that you have to wait on, it is a good idea to add a status that tracks as this will make it a lot easier to test later. We will cover testing in the [intermediate section: testing](#testing).

🏁 [Project Checkpoint 6](https://github.com/btholt/citr-v8-project/tree/main/06-custom-hooks)

### Handling User Input

* [Lesson Outline](https://react-v8.holt.courses/lessons/core-react-concepts/handling-user-input)

Within our form tag we are calling the onSubmit function, which takes in an event - we are telling the form preventDefault - this means we want to prevent the default action, which is the form submitting - and then we call the requestPets function.

Just like in JavaScript, there are a bunch of different ways we can handle user interactions, like mouseover, keyup etc - take a look at the [React documentation here](https://reactjs.org/docs/events.html#supported-events) for more information on the different events supported in React.

Note: In most cases this won't matter (but there is always an exception!) but the event, `e`, that we are passing into our onSubmit function, is not a real DOM event, but rather a React synthetic event. It has the exact same API's as a normal DOM event, but is a fake DOM event. This is usually something that may become an issue with TypeScript, due to its pickiness about the kind of event.

### Component Composition

* [Lesson Outline](https://react-v8.holt.courses/lessons/core-react-concepts/component-composition)

So when is it time to create a component out of a piece of code? 

We should pull the code and make it its own component include when something should be indivually testable, individually usable, or even when something is getting too big (for example in the SearchParams, the file is around 90 lines, which is pretty long for a React component) - smaller, single purpose components are easier to read and understand and is better practice. Think also whether an item could be reusable, such as on a results page or in an admin section etc - if it can be resued then it makes a good candidate for becoming a reusable component.

A good example in our code is where we are rendering a list of pets, so we are going to take out this piece of code and create a component with it.

```jsx
import Pet from "./Pet";

const Results = ({ pets }) => {
  return (
    <div className="search">
      {!pets.length ? (
        <h1>No Pets Found</h1>
      ) : (
        pets.map((pet) => (
          <Pet
            animal={pet.animal}
            name={pet.name}
            breed={pet.breed}
            images={pet.images}
            location={`${pet.city}, ${pet.state}`}
            key={pet.id}
          />
        ))
      )}
    </div>
  );
};

export default Results;
```

Here we are importing Pet, then creating a new results function and are passing this pets. We will then use a ternary to say if the pets array is 0 length display the heading no pets, otherwise if there are pets, we want to perform the pets.map. We will then implicitly tell it the values. Some people will use the spread operator, however this is not great practice, as it can become difficult to tell where something came from, and is also not acceptable in TypeScript, it must be done as above, so it is better to get into good habits from the start 😊

We will then need to go back to our SearchParams file and import the Results file, we can remove the pet import as we are no longer using it directly in this file (as its being imported in the Results file) and where we had the pets.map under the closing form tag, we can call the Results component and pass it pets.

🏁 [Project Checkpoint 7](https://github.com/btholt/citr-v8-project/tree/main/07-component-composition)

### React Dev Tools

* [Lesson Outline](https://react-v8.holt.courses/lessons/core-react-concepts/react-dev-tools)


Right now, we're doing React development in development mode, which means we can see nice errors in the console that are descriptive about what we're doing and give us hints on a better way of doing things and maybe a link to that.

The development mode of React is 4 times bigger than the normal production package so its very important to not ship the development mode of React to production, because of its size and slowness.

Vite and parcel handle this for you automatically, but the way you would change that if your using webpack for example, you need to care about what the NODE_ENV is set to. If it is set to development, you would be shipping the development version of React. If it is set to production (or anything else) you'll get the smaller packaged production version.

If you have an error in the production version, you will get a message telling you theres and error and to search the error on google - but it won't give you any useful error messages.

React also has something called strict mode. Strict mode will give you warnings about upcoming updates to React that could cause issues - so for example it could tell you something you're doing now is fine, but that it won't work in a later version.

This course is not going to use strict mode, as it basically tells your app to render twice to make sure you don't have any side effects that are not happening consistantly. If you did want to use strict mode you simple wrap your App in the following:

```jsx
<StrictMode>

</StrictMode>
```

This won't slow your App down, or ship anything extra to production as it only works within development mode.

React also has its own dev tools - you can search the chrome store for React Developer Tools and click the add to chrome button.

The React dev tools have options called components and profiler which are like explorers for you to use dev tools. Using the components you can see all the Apps, you can click on the Apps and see the state, you can also modify the state from within the dev tools and it will update on the page. You can see the props being passed in (these can't be amended as they are read-only). It can also tell you the source and the render path.

The profiler option allows you to refresh the page and then stop it, which will give you a breakdown of what took a long time to render, a timeline, rankings etc. This is great for taking a deeper dive into the performance of your application.

The React developer tools are a very important part of React development and you will use these extensively.

---

## React Capabilities

### React Router

* [Lesson Outline](https://react-v8.holt.courses/lessons/react-capabilities/react-router)

React router (we'll be using v6) is one of the most popular client side routers for React. React Router is superior to other routers as it is very accessibility focused, and takes great care in getting their accessibility right.

We are now going to create an additional page for our app, so we will create the Details.jsx file and will need to import an external library:

```bash
npm i react-router-dom@6.4.1
```

Note: for this install we didn't use the `-D` flag. This is because this package is a production dependancy.

Once we have installed the router, we will want to import React Router Dom elements in our App.jsx file underneath our createRoot import and also Details:

```jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Details from "./Details";
```

We will then delete SearchParams and the div in our App, and instead wrap the whole thing in `<BrowserRouter>`. Whatever you wrap with BrowserRouter, is where BrowserRouter is going to be available for use. Inside the `<BrowserRouter>` we are going to add `<Routes>` tags and then nested within that some `<Route>` tags which will point to our pages.

```jsx
 <BrowserRouter>
      <h1>Adopt Me!</h1>
      <Routes>
        <Route path="/details/:id" element={<Details />} />
        <Route path="/" element={<SearchParams />} />
      </Routes>
    </BrowserRouter>
```

We will also need to add `id={pet.id}` in our Pet component in results.

In the route we have the `:id` which is a variable that is used when creating the path, and allows us to access the id within the details page.

Another type of Router is HashRouter - this would change the path from /details/2 to /#details/2. Generally you should avoid using this if possible, however a use case for it could be if you are using Django, where the server can be inflexible as to what kind of routes you can add. You wouldn't be able to add BrowserRoutes for every variation of route as the server wouldn't be able to handle that. Using HashRoute in this case would allow you to define one route, and everything would go through this route.

Another type is StaticRouter - this is used for server side rendering of React apps and Node - we will cover this a bit later on.

So our routing is now working, as we can click a pet and be taken to the correct path using their id, however there is a better way of achieving this within the Pet.jsx file, and that is by adding the following import to the top of the file:

```jsx
import { Link } from 'react-router-dom';
```
and changing our anchor tags to be Link tags. We can still give Links a className, but we will  need to amend the `href` to `to`:

```jsx
<Link to={`/details/${id}`} className="pet">
```

The reason we are adding this is it would be better for React router dom to capture the event and route without forcing the user to totally refresh the page, which is what was happening previously when we used anchor tags.This now won't be a full page refresh when routing to the details page, it'll all be captured on the client side, which is a better way of working.

If we want to get the id out of the path we can use `useParams`, which is a hook (remember hooks have use at the beginning). We will need to import useParams into the top of the Details.jsx file and then we can add the following inside Details:

```jsx
const { id } = useParams();
return <h2>{id}</h2>;
```

If we check the app, we will now see the id for whichever pet we click on, on the details page. The way this works is because of content. We have wrapped our entire application in App.jsx with BrowserRouter, and that allows context to be available to the components underneath it. We can then call useParams in the Details component, because we can pull the id from the context created in the App.jsx BrowserRouter component. useParams won't work unless there is a BrowserRouter to provide it with the information. You should also be able to see this in the dev tools under the components tab.

We will now also import Link in App.jsx as we want to add a link back to home at the top of the page. We will create a header which contains a link to home, and include the text Adopt Me! When users click on this link, they will be returned to the home page.

🏁 [Project Checkpoint 8](https://github.com/btholt/citr-v8-project/tree/master/08-react-router)

### react-query

* [Lesson Outline](https://react-v8.holt.courses/lessons/react-capabilities/react-query)

React Query makes handling data much easier - up to now we had been passing the breedlist to the cache and were checking the cache to see if the data was there. React Query works by saying heres a key, the URL, a refetch method and then everything is handled for you by React Query.

The hardest part of using React is useEffect, it causes a lot of bugs and can be difficult to wrap you're head around when does it happen, when does it cascade etc.

By using React Query you are going to be removing effects from your database because it will handle all your API requests for you.

Try to minimise effects in your code - if there is a library that will do it for you - use that. Where you do need to use them, try to contain them to small testable areas.

So to do this we are going to install:

```bash
npm i @tanstack/react-query@4.10.1
```

Next we need to go to App.jsx and instantiate the query provider by importing it:

```jsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
```

and create our client, which we will need to give a config - it will want to know how long to cache things. We want our cache to be as long as the user is in session, so we use Infinity as the value (this is basically saying once you fetch it, don't re-fetch it).

```jsx
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity,
    },
  }
})
```
Then inside the <BrowserRouter> we will add the following component - this component works the same was as the BrowserRouter in that it provides context whenever we do the use query:

```jsx
<QueryClientProvider client={queryClient}>
```

You may hear some people calling components like BrowserRouter and QueryClientProvider higher order components, as they don't display anything, rather they are wrapper components that provide context to the components beneath them.

Finally we will create a new file called fetchPet.js which will contain the method for fetching pets. This will be called on details.jsx so that we can go and get the individual pet we're looking at. The id variable will get the pet id, the apiRes will fetch the pet for us - something perculiar to React Query is that if its an unsuccessful request, they want you to throw an error - however if you get a 500 error for example it may not throw an error and so we will add an if to say if the apiRes status is not ok then throw a new error, with the error message you would like to display. This is purely for debugging purposes, so its really helpful to give yourself a useful error message here.

By adding this, React Query will be able to know that this doesn't work, and that will allow you to do things like on error etc. This is also something that you will pretty much use everytime you use React Query. After our if statement, React Query will expect you to return a promise (as async functions always return promises) and so we can return the apiRes.json as this will return a promise. Finally we will export our fetchPet. This has now created a fetch method that is ready to be used with React Query

Its useful to have fetchPet in its own seperate file as this makes testing a lot easier. Now we're going to go and use this in Details. First we want to import useQuery, then fetchPet. We then need to make a new variable results and that is going to have the values "details" which is what tells it what type of request it is (this could be anything, its what its stored as in the cache) and then the id. Within fetchPet, the id was given the place of 1, and that is because in this array details is in the 0 position and id in position 1. If details 1 doesn't exist in the cache it will then run fetchPet which will then get that record for you.

```jsx
const results = useQuery(["details", id], fetchPet);
```

The first time this runs there won't be anything available in the cache, so we will display a loading spinner using `isLoading`, and then as soon as fetchPet completes it will then rerender with the correct information. 

After `if(results.isLoading)` we can then assume that pet has loaded and we can store the pet in a variable - `const pet = results.data.pet[0];` - this is how the data will be returned and how we can access the pet, and we can then update the return to give all the details for the pet id requested:

```jsx
return (
    <div className="details">
      <div>
        <h1>{pet.name}</h1>
        <h2>
          {pet.animal} - {pet.breed} - {pet.city}, {pet.state}
        </h2>
        <button>Adopt {pet.name}</button>
        <p>{pet.description}</p>
      </div>
    </div>
  );
```

Note: Currently the button won't do anything, however we now have a more detailed page with the pets information on it 😊

There are a bunch of other things that can be used other than `isLoading` - there are ones for errors (`isError`), fetched (`isFetched`), status, which will give a text which could be used in a switch statement (`status`) and refetch, which you could use to manually refetch the information from the API if you think the results could be stale to refresh it (`refetch`) to name just a few and can be a nicer way of doing things rather than using a `useEffect` as it can be more readable. You can look in the devtools Network tab and you will be able to see that once a pet has been fetched, there is no subsequent refetch, their information is taken from the cache. However when you return to the home page  you will see that the pets search is refetched each time, and that is due to the `useEffect` which will run each time regardless of whether it has run before.

Note: There is no example of if the results hits an error, however with the `isError` we can do something like the code below to handle an error (placed above the if isLoading):

```jsx
if(results.isError) {
  return <h2>There was an error - please try again</h2>;
}
```

By default, it will try 3 times to fetch the data, before showing an error state. This is configurable.

Now we'll create a fetchBreedList file, which will be very similar to fetchPet. One difference is we will add an `if(!animal) return [];` under where we declare the animal variable. This will return an empty array if there is no animal in the search query.


Now we'll refactor useBreedList - first we'll get rid of the `useEffect`, the imports and the variables. First we'll import useEffect and the fetchBreedList. We can then define our results variable like we did in Details.

```jsx
return [results?.data?.breeds ?? [], results.status];
```

The above is ES2021 syntax, a recent feature to Javascript. So the first time that it goes to get the data its going to be a loading state, as there isn't any data in the cache - so the `?.` syntax is saying give me the results if avaiable, if not don't give me an error. The `??` means if anything on the left fails then give me an empty array. So either give me the results or an empty array.

React Query is configurable and allows us to set refetching of data on a query by query basis.

If we wanted to post or put something to the API or DB, we would use `useMutation` rather that `useQuery` which would allow you to post to a site. Further information can be found at the [React Query Documentation](https://tanstack.com/query/v4/docs/guides/mutations).

🏁 [Project Checkpoint 9](https://github.com/btholt/citr-v8-project/tree/master/09-react-query)

### Uncontrolled Forms

* [Lesson Outline](https://react-v8.holt.courses/lessons/react-capabilities/uncontrolled-forms)

There is one more place we are using a useEffect, in SearchParams. We could either get rid of it like above, or we could use an uncontrolled form. The location and animal are being tracked individually with useState and are only used when sending it to the API when we requestPet. It would be much better if we could let the browser take care of this and then just pull it out of the browser whenever we needed to submit an event.

First thing we will need to do is create a fetchSearch.js file and create the async fetchSearch function. 

Next we will need to update the searchParams file. We will no longer be using React to track location and breed, and instead will use the uncontrolled form. We have left animal as it was as this is also being fed into useBreedList, so its important that this is tracked and controlled via React input.

We create an object from the form data which we then use in the results variable.

By doing it this way with the uncontrolled forms, when you request a search that its seen before the rerender will happen almost instantly as it has cached that request as its seen it before, so rather than having to make a request from the API it uses the cache.

We could also add a loading screen in before the return if we wanted to display a loader after the user searches.

🏁 [Project Checkpoint 10](https://github.com/btholt/citr-v8-project/tree/master/10-uncontrolled-forms)

### Class Components

* [Lesson Outline](https://react-v8.holt.courses/lessons/react-capabilities/class-components)

Class components are a bit older and what was predominantly used before functional components were introduced.

We are going to create a file called Carousel.jsx.

NOTE: Class components don't mix with hooks - you can either use class components or hooks - but never both.

Class components must extend the React Component (`class Carousel extends Component`) and every class component has a render function. It doesn't have to return markup, but it must be included and return something. The render function is like the function body of the components we've used up to now.

The word this in class components is very important as that is how the props are passed in. Default props are used when no props are passed into the component. So if we deleted the `images={pet.images}` from the Carousel component in Details.jsx, then the defaultProps in the carousel would display the placeholder image.

We can keep track of the state without hooks with the state defined in the carousel component. State is mutable so we can change the state using a function called this.setState. This is similar to useState.

If we wanted to do something similar to useEffects in the FC, we can use lifecycle methods. In a class component they would use componentDidMount - this would be the same as the useEffect that had an empty array which meant it only ran once the first time it was used. componentDidMount is similar in that it only runs the first time that it mounts onto the DOM and then would never be run again. If you wanted to run it everytime something updates you would use componentDidUpdate, which would run each time the state gets updated. useEffect basically combined all the lifecycle methods into the one useEffect method. Class components aren't deprecated, so you can still write code like this, but people don't tend to anymore as they have moved to using hooks.

It can be common to see projects that are a mix of class based components and hooks. Most new projects will use hooks, and there are still a few things that function components can't do, for example errors - so it is useful to know about class components.

Now we are going to add some interactivity to the carousel, by changing the hero image when one of the thumbnail images is clicked.

We are using an arrow function for handleIndexClick, as when you invoke an arrow function this doesn't create new scope and will capture the scope of wherever it was written, but a standard function would create new scope at the invokation of the function.

🏁 [Project Checkpoint 11](https://github.com/btholt/citr-v8-project/tree/master/11-class-components)

---

## Special Case React Tools

### Error Boundaries

* [Lesson Outline](https://react-v8.holt.courses/lessons/special-case-react-tools/error-boundaries)

🏁 [Project Checkpoint 12](https://github.com/btholt/citr-v8-project/tree/master/12-error-boundaries)

### Portals and Refs

* [Lesson Outline](https://react-v8.holt.courses/lessons/special-case-react-tools/portals-and-refs)

🏁 [Project Checkpoint 13](https://github.com/btholt/citr-v8-project/tree/master/13-portals-and-refs)

### Context

* [Lesson Outline](https://react-v8.holt.courses/lessons/special-case-react-tools/context)

🏁 [Project Checkpoint 14](https://github.com/btholt/citr-v8-project/tree/master/14-context)

---

## End of Introduction

### Conclusion

* [Lesson Outline](https://react-v8.holt.courses/lessons/end-of-intro/conclusion)

### Ways to expand your App

* [Lesson Outline](https://react-v8.holt.courses/lessons/end-of-intro/ways-to-expand-your-app)

---

## Intermediate React V5 

### Welcome to Intermediate React V5

* [Lesson Outline](https://react-v8.holt.courses/lessons/intermediate-react-v5/welcome-to-intermediate-react-v5)

---

## Hooks in Depth

### useRef

* [Lesson Outline](https://react-v8.holt.courses/lessons/hooks-in-depth/useref)

### useReducer

* [Lesson Outline](https://react-v8.holt.courses/lessons/hooks-in-depth/usereducer)

### useMemo

* [Lesson Outline](https://react-v8.holt.courses/lessons/hooks-in-depth/usememo)

### useCallback

* [Lesson Outline](https://react-v8.holt.courses/lessons/hooks-in-depth/usecallback)

### useLayoutEffect

* [Lesson Outline](https://react-v8.holt.courses/lessons/hooks-in-depth/uselayouteffect)

### useId

* [Lesson Outline](https://react-v8.holt.courses/lessons/hooks-in-depth/useid)

### Others

* [Lesson Outline](https://react-v8.holt.courses/lessons/hooks-in-depth/others)

---

## Tailwind CSS

### CSS and React

* [Lesson Outline](https://react-v8.holt.courses/lessons/tailwindcss/css-and-react)

### Tailwind Basics

* [Lesson Outline](https://react-v8.holt.courses/lessons/tailwindcss/tailwind-basics)

### Tailwind Plugins

* [Lesson Outline](https://react-v8.holt.courses/lessons/tailwindcss/tailwind-plugins)

### Apply

* [Lesson Outline](https://react-v8.holt.courses/lessons/tailwindcss/apply)

### Grid and Breakpoints

* [Lesson Outline](https://react-v8.holt.courses/lessons/tailwindcss/grid-and-breakpoints)

### Positioning

* [Lesson Outline](https://react-v8.holt.courses/lessons/tailwindcss/positioning)

---

## Advance React Performance

### Code Splitting

* [Lesson Outline](https://react-v8.holt.courses/lessons/advance-react-performance/code-splitting)

### Server Side Rendering

* [Lesson Outline](https://react-v8.holt.courses/lessons/advance-react-performance/server-side-rendering)

---

## Low Priority Rerendering

### Deferred Values

* [Lesson Outline](https://react-v8.holt.courses/lessons/low-priority-rerendering/deferred-values)

### Transitions

* [Lesson Outline](https://react-v8.holt.courses/lessons/low-priority-rerendering/transitions)

---

## TypeScript

### Refactor Modal

* [Lesson Outline](https://react-v8.holt.courses/lessons/typescript/refactor-modal)

### TypeScript and Eslint

* [Lesson Outline](https://react-v8.holt.courses/lessons/typescript/typescript-and-eslint)

### Refactor Details

* [Lesson Outline](https://react-v8.holt.courses/lessons/typescript/refactor-details)

### Refactor Adopted Pet Context

* [Lesson Outline](https://react-v8.holt.courses/lessons/typescript/refactor-adopted-pet-context)

### ErrorBoundary

* [Lesson Outline](https://react-v8.holt.courses/lessons/typescript/refactor-error-boundary)

### Refactor Carousel

* [Lesson Outline](https://react-v8.holt.courses/lessons/typescript/refactor-carousel)

### Refactor Pet

* [Lesson Outline](https://react-v8.holt.courses/lessons/typescript/refactor-pet)

### Refactor Fetches

* [Lesson Outline](https://react-v8.holt.courses/lessons/typescript/refactor-fetches)

### Refactor Breed List

* [Lesson Outline](https://react-v8.holt.courses/lessons/typescript/refactor-breed-list)

### Refactor Search Params

* [Lesson Outline](https://react-v8.holt.courses/lessons/typescript/refactor-search-params)

### Refactor Results

* [Lesson Outline](https://react-v8.holt.courses/lessons/typescript/refactor-results)

### Refactor App

* [Lesson Outline](https://react-v8.holt.courses/lessons/typescript/refactor-app)

---

## Redux

### Redux Toolkit

* [Lesson Outline](https://react-v8.holt.courses/lessons/redux/redux-toolkit)

### More App State

* [Lesson Outline](https://react-v8.holt.courses/lessons/redux/more-app-state)

### RTK Query

* [Lesson Outline](https://react-v8.holt.courses/lessons/redux/rtk-query)

### Redux Dev Tools

* [Lesson Outline](https://react-v8.holt.courses/lessons/redux/redux-dev-tools)

---

## Testing

### Testing React

* [Lesson Outline](https://react-v8.holt.courses/lessons/testing/testing-react)

### Basic React Testing

* [Lesson Outline](https://react-v8.holt.courses/lessons/testing/basic-react-testing)

### Testing UI Interactions

* [Lesson Outline](https://react-v8.holt.courses/lessons/testing/testing-ui-interactions)

### Testing Custom Hooks

* [Lesson Outline](https://react-v8.holt.courses/lessons/testing/testing-custom-hooks)

### Mocks

* [Lesson Outline](https://react-v8.holt.courses/lessons/testing/mocks)

### Snapshots

* [Lesson Outline](https://react-v8.holt.courses/lessons/testing/snapshots)

### c8

* [Lesson Outline](https://react-v8.holt.courses/lessons/testing/c8)

### Visual Studio Code Extension

* [Lesson Outline](https://react-v8.holt.courses/lessons/testing/visual-studio-code-extension)

---

## End of Intermediate

### End of Intermediate

* [Lesson Outline](https://react-v8.holt.courses/lessons/end-of-intermediate/end-of-intermediate)
