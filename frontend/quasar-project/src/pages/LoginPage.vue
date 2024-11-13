<template>
  <q-page padding>

    <h4 class="text-center">Login</h4>

    <p class="text-center">
      Login za korisnika
    </p>


    <q-form @submit.prevent="loginUser" class="login-form">
      <q-input
        v-model="user.username"
        label="Korisničko ime"
        outlined
        required
        autofocus
      />

      <q-input
        v-model="user.password"
        label="Lozinka"
        type="password"
        outlined
        required
        :rules="[val => val && val.length >= 6 || 'Lozinka mora imati najmanje 6 znakova']"
      />


      <q-btn
        label="Potvrdi"
        color="primary"
        type="submit"
        class="full-width q-mt-md"
      />
    </q-form>
  </q-page>
</template>

<script>
export default {
  name: 'LoginPage',
  data() {
    return {

      user: {
        username: '',
        password: ''
      }
    };
  },
  methods: {

    loginUser() {
      if (!this.user.username || !this.user.password) {
        this.$q.notify({
          type: 'negative',
          message: 'Morate unijeti korisničko ime i lozinku!'
        });
        return;
      }


      console.log('Prijava korisnika:', this.user);


      this.$q.notify({
        type: 'positive',
        message: 'Prijava uspješna!'
      });


      this.user.username = '';
      this.user.password = '';
    }
  }
};
</script>

<style scoped>

h1 {
  color: #007bff;
}

p {
  font-size: 1.2rem;
  color: #555;
}


.login-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 400px;
  margin: 0 auto;
}


.q-btn {
  width: 100%;
}

.q-input {
  width: 100%;
  max-width: 400px;
}


.q-mt-md {
  margin-top: 16px;
}
</style>
