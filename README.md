# electron architecture

> what if: redux on electron main process

### features

1. global state, makes the app predictable
1. frontend, tray, main just dispatch functions to a single store
1. they all receive the new state back thru redux subscription
1. easy way to persist all the data (just reading/writing a json file for now)

### getting started

```
npm i # install dependencies
npm start # start app
```

### related

- https://github.com/klarna/electron-redux
