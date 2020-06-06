# Rendering
Rendering is the process of evaluating a component to produce a 'view' that can then be utilized in the DOM and then viewable on the browser. When does React render our content? Components should be rerendered when:

    1. The state changes
    2. Props change

Does rerendering a component always result in a different view?  No.

Manipulating the DOM can be expensive, especially in modern applications. Rerendering the browser through direct DOM manipulation unnecessarily can be extremely expensive.  Instead, for the sake of effeciency React uses a virtual environment to render changes and determine whether the DOM should actually be updated.  This environment is called the Virtual DOM.