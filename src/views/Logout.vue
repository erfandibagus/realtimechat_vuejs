<template>
  <div id="logout"></div>
</template>

<script>
export default {
  name: "Logout",
  data() {
    return {
      id: localStorage.getItem("id"),
    };
  },
  created() {
    this.$api.get("/auth/logout/" + this.id).then(() => {
      localStorage.removeItem("id");
      localStorage.removeItem("token");
      this.$router.push("/");
    });
  },
};
</script>