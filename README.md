# Agenda telefonica
Agenda telefónica usando VueJs y Firebase como base de datos/backend

## Características
* Auto login con cuenta de google
* Muestra los contactos que tengas en tu cuenta
* Permite añadir contactos nuevos
* Puedes visualizar los contactos, editarlos y eliminarlos

```
npm install
```

Es necesario rellenar los datos de la configuración de firebase en el archivo main.js
Cambiar las siguientes líneas de código por las que proporciona firebase al crear un 
proyecto nuevo
```
const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: ""
};
```

### Development
```
npm run dev
```

### Production
```
npm run build
```