<picture>
  <source media="(prefers-color-scheme: dark)" srcset="./assets/readme-hero-dark.png"/>
  <source media="(prefers-color-scheme: light)" srcset="./assets/readme-hero-light.png"/>
  <img alt="reduxtron hero image" src="./assets/readme-hero-light.png"/>
</picture>

> what if: redux on electron main process

### features

1. global state, makes the app predictable
1. frontend, tray, main just dispatch functions to a single store
1. they all receive the new state back thru redux subscription
1. easy way to persist all the data (just reading/writing a json file for now)

### getting started

```
npm i # install dependencies
npm run dev # start app on development mode
```

### related

- https://github.com/klarna/electron-redux
