import type { Config } from 'tailwindcss'
import flowbitePlugin from 'flowbite/plugin'

const config: Config = {
  content: [
    './src/**/*.{svelte,js,ts,html}',
    './node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}',
    "./node_modules/flowbite-svelte-icons/**/*.{html,js,svelte,ts}",
    './index.html'
  ],
  theme: {
    extend: {
      colors: {
        // gray-700
        primary: '#f54272',

        background: '#1b1b1f',
        // purple-900
        secondary: '#581c87',
        // gray-400
        tertiary: '#9ca3af'
      }
    }
  },
  plugins: [flowbitePlugin],
  darkMode: 'class'
}

export default config
