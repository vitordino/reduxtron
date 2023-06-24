import ts from "rollup-plugin-ts";

const isWatchMode = process.env.ROLLUP_WATCH === "true";

const input = ["src/main.ts", "src/preload.ts", "src/zustand-store.ts"];
const plugins = [ts({ browserslist: false })];
const external = ["redux", "electron", "zustand"];
const sourcemap = isWatchMode ? false : true;

/** @type {import('rollup').RollupOptions['watch']} */
const watch = { include: ["src/**"], clearScreen: false };

const shared = { input, watch, plugins, external };

/** @type {import('rollup').RollupOptions} */
const cjs = {
  ...shared,
  output: {
    dir: "dist",
    format: "cjs",
    sourcemap,
    esModule: false,
  },
};

/** @type {import('rollup').RollupOptions} */
const esm = {
  ...shared,
  output: {
    dir: "dist",
    format: "esm",
    sourcemap,
    esModule: true,
  },
};

const config = isWatchMode ? esm : [cjs, esm];

export default config;
