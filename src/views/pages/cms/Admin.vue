<template>
    <div>
        <NavCMS :displayName="displayName"/>
        <div class="container my-4">
            <div class="card">
                <div class="card-header">Add New Movie</div>
                <div class="card-body" >
                    <div class="form-group row my-2">
                        <label for="title" class="col-md-4 col-form-label text-md-right">Title</label>

                        <div class="col-md-6">
                            <input
                            id="title"
                            type="title"
                            class="form-control"
                            placeholder="enter movie title"
                            required
                            autofocus
                            v-model="data.title"
                            />
                        </div>
                    </div>

                    <div class="form-group row my-2">
                        <label for="duration" class="col-md-4 col-form-label text-md-right">Duration (minute)</label>

                        <div class="col-md-6">
                            <input
                            id="duration"
                            type="duration"
                            class="form-control"
                            name="duration"
                            placeholder="enter movie duration"
                            required
                            autofocus
                            v-model="data.duration"
                            />
                        </div>
                    </div>

                    <div class="form-group row my-2">
                        <label for="description" class="col-md-4 col-form-label text-md-right">Description</label>

                        <div class="col-md-6">
                            <input
                            id="description"
                            type="description"
                            class="form-control"
                            name="description"
                            placeholder="enter movie description"
                            required
                            v-model="data.description"
                            />
                        </div>
                    </div>

                    <div class="form-group row my-2">
                        <label for="genres" class="col-md-4 col-form-label text-md-right">Genres<br/>(Hold down the Ctrl (windows) or Command (Mac) button to select multiple options.)</label>

                        <div class="col-md-6">
                            <select name="genres" id="genres" v-model="data.genres" multiple class="form-control" required>
                                <option :value="item" v-for="item in categories" :key="item">{{item}}</option>
                            </select>
                        </div>
                    </div>

                    <div class="form-group row my-2">
                        <label class="col-md-4 col-form-label text-md-right">
                            Artist
                            <button
                                type="button"
                                class="border-0 mt-2 rounded"
                                @click="addMore()"
                            >
                                Add More
                            </button>
                        </label>

                        <div class="col-md-6">
                            <div v-for="(artis, index) in data.artist" :key="index">
                                <div class="d-flex flex-row justify-start ml-2 gap-2">
                                    <input
                                        v-model="artis.name"
                                        placeholder="enter artist name"
                                        class="form-control"
                                        required
                                    />
                                    <input
                                        v-model="artis.role"
                                        placeholder="enter artist role"
                                        class="form-control"
                                        required
                                    />
                                    <button
                                        type="button"
                                        class="border-0 mt-2 rounded px-2"
                                        @click="remove(index)"
                                        v-show="index != 0"
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="form-group row my-2">
                        <label for="url" class="col-md-4 col-form-label text-md-right">Watch URL</label>

                        <div class="col-md-6">
                            <input
                            id="url"
                            type="url"
                            class="form-control"
                            placeholder="enter artist watch url"
                            name="url"
                            required
                            v-model="data.url"
                            />
                        </div>
                    </div>

                    <div class="form-group row my-2 mb-0">
                        <div class="col-md-8 offset-md-8 text-right">
                            <button @click="addMovie" type="button" class="btn btn-primary">Save</button>
                        </div>
                    </div>
                </div>
             </div>

             <div class="row">
                <h4 class="mt-4">Your Movie :</h4>
                <div class="col-sm-4 my-4" v-for="item in movies" :key="item">
                    <div class="card-body p-3 border rounded">
                        <iframe :src="loadURL(item.url)" frameborder="0" width="380" height="200"></iframe>
                        <h5 class="my-2">Title : {{item.title}}</h5>
                        <p>Duration : {{item.duration}}min</p>
                        <p>Description : {{item.description}}</p>
                        <div class="d-flex flex-row">
                            <div v-for="genres in item.genres" :key="genres">{{genres}}, &nbsp;</div>
                        </div>
                        <p v-if="item.author">Author : {{item.author}}</p>
                        <p v-if="!item.author">Author : Movie Festival</p>
                        <button @click="viewDetail(item.id)" type="button" class="btn border">Edit Movie</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import store from '@/store';
import { mapActions, mapGetters } from 'vuex';
import { auth } from '@/firebase';
import router from '@/routes';
import NavCMS from '@/components/NavCMS.vue';

export default {
  components: { NavCMS },
  name: "admin-component",
  data() {
    return {
        displayName: "",
        categories: [],
        movies: [],
        data: {
            title: "",
            author: localStorage.getItem('displayName').split('@')[0],
            description: "",
            duration: "",
            genres: [],
            artist: [{name: "", role: ""}],
            url: "",
            id: ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
                (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
            )
        }
    }
  },
  computed: {
    ...mapGetters(['user'])
  },
  mounted() {
    this.getAllMovie()
    .then((res) => {
        this.movies = res.filter((item) => item.author === this.displayName)
    })
    this.getAllCategories()
    .then((result) => {
        let tmp = []
        result.category.map((item) => {
            tmp.push(item)
        })
        this.categories = tmp
    })
    auth.onAuthStateChanged(user => {
        store.dispatch("fetchUser", user)
        .then(() => {
            this.displayName = this.user.data.displayName.split('@')[0]
            if(this.user.data.displayName.split('@')[1] === 'admin') {
                router.push('/admin') 
            } else {
                router.push('/')
            }
        })
    });
  },
  methods: {
    ...mapActions(['addDataMovie', 'getAllCategories', 'logOut', 'getAllMovie']),
    addMovie() {
        this.addDataMovie(this.data)
        .then(() => {window.location.reload()})
        .catch((err) => {throw err})
    },
    addMore() {
      this.data.artist.push({
        name: "",
        role: "",
      });
    },
    remove(index) {
      this.data.artist.splice(index, 1);
    },
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
    viewDetail: function(movieId) {
      router.push({name:'edit-movie-component', params:{Pid:movieId}})
    },
  }
};
</script>