import { fileURLToPath } from "node:url";
import { mergeConfig, defineConfig, configDefaults } from "vitest/config";
import viteConfig from "./vite.config";

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: "jsdom",
      exclude: [...configDefaults.exclude, "e2e/*"],
      root: fileURLToPath(new URL("./", import.meta.url)),
      server: {
        deps: {
          inline: ["vuetify"],
        },
      },
      globalSetup: [
        fileURLToPath(new URL("./src/core/vitest/setup.ts", import.meta.url)),
      ],
      setupFiles: [
        fileURLToPath(new URL("./src/core/vitest/init.ts", import.meta.url)),
      ],
      env: {
        //Your env variables
      },
      coverage: {
        reporter: ["lcov", "html", "cobertura"],
        all: true,
        provider: "v8",
        exclude: [
          ...(configDefaults.coverage.exclude ?? []),
          "src/router/**/*",
          "src/assets/**/*",
          "src/plugin/**/*",
          "src/core/vitest/**/*",
          "src/core/types/**/*",
          "src/core/mocks/**/*",
          "src/main.ts",
        ],
      },
    },
  })
);
