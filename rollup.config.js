// import typescript from "@rollup/plugin-typescript";
// import { defineConfig } from "rollup";
// import dts from "rollup-plugin-dts";

// export default [
//   defineConfig({
//     input: "src/index.ts",
//     output: [
//       {
//         file: "dist/index.js",
//         format: "esm",
//         sourcemap: true,
//       },
//       {
//         file: "dist/index.cjs",
//         format: "cjs",
//         sourcemap: true,
//       },
//     ],
//     external: [
//       "react",
//       "react-dom",
//       "tailwindcss",
//       "lucide-react",
//       "motion",
//       "framer-motion",
//       "canvas-confetti",
//       "class-variance-authority",
//       "clsx",
//       "react-icons",
//       "tailwind-merge",
//     ],
//     plugins: [
//       typescript({
//         tsconfig: "./tsconfig.build.json",
//         declaration: true,
//         declarationDir: "dist",
//       }),
//     ],
//   }),

//   defineConfig({
//     input: "dist/index.d.ts",
//     output: [{ file: "dist/index.d.ts", format: "es" }],
//     plugins: [dts()],
//   }),
// ];

import typescript from "@rollup/plugin-typescript";
import { defineConfig } from "rollup";
import dts from "rollup-plugin-dts";

export default [
  defineConfig({
    input: "src/index.ts",
    output: [
      {
        file: "dist/index.js",
        format: "esm",
        sourcemap: true,
      },
      {
        file: "dist/index.cjs",
        format: "cjs",
        sourcemap: true,
      },
    ],
    external: [
      "react",
      "react-dom",
      "tailwindcss",
      "lucide-react",
      "motion",
      "framer-motion",
      "canvas-confetti",
      "class-variance-authority",
      "clsx",
      "react-icons",
      "tailwind-merge",
      "@radix-ui/react-slot",
    ],
    plugins: [
      typescript({
        tsconfig: "./tsconfig.build.json",
        declaration: true,
        declarationDir: "dist",
        rootDir: "src",
      }),
    ],
  }),

  defineConfig({
    input: "dist/index.d.ts",
    output: [
      {
        file: "dist/index.d.ts",
        format: "es",
      },
    ],
    plugins: [dts()],
  }),
];
