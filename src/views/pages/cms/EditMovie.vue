<template>
    <div>
        <NavCMS :displayName="displayName"/>
        <div class="container my-4">
            <div class="card">
                <div class="card-header">Edit Movie</div>
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

                    <div class="form-group d-flex flex-row justify-content-center my-2 mb-0 gap-2">
                        <div class="text-right">
                            <button @click="cancel" type="button" class="btn btn-secondary">Cancel</button>
                        </div>
                        <div class="text-right">
                            <button @click="editMovie" type="button" class="btn btn-primary">Save</button>
                        </div>
                    </div>
                </div>
             </div>
        </div>

    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import router from '@/routes';
import NavCMS from '@/components/NavCMS.vue';

export default {
  components: { NavCMS },
  name: "edit-movie-component",
  data() {
    return {
        displayName: localStorage.getItem('displayName').split('@')[0],
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
            id: ""
        }
    }
  },
  computed: {
    ...mapGetters(['user'])
  },
  mounted() {
    this.getAllMovie()
    .then((res) => {
        let result = res.filter((item) => item.id === this.$route.params.Pid)
        let filter = result[0]
        this.data.title = filter.title
        this.data.description = filter.description
        this.data.duration = filter.duration
        this.data.genres = filter.genres
        this.data.artist = filter.artist
        this.data.url = filter.url
        this.data.id = filter.id
    })
    this.getAllCategories()
    .then((result) => {
        let tmp = []
        result.category.map((item) => {
            tmp.push(item)
        })
        this.categories = tmp
    })
  },
  methods: {
    ...mapActions(['editDataMovie', 'getAllCategories', 'logOut', 'getAllMovie']),
    editMovie() {
        this.editDataMovie(this.data)
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
    cancel() {
        router.push('/admin')
    }
  }
};
</script>