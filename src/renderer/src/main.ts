import './assets/main.css'
import './assets/app.css'

import App from './App.svelte'
import DisplayApp from './DisplayApp.svelte'

let app: App | DisplayApp = new App({
  target: document.getElementById('app') || document.getElementById('display-window')
})

// if (document.getElementById('display-window') !== null) {
//   app = new DisplayApp({
//     target: document.getElementById('display-window')
//   })
// } else {
//   app = new App({
//     target: document.getElementById('app')
//   })
// }

export default app
