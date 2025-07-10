import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    reporter: ["verbose"], // Output detallado
    globals: true, // Para usar describe, test sin imports
  },
});
