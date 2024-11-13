<template>
  <q-page padding>

    <h4>Registracija korisnika</h4>


    <p>Ovdje se članovi mogu registrirati i upisati svoje podatke. Potrebno je upisati ime, prezime, email i kreirati lozinku.</p>


    <q-form @submit.prevent="registerUser">
      <q-input
        v-model="user.first_name"
        label="Ime"
        outlined
        required
      />

      <q-input
        v-model="user.last_name"
        label="Prezime"
        outlined
        required
      />

      <q-input
        v-model="user.email"
        label="Email"
        type="email"
        outlined
        required
      />

      <q-input
        v-model="user.password"
        label="Lozinka"
        type="password"
        outlined
        required
        :rules="[val => val && val.length >= 6 || 'Lozinka mora imati najmanje 6 znakova']"
      />

      <q-input
        v-model="user.confirmPassword"
        label="Potvrdi lozinku"
        type="password"
        outlined
        required
        :rules="[val => val === user.password || 'Lozinke se moraju podudarati']"
      />


      <q-btn
        label="Potvrdi"
        color="primary"
        type="submit"
        class="q-mt-md"
      />
    </q-form>
  </q-page>
</template>

<script>
export default {
  name: 'RegistrationPage',
  data() {
    return {

      user: {
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        confirmPassword: ''
      }
    };
  },
  methods: {

    registerUser() {
      if (this.user.password !== this.user.confirmPassword) {
        this.$q.notify({
          type: 'negative',
          message: 'Lozinke se ne podudaraju!'
        });
        return;
      }



      console.log('Registracija korisnika:', this.user);

      this.$q.notify({
        type: 'positive',
        message: 'Korisnik uspješno registriran!'
      });


      this.user = {
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        confirmPassword: ''
      };
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
</style>
