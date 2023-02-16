<template>
  <div class="container" style="margin: 16rem auto;">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card">
          <div class="card-header">Register</div>
          <div class="card-body">
            <div class="form-group row my-2">
            <label for="name" class="col-md-4 col-form-label text-md-right">Name</label>

            <div class="col-md-6">
                <input
                id="name"
                type="name"
                class="form-control"
                name="name"
                required
                autofocus
                v-model="data.name"
                />
            </div>
            </div>

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

            <div class="form-group row my-2">
                <label for="role" class="col-md-4 col-form-label text-md-right">Role</label>

                <div class="col-md-6">
                    <select name="role" id="role" v-model="data.role" class="form-control" required>
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>
            </div>

            <div class="form-group row my-2 mb-0">
            <div class="col-md-8 offset-md-4">
                <button @click="signUp" type="submit" class="btn btn-primary">Register</button>
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import router from '@/routes';
import { mapActions } from 'vuex';

export default {
  name: "register-component",
  data() {
    return {
        data: {
            name: "",
            email: "",
            password: "",
            role: "",
        }
    }
  },
  methods: {
    ...mapActions(['register']),
    signUp() {
        this.register(this.data)
        .then(() => {router.push('/login')})
        .catch((err) => {throw err})
    }
  }
};
</script>