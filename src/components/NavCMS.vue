<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container">
          <div class="dropdown">
              <button class="btn dropdown-toggle font-weight-bold" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Welcome, {{displayName.toUpperCase()}}
              </button>
              <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  <a class="dropdown-item" href="#">Profile</a>
                  <button class="dropdown-item text-danger" @click.prevent="signOut">Sign out</button>
              </div>
          </div>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
          </button>
      </div>
  </nav>
</template>

<script>
import router from '@/routes'
import { mapActions } from 'vuex'
export default {
  name: 'navbar-cms',
  props: {
    displayName: String
  },
  methods: {
    ...mapActions(['logOut']),
    signOut(){
        this.logOut()
        localStorage.removeItem("accesToken")
        router.push('/login')
    },
  }
}
</script>
