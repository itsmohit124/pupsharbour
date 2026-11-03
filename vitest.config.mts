import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    // Node by default; component tests opt into jsdom with `// @vitest-environment jsdom`.
    environment: 'node',
    setupFiles: ['./vitest.setup.ts'],
    include: ['tests/unit/**/*.spec.{ts,tsx}', 'tests/int/**/*.int.spec.ts'],
    fileParallelism: false, // integration tests share a temp SQLite file per run
  },
})
