# Introduction to React

![Banner](documentation/banner.png)

Introduction to React V8 course at Frontend Masters taught by Brian Holt.

This repository holds my coursework and notes taken whilst completing the course.

[Course Website](https://react-v8.holt.courses/)

---

## Welcome

### Introduction

* [Lesson Outline](https://react-v8.holt.courses/lessons/welcome/intro)

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

🏁 [Project Checkpoint](https://github.com/btholt/citr-v8-project/tree/main/01-no-frills-react)

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

## Core React Concepts

### JSX

* [Lesson Outline](https://react-v8.holt.courses/lessons/core-react-concepts/jsx)

### Hooks

* [Lesson Outline](https://react-v8.holt.courses/lessons/core-react-concepts/hooks)

### Effects

* [Lesson Outline](https://react-v8.holt.courses/lessons/core-react-concepts/effects)

### Custom Hooks

* [Lesson Outline](https://react-v8.holt.courses/lessons/core-react-concepts/custom-hooks)

### Handling User Input

* [Lesson Outline](https://react-v8.holt.courses/lessons/core-react-concepts/handling-user-input)

### Component Composition

* [Lesson Outline](https://react-v8.holt.courses/lessons/core-react-concepts/component-composition)

### React Dev Tools

* [Lesson Outline](https://react-v8.holt.courses/lessons/core-react-concepts/react-dev-tools)

---

## React Capabilities

### React Router

* [Lesson Outline](https://react-v8.holt.courses/lessons/react-capabilities/react-router)

### react-query

* [Lesson Outline](https://react-v8.holt.courses/lessons/react-capabilities/react-query)

### Uncontrolled Forms

* [Lesson Outline](https://react-v8.holt.courses/lessons/react-capabilities/uncontrolled-forms)

### Class Components

* [Lesson Outline](https://react-v8.holt.courses/lessons/react-capabilities/class-components)

---

## Special Case React Tools

### Error Boundaries

* [Lesson Outline](https://react-v8.holt.courses/lessons/special-case-react-tools/error-boundaries)

### Portals and Refs

* [Lesson Outline](https://react-v8.holt.courses/lessons/special-case-react-tools/portals-and-refs)

### Context

* [Lesson Outline](https://react-v8.holt.courses/lessons/special-case-react-tools/context)

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
