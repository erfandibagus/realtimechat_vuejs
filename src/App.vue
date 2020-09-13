<template>
  <div id="app">
    <router-view :key="$route.fullPath" />
  </div>
</template>

<style>
body {
  background-color: lightgray;
}
</style>