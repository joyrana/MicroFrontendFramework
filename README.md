## Micro Frontend Framework
This framework has been built with the concept of microfrontend https://micro-frontends.org/. It is based on node.js, webpack, typescript and gulp. It has features like live browser reload when any modification happens in dev mode. There is a basic app which shows the custom elements concept. Webpack will help to create custom bundles and each bundle can contain a set of widgets/elements. You can segregate a frontend with different modules through webpack and each module will have elements/widgets. Which will help a team to develop independently. Feel free to enhance the framework or use it based on your need.

### Building the code

```bash
git clone the repo
npm i
npm i -g gulp
gulp serve
```

### Build options

gulp clean  (For clean up)

gulp serve (For seving in local browser)

gulp build (For development build)

gulp build --production (For production build)

