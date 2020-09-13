<template>
  <div class="container pt-5">
    <div class="row justify-content-center">
      <div class="col-md-5">
        <div class="card shadow-lg">
          <div class="card-header bg-dark text-white">
            <h1 class="h4 text-center my-0">Realtime Chat with VueJS</h1>
          </div>
          <div class="card-body">
            <div v-if="classAlert" :class="'alert alert-'+classAlert" role="alert" v-html="msg"></div>
            <form @submit.prevent="register">
              <div class="form-group">
                <label for="name">Name</label>
                <input class="form-control" type="name" name="name" id="name" v-model="name" />
              </div>
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
                  <button type="submit" class="btn btn-dark">Register</button>
                </div>
                <div class="col-sm-6 text-right">
                  <router-link to="/" class="btn btn-outline-dark">Login</router-link>
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
  name: "Register",
  data() {
    return {
      name: "",
      email: "",
      password: "",
      msg: null,
      classAlert: null,
    };
  },
  metaInfo() {
    return {
      title: "Register - Realtime Chat with VueJS",
    };
  },
  methods: {
    register() {
      const form = new FormData();
      form.append("name", this.name);
      form.append("email", this.email);
      form.append("password", this.password);
      this.$api
        .post("/auth/register", form)
        .then(() => {
          this.name = "";
          this.email = "";
          this.password = "";
          this.msg = "Your account has been created!";
          this.classAlert = "success";
        })
        .catch((err) => {
          this.msg = err.response.data.messages.error;
          this.classAlert = "danger";
        });
    },
  },
};
</script>
