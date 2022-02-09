import '../node_modules/@purge-icons/generated'
import './style/main.sass'

import App from './App.vue'
import { createApp } from 'vue'
import initializePlugins from '@/core/plugins'
import initializeServices from '@/core/services'
import { defineCustomElements } from '@stripe-elements/stripe-elements/loader';

const app = createApp(App)

// Adding the plugins
initializePlugins(app)

// Initializing the services
initializeServices()

//Capacitor Stripe
defineCustomElements();

app.mount('#app')
