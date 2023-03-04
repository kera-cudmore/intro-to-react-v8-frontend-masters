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

### Prettier

* [Lesson Outline](https://react-v8.holt.courses/lessons/js-tools/prettier)

### EsLint

* [Lesson Outline](https://react-v8.holt.courses/lessons/js-tools/eslint)

### Git

* [Lesson Outline](https://react-v8.holt.courses/lessons/js-tools/git)

### Vite

* [Lesson Outline](https://react-v8.holt.courses/lessons/js-tools/vite)

---

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
