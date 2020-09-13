<template>
  <div class="container pt-5">
    <div class="row justify-content-center">
      <div class="col-md-5">
        <div class="card shadow-lg">
          <div class="card-header bg-dark text-white">
            <h1 class="h4 text-center my-0">Realtime Chat with VueJS</h1>
          </div>
          <div class="card-body">
            <div v-if="classAlert" :class="'alert alert-'+classAlert" role="alert">{{ msg }}</div>
            <form @submit.prevent="loggedIn">
              <div class="form-group">
                <label for="email">Email</label>
                <input
                  class="form-control"
                  type="email"
                  name="email"
                  id="email"
                  v-model="email"
                  placeholder="yourname@email.com"
                />
              </div>
              <div class="form-group">
                <label for="password">Password</label>
                <input
                  class="form-control"
                  type="password"
                  name="password"
                  id="password"
                  v-model="password"
                />
              </div>
              <div class="row mt-4 mb-2">
                <div class="col-sm-6">
                  <button type="submit" class="btn btn-dark">Login</button>
                </div>
                <div class="col-sm-6 text-right">
                  <router-link to="/register" class="btn btn-outline-dark">Register</router-link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  components: {},
  data() {
    return {
      email: "",
      password: "",
      msg: null,
      classAlert: null,
    };
  },
  metaInfo() {
    return {
      title: "Login - Realtime Chat with VueJS",
    };
  },
  methods: {
    loggedIn() {
      const form = new FormData();
      form.append("email", this.email);
      form.append("password", this.password);
      this.$api
        .post("/auth", form)
        .then((res) => {
          localStorage.setItem("id", res.data.id);
          localStorage.setItem("token", res.data.token);
          this.email = "";
          this.password = "";
          this.$router.push("/chats");
        })
        .catch(() => {
          this.msg = "Wrong email or password!";
          this.classAlert = "danger";
        });
    },
  },
  created() {
    var id = localStorage.getItem("id");
    var token = localStorage.getItem("token");
    if (id && token) {
      this.$router.push("/chats");
    }
  },
};
</script>
