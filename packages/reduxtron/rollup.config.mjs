import ts from "rollup-plugin-ts";
import json from "@rollup/plugin-json";
import pkg from "./package.json" assert { type: "json" };

const isWatchMode = process.env.ROLLUP_WATCH === "true";

const typesInput = "src/types.ts";
const mainInput = "src/main.ts";
const preloadInput = "src/preload.ts";
const zustandStoreInput = "src/zustand-store.ts";
const plugins = [
  ts({ browserslist: false, tsconfig: "./tsconfig.json" }),
  json(),
];
const external = ["electron", "redux", "zustand"];
const sourcemap = isWatchMode ? false : true;

/** @type {import('rollup').RollupOptions['watch']} */
const watch = { include: ["src/**"], clearScreen: false };

/** @type {import('rollup').RollupOptions} */
const cjsTypes = {
  ...{ input: typesInput, watch, plugins, external },
  output: {
    file: pkg.exports["./types"].require,
    format: "cjs",
    sourcemap,
    esModule: false,
  },
};

/** @type {import('rollup').RollupOptions} */
const esmTypes = {
  ...{ input: mainInput, watch, plugins, external },
  output: {
    file: pkg.exports["./main"].default,
    format: "esm",
    sourcemap,
    esModule: true,
  },
};

/** @type {import('rollup').RollupOptions} */
const cjsMain = {
  ...{ input: mainInput, watch, plugins, external },
  output: {
    file: pkg.exports["./main"].require,
    format: "cjs",
    sourcemap,
    esModule: false,
  },
};

/** @type {import('rollup').RollupOptions} */
const esmMain = {
  ...{ input: mainInput, watch, plugins, external },
  output: {
    file: pkg.exports["./main"].default,
    format: "esm",
    sourcemap,
    esModule: true,
  },
};

/** @type {import('rollup').RollupOptions} */
const cjsPreload = {
  ...{ input: preloadInput, watch, plugins, external },
  output: {
    file: pkg.exports["./preload"].require,
    format: "cjs",
    sourcemap,
    esModule: false,
  },
};

/** @type {import('rollup').RollupOptions} */
const esmPreload = {
  ...{ input: preloadInput, watch, plugins, external },
  output: {
    file: pkg.exports["./preload"].default,
    format: "esm",
    sourcemap,
    esModule: true,
  },
};

/** @type {import('rollup').RollupOptions} */
const cjsZustandStoreInput = {
  ...{ input: zustandStoreInput, watch, plugins, external },
  output: {
    file: pkg.exports["./zustand-store"].require,
    format: "cjs",
    sourcemap,
    esModule: false,
  },
};

/** @type {import('rollup').RollupOptions} */
const esmZustandStoreInput = {
  ...{ input: zustandStoreInput, watch, plugins, external },
  output: {
    file: pkg.exports["./zustand-store"].default,
    format: "esm",
    sourcemap,
    esModule: true,
  },
};

const cjs = [cjsTypes, cjsMain, cjsPreload, cjsZustandStoreInput];
const esm = [esmTypes, esmMain, esmPreload, esmZustandStoreInput];
const config = isWatchMode ? esm : [...esm, ...cjs];

export default config;
