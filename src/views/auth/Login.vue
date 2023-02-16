<template>
  <div class="container" style="margin: 16rem auto;">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card">
          <div class="card-header">Login</div>
          <div class="card-body">

            <div class="form-group row my-2">
                <label for="email" class="col-md-4 col-form-label text-md-right">Email</label>

                <div class="col-md-6">
                    <input
                    id="email"
                    type="email"
                    class="form-control"
                    name="email"
                    required
                    autofocus
                    v-model="data.email"
                    />
                </div>
            </div>

            <div class="form-group row my-2">
                <label for="password" class="col-md-4 col-form-label text-md-right">Password</label>

                <div class="col-md-6">
                    <input
                    id="password"
                    type="password"
                    class="form-control"
                    name="password"
                    required
                    v-model="data.password"
                    />
                </div>
            </div>

            <div class="form-group row mb-0">
                <div class="col-md-8 offset-md-4">
                    <button @click="signIn" type="button" class="btn btn-primary">Login</button>
                </div>
            </div>
          </div>
        </div>
        <div class="d-flex my-2 justify-content-end align-items-center">
            <p>Didnt have account ?</p>
            <button @click="toRegis" class="btn mb-3 text-primary">Register</button>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import router from '@/routes';
import { mapActions } from 'vuex';

export default {
  name: "login-component",
  data() {
    return {
        data: {
            email: "",
            password: "",
        }
    }
  },
  methods: {
    ...mapActions(['logIn']),
    signIn() {  
        this.logIn(this.data)
        .then(() => {router.push('/')})
        .catch((err) => {throw err})
    },
    toRegis() {
        router.push('/register')
    }
  }
};
</script>