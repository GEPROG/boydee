<template>
  <div class="app-bar white">
    <div class="app-bar-inner">
      <v-btn text><v-icon>fa-bars</v-icon></v-btn>
      <router-link :to="{ name: 'home' }">
        <img src="../assets/logo.png" class="logo" />
      </router-link>
      <v-btn text @click="doLogout"><v-icon>fa-sign-out-alt</v-icon></v-btn>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class AppBar extends Vue {
  async doLogout(): Promise<void> {
    await this.$store.dispatch('auth/logout');
    this.$router.replace({ name: 'auth-login' });
  }
}
</script>

<style scoped>
.app-bar {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  height: 54px;
  z-index: 1000;
  display: flex;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.25);
}

.app-bar-inner {
  display: flex;
  width: 100%;
  /* max-width: 410px; */
  margin: 0 auto;
  align-items: center;
  justify-content: space-around;
}

.logo {
  height: 44px;
  cursor: pointer;
  margin-left: 16px;
  display: flex;
  align-items: center;
  display: flex;
  justify-content: center;
}
</style>
