<template>
  <Cabecera :user="user" @anadir-contacto="verNuevoContacto" @login="loginConGoogle" @logout="logoutConGoogle" />
  <div class="rejilla-contactos">
    <Contacto v-for="cnt in agenda" :key="cnt.id" :contacto="cnt" @ver-tarjeta="verModificaContacto" />
  </div>
  <ModificarContacto v-if="showModificaContacto" :contacto="contactoModificar" @cerrar-tarjeta="cerrarModificaContacto"  @guardar-contacto="guardarContactoModificado" @eliminar-contacto="eliminarContacto" />
  <AnadirContacto v-if="showNuevoContacto" @cerrar-tarjeta="cerrarNuevoContacto" @guardar-contacto="guardarContactoNuevo" />
  <img :src="avatar" alt="" >
</template>

<script>
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore'; 
import Cabecera from './components/Cabecera.vue'
import Contacto from './components/Contacto.vue'
import ModificarContacto from './components/ModificarContacto.vue'
import AnadirContacto from './components/AnadirContacto.vue'

export default {
  name: 'App',
  components: {
    Cabecera, Contacto, ModificarContacto, AnadirContacto
  },
  data: function () {
    return {
      user: null,
      avatar: '',
      showModificaContacto: false,
      showNuevoContacto: false,
      contactoModificar: null,
      agenda: []
    };
  },
  created: function () {
    const auth = firebase.auth();
    auth.onAuthStateChanged(user => {
      this.user = user
      if (this.user !== null) {
        this.getContactos()
      }
    })

  },
  methods: {
    async getContactos () {
      let contactosRef = firebase
        .firestore()
        .collection("users")
        .doc(firebase.auth().currentUser.uid)
        .collection("agenda");

      contactosRef.onSnapshot(snap => {
        this.agenda = []
        snap.forEach(doc => {
          let contacto = doc.data()
          contacto.id = doc.id
          this.agenda.push(contacto)
        })
      });
    },
    loginConGoogle: function () {
      const provider = new firebase.auth.GoogleAuthProvider()

      firebase.auth().signInWithPopup(provider)
        .then(result => console.log(`${result.user.email} ha iniciado sesión`))
        .catch(error => console.log(`Error: ${error.code}: ${error.messasge}`))
    },
    logoutConGoogle: function () {
      firebase.auth().signOut()
        .then(result => console.log(`${result}: Sesión cerrada`))
        .catch(error => console.log(`Error: ${error.code}: ${error.messasge}`))
      window.location.reload()
    },
    verModificaContacto: function (contacto) {
      this.showModificaContacto = !this.showModificaContacto
      this.contactoModificar = contacto
    },
    cerrarModificaContacto: function () {
      this.showModificaContacto = false
      this.contactoModificar = null
    },
    guardarContactoModificado: function (id, nombre, telefono) {
      this.showModificaContacto = false
      this.contactoModificar = null
      firebase
        .firestore()
        .collection("users")
        .doc(firebase.auth().currentUser.uid)
        .collection("agenda")
        .doc(id)
        .update({nombre: nombre,telefono: telefono})
    },
    eliminarContacto: function (id) {
      this.showModificaContacto = false
      this.contactoModificar = null
      firebase
        .firestore()
        .collection("users")
        .doc(firebase.auth().currentUser.uid)
        .collection("agenda")
        .doc(id)
        .delete()
    },
    cerrarNuevoContacto: function () {
      this.showNuevoContacto = false
    },
    verNuevoContacto: function () {
      this.showNuevoContacto = true
    },
    guardarContactoNuevo(nombre, telefono) {
      firebase
        .firestore()
        .collection("users")
        .doc(firebase.auth().currentUser.uid)
        .collection("agenda")
        .add({nombre: nombre,telefono: telefono})
    },
    guardarEstadoLocalStorage () {
      localStorage.setItem("agenda", JSON.stringify(this.agenda));
    }
  }
}
</script> 

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap");

#app {
  margin: 0px;
  background-color: #f3f3f3;
  font-family: "Roboto", sans-serif;
  height: calc(100vh - 1rem)
}

.rejilla-contactos {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 10px;
  margin: 15px;

  @media (max-width: 1099px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (max-width: 799px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 499px) {
    grid-template-columns: repeat(1, 1fr);
  }
}
</style>
