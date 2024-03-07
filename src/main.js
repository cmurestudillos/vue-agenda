import { createApp } from 'vue'
import App from './App.vue'
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: ""
  };
  firebase.initializeApp(firebaseConfig);

createApp(App).mount('#app')
