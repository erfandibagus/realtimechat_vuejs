<template>
  <div class="container pt-3">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card rounded shadow-lg">
          <div class="card-header bg-dark">
            <div class="row">
              <div class="col-sm-6">
                <p class="text-white mb-0">
                  Welcome Back,
                  <strong>
                    <em>{{ name }}</em>
                  </strong>
                </p>
              </div>
              <div class="col-sm-6 text-right">
                <router-link to="/logout" class="text-white">Logout</router-link>
              </div>
            </div>
          </div>
          <div class="card-body" id="message">
            <div class="table-wrapper-scroll-y tb-custom-scrollbar">
              <div class="card mb-2" v-for="msg in messages" :key="msg.id">
                <div class="card-body">
                  <div class="row border-bottom">
                    <div class="col-sm-6">
                      <span class="small font-weight-bold">{{ msg.user.name }}</span>
                    </div>
                    <div class="col-sm-6 text-right">
                      <span class="small font-italic text-muted">{{ msg.created_at }}</span>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md">
                      <p class="mt-2 mb-0 small">{{ msg.message }}</p>
                    </div>
                  </div>
                </div>
                <div class="card-footer" v-if="msg.attachment">
                  <img :src="msg.attachment" width="75" class="img-thumbnail" />
                </div>
              </div>
            </div>
          </div>
          <div class="card-footer">
            <div class="alert alert-danger" role="alert" v-if="showAlert">{{ showAlert }}</div>
            <form @submit.prevent="newMessage">
              <div class="form-group mb-1">
                <input
                  type="text"
                  name="chat"
                  v-model="chat"
                  class="form-control"
                  placeholder="Your message here"
                />
              </div>
              <div class="input-group">
                <div class="custom-file">
                  <input
                    type="file"
                    class="custom-file-input"
                    id="attachment"
                    ref="attachment"
                    v-on:change="getInputName"
                  />
                  <label class="custom-file-label text-muted" for="attachment">{{ inputName }}</label>
                </div>
                <div class="input-group-append">
                  <button class="btn btn-dark" type="submit">Send</button>
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
  name: "Chats",
  data() {
    return {
      name: "",
      chat: "",
      token: "",
      messages: [],
      inputName: "Choose file",
      showAlert: null,
    };
  },
  metaInfo() {
    return {
      title: "Realtime Chat with VueJS",
    };
  },
  methods: {
    getUser() {
      const form = new FormData();
      form.append("token", this.token);
      form.append("id", localStorage.getItem("id"));
      this.$api
        .post("/api/user", form)
        .then((res) => {
          this.name = res.data.name;
        })
        .catch(() => {
          this.$router.push("/logout");
        });
    },
    getMessages() {
      this.$api.get("/api/messages?token=" + this.token).then((res) => {
        this.messages = res.data;
      });
    },
    newMessage() {
      const form = new FormData();
      form.append("token", this.token);
      form.append("message", this.chat);
      if (this.$refs.attachment.files.length > 0) {
        form.append("attachment", this.$refs.attachment.files[0]);
      }
      this.$api
        .post("/api/messages/create", form)
        .then(() => {
          this.getMessages();
          this.chat = "";
          this.$refs.attachment.value = null;
          this.inputName = "Choose file (Optional)";
          this.showAlert = null;
        })
        .catch((err) => {
          this.showAlert = err.response.data.messages.error;
        });
    },
    getInputName() {
      this.inputName = this.$refs.attachment.files[0].name;
    },
  },
  created() {
    this.token = localStorage.getItem("token");
    this.getMessages();
    this.getUser();
  },
};
</script>
<style scoped>
.tb-custom-scrollbar {
  position: relative;
  height: 400px;
  overflow: auto;
}

.table-wrapper-scroll-y {
  display: block;
}

.image-upload > input {
  display: none;
}

.image-upload img {
  width: 55px;
  cursor: pointer;
}
</style>