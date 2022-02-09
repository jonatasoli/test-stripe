<template>
  <div class="columns">
    <div class="column back-color">
      <img style="max-width: 100px" src="/src/assets/logo.png" />
      <h1 class="title">Fisioterapia Online</h1>
    </div>
    <div class="column mx-6">
      <div>
        <h1 class="subtitle">Bem-vindo à Tato</h1>
        <div class="is-flex">
          <p class="is-align-items-flex-start">Email</p>
        </div>
        <v-field>
          <v-control>
            <input v-model="email" type="text" class="input" placeholder="Your username" />
          </v-control>
        </v-field>
        <div class="columns m-0">
          <div class="column pb-0 is-flex">
            <p class="is-align-items-flex-start">Senha</p>
          </div>
          <div class="column pb-0 is-flex">
            <a class="is-align-items-flex-end">Esqueceu a senha?</a>
          </div>
        </div>
        <v-field>
          <v-control>
            <input v-model="password" type="password" class="input" placeholder="Your username" />
          </v-control>
        </v-field>
        <!--    <VButtons>-->
        <!--      <VButton color="primary"> Button </VButton>-->
        <!--    </VButtons>-->
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import VField from '@/vendor/vuero/components/base/form/VField.vue'
// import VButton from "@/components/vendor/base/form/VButton.vue";
// import VButtons from "@/components/vendor/base/form/VButtons.vue";

export default {
  name: 'Login',
  components: {
    VField
    // VButton,
    // VButtons,
  },
  data() {
    return {
      email: '',
      password: ''
    }
  }
}
</script>

<style lang="sass">
.back-color
  background-color: #fd7e14
</style>
