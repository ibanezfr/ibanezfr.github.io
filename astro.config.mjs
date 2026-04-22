import { defineConfig } from 'astro/config';
import { remarkShortcutTable } from './src/plugins/remarkShortcutTable.js';

export default defineConfig({
  site: 'https://ibanezfr.github.io',
  output: 'static',
  markdown: {
    remarkPlugins: [remarkShortcutTable],
  },
});
