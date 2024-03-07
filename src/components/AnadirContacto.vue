<template>
  <div id="anadir-contacto">
    <div class="opacidad" @click="$emit('cerrar-tarjeta')"></div>
    <div class="tarjeta">
      <div class="cabecera-tarjeta">
        <h2>Contacto nuevo</h2>
        <div class="iconos">
          <img src="../assets/clear-black-24dp.svg" alt="Salir" @click="$emit('cerrar-tarjeta')">
        </div>
      </div>
      <div class="form__group field">
        <input type="text" class="form__field" placeholder="Nombre" name="nombreNuevo" v-model="nombreNuevo" id='nombreNuevo' />
        <label for="nombreNuevo" class="form__label"> Nombre </label>
      </div>
      <p v-if="errorNombre !== ''" class="error"> {{ errorNombre }} </p>
      <div class="form__group field">
        <input type="text" class="form__field" placeholder="Nombre" name="telefonoNuevo" v-model="telefonoNuevo" id='telefonoNuevo' />
        <label for="telefonoNuevo" class="form__label"> Teléfono </label>
      </div>
      <p v-if="errorTelefono !== ''" class="error" > {{ errorTelefono }} </p>
      <div class="grupo-botones">
        <a class="boton guardar" @click="checkForm"> Guardar </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AnadirContacto',
  props: {
  },
  data: function () {
    return {
      errorNombre: '',
      errorTelefono: '',
      nombreNuevo: '',
      telefonoNuevo: ''
    }
  },
  methods: {
    checkForm: function () {
      this.errorNombre = ''
      this.errorTelefono = ''
      let error = false

      if (this.nombreNuevo === '') {
        error = true
        this.errorNombre = 'El nombre es obligatorio'
      }

      if (this.telefonoNuevo === '') {
        error = true
        this.errorTelefono = 'El teléfono es obligatorio'
      }

      if (isNaN(this.telefonoNuevo)) {
        error = true
        this.errorTelefono = 'El teléfono solo puede contener números'
      }

      if (!error) {
        this.$emit('guardar-contacto', this.nombreNuevo, this.telefonoNuevo);
        this.$emit('cerrar-tarjeta');
      }
    }
  }
}
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap");

.opacidad {
  position: absolute;
  top: 0;

  height: 100vh;
  width: 100vw;
  background-color: #ffffff;
  opacity: 0.3;
}

.tarjeta {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  -webkit-transform: translate(-50%, -50%);

  width: 50%;
  max-width: 500px;
  min-width: 300px;

  background-color: #ffffff;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  border-radius: 2px;
  padding: 10px;

  .cabecera-tarjeta {
    width: 100%;
    display: grid;
    grid-template-columns: auto auto;

    h2 {
      display: inline-block;
      margin: 0px;
    }

    .iconos {
      justify-self: end;

      img {
        opacity: 50%;
      }

      img:hover {
        opacity: 100%;
        transition-duration: 0.3s;
        cursor: pointer;
      }
    }
  }

  /* Formulario contacto */
  .form__group {
    position: relative;
    padding: 15px 0 0;
    margin-top: 10px;
    width: 100%;
  }

  .form__field {
    font-family: inherit;
    width: 100%;
    border: 0;
    border-bottom: 2px solid #c9c9c9;
    outline: 0;
    font-size: 1.3rem;
    color: #212121;
    padding: 7px 0;
    background: transparent;
    transition: border-color 0.2s;

    &::placeholder {
      color: transparent;
    }

    &:placeholder-shown ~ .form__label {
      font-size: 1.3rem;
      cursor: text;
      top: 20px;
    }

    &:disabled {
      border-bottom: 0px solid #3a86ff;
    }
  }

  .form__label {
    position: absolute;
    top: 0;
    display: block;
    transition: 0.2s;
    font-size: 0.8rem;
    color: #212121;
  }

  .form__field:focus {
    ~ .form__label {
      position: absolute;
      top: 0;
      display: block;
      transition: 0.2s;
      font-size: 1rem;
      color: #3a86ff;
    }
    padding-bottom: 7px;
    border-width: 2px;
    border-bottom: 2px solid #3a86ff;

    &.numeroIncorrecto {
      border-bottom: 2px solid #FB5607;

      ~ .form__label {
        color: #FB5607;
      }
    }
  }

  .numeroIncorrecto {
    border-bottom: 2px solid #FB5607;

    ~ .form__label {
      color: #FB5607;
    }
  }

  .grupo-botones {
    display: grid;
    grid-template-columns: 1fr;

    .boton {
      background-color: #ffffff;
      transition: 0.3s;
      margin-top: 10px;
      padding: 10px;
      border-radius: 3px;
      text-align: center;
      text-transform: uppercase;

      &:hover {
        transition: 0.3s;
        color: #ffffff;
        cursor: pointer;
      }

      &:visited {
        text-decoration: none;
      }
    }

    .guardar {
      border: 2px solid #3a86ff;
      color: #3a86ff;

      &:hover {
        background-color: #3a86ff;
      }
    }

    .eliminar {
      border: 2px solid #FB5607;
      color: #FB5607;

      &:hover {
        background-color: #FB5607;
      }
    }
  }

  .confirmar-eliminar {
    display: grid;
    grid-template-rows: 1fr 1fr;
    grid-template-columns: 1fr 1fr;
    column-gap: 10px;
    grid-template-areas:
      "texto texto"
      "eliminar volver";

    .texto-eliminar {
      grid-area: texto;
    }

    .confirmacion-eliminar {
      grid-area: eliminar;
      justify-self: right;
      color: #FB5607;
      cursor: pointer;

      &:hover {
        text-decoration: underline;
      }
    }

    .confirmacion-volver {
      grid-area: volver;
      justify-self: left;
      color: #3a86ff;
      cursor: pointer;

      &:hover {
        text-decoration: underline;
      }
    }
  }

  .error {
    color: #FB5607;
    font-size: 0.8rem;
  }
}
</style>