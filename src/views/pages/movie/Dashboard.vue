<template>
    <div v-if="user.loggedIn">
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
            <div class="container">
                <div class="dropdown">
                    <button class="btn dropdown-toggle font-weight-bold text-white" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                       Welcome, {{user.data.displayName.split('@')[0].toUpperCase()}}
                    </button>
                    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <a class="dropdown-item" href="#">Profile</a>
                        <button class="dropdown-item text-danger" @click.prevent="signOut">Sign out</button>
                    </div>
                </div>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="form-inline">
                    <input class="border-0 form-control" style="outline: none;" type="text" v-model.trim="search" @keyup="data" placeholder="Search..." />
                </div>
            </div>
        </nav>

        <div class="container">
            <div class="row" v-if="maxMovie.length > 0">
                <div class="col-sm-6 my-4" v-for="item in maxMovie" :key="item">
                    <div class="card-body p-3 border rounded">
                        <iframe :src="loadURL(item.url)" frameborder="0" class="w-100" height="300"></iframe>
                        <h5 class="my-2">Title : {{item.title}}</h5>
                        <p>Duration : {{item.duration}}min</p>
                        <p>Description : {{item.description}}</p>
                        <p>Artist : </p>
                        <div class="d-flex flex-row fw-light" v-for="artist in item.artist" :key="artist">
                            <p>{{artist.role}} : </p>
                            <p>
                                {{artist.name}}
                            </p>
                        </div>
                        <div class="d-flex flex-row">
                            <div v-for="genres in item.genres" :key="genres">{{genres}}, &nbsp;</div>
                        </div>
                        <p v-if="item.author">Author : {{item.author}}</p>
                        <p v-if="!item.author">Author : Movie Festival</p>
                        <button class="btn border rounded" type="button">Vote this movie!</button>
                    </div>
                </div>
                <div class="d-flex justify-content-center mb-4">
                    <Pagination :total-pages="totalPages" :per-page="limitPerPage" :current-page="page" @pagechanged="onPageChange" />
                </div>
            </div>
            <div v-else class="text-center my-4"><h4>No Movie Found!</h4></div>
        </div>

    </div>
</template>

<script>
import { mapActions, mapGetters} from "vuex";
import { auth } from '../../../firebase'
import router from '@/routes';
import store from '@/store';
import Pagination from '@/components/Pagination.vue';


export default {
  components: { Pagination },
    name: "dashboard-component",
    data() {
        return {
            movies: [],
            search: '',
            totalPages: 0,
            page: 1,
            limitPerPage: 2,
        }
    },
    computed: {
        ...mapGetters(['user', 'all_movie']),
        maxMovie() {
            let data = JSON.parse(JSON.stringify(this.all_movie))
            if(data) {
                data = data.slice(this.indexStart, this.indexEnd);
            }
            let result;
            if(data) {
                if (this.search) {
                    result = data.filter(item =>
                        item.title.toLowerCase().includes(this.search.toLowerCase()) +
                        item.author.toLowerCase().includes(this.search.toLowerCase()) +
                        item.description.toLowerCase().includes(this.search.toLowerCase())
                    );
                } else {
                    result = data;
                }
            }
            return result
        },
        indexStart() {
            return (this.page - 1) * this.limitPerPage;
        },
        indexEnd() {
            return this.indexStart + this.limitPerPage;
        }
    },
    mounted() {
        this.getAllMovie()
        .then((res) => {
            this.movies = res
            this.totalPages = Math.ceil(res.length / this.limitPerPage)
        })
        auth.onAuthStateChanged(user => {
            store.dispatch("fetchUser", user)
            .then(() => {
                if(this.user.data.displayName.split('@')[1] === 'admin') {
                    router.push('/admin') 
                } else {
                    router.push('/')
                }
            })
        });
    },
    methods: {
        ...mapActions(['logOut', 'getAllMovie', 'voteMovie']),
        signOut(){
            this.logOut()
            localStorage.removeItem("accesToken")
            router.push('/login')
        },
        loadURL(urlMovie) {
            const youtubeEmbedTemplate = "https://www.youtube.com/embed/";
            const url = urlMovie.split(
                /(vi\/|v%3D|v=|\/v\/|youtu\.be\/|\/embed\/)/
            );
            const YId =
                undefined !== url[2] ? url[2].split(/[^0-9a-z_/\\-]/i)[0] : url[0];
            const topOfQueue = youtubeEmbedTemplate.concat(YId);
            return topOfQueue
        },
        voteMovie() {
            this.voteMovie();
        },
        onPageChange (page) {
            this.page = page
            this.$router.replace({ query: {page: this.page} })
        },
    }

};
</script>