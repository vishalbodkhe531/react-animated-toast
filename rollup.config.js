import { defineConfig } from "rollup";
import typescript from "@rollup/plugin-typescript";
import babel from "@rollup/plugin-babel";

export default defineConfig({
  input: "src/index.ts",
  output: {
    dir: "dist",
    format: "es",
  },
  external: [
    "react",
    "react-dom",
    "motion",
    "canvas-confetti",
    "clsx",
    "tailwind-merge",
    "lucide-react",
    "framer-motion",
    "react-icons",
    "class-variance-authority",
    "tailwindcss",
  ],
  plugins: [
    typescript({ tsconfig: "./tsconfig.json" }),
    babel({
      extensions: [".js", ".jsx", ".ts", ".tsx"],
      babelHelpers: "bundled",
      include: ["src/**/*"],
    }),
  ],
});
