<script setup>
import { userStore } from '../stores/userStore.js'
import { scheduleStore } from '../stores/scheduleStore.js'
import { useRouter } from 'vue-router'

let user = userStore()
let schedule = scheduleStore()
let router = useRouter()
let logout = () => {
  user.$reset()
  schedule.$reset()
  router.push('/login')
}
</script>

<template>
  <div>
    <h1 class="header-title">Welcome to the Schedule Management System</h1>
    <div>
      <div class="option-div">
        <router-link to="/login">
          <button class="button-small">Login</button>
        </router-link>
        <router-link to="/regist">
          <button class="button-small">Register</button>
        </router-link>
      </div>

      <div class="option-div">
        Welcome, {{ user.username }}
        <button class="button-large" @click="logout()">Logout</button>
        <router-link to="/showSchedule">
          <button class="button-large">View My Schedule</button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
.header-title {
  text-align: center;
  color: #2c3e50;
  font-family: Arial, sans-serif;
  font-size: 24px;
  margin-bottom: 20px;
}

.button-small,
.button-large {
  border: 2px solid #87ceeb;
  border-radius: 8px;
  padding: 10px 20px;
  font-size: 14px;
  color: #333;
  background-color: #f0f8ff;
  cursor: pointer;
  transition:
    background-color 0.3s,
    color 0.3s;
  margin-right: 10px;
}

.button-small:hover,
.button-large:hover {
  background-color: #87ceeb;
  color: #fff;
}

.button-small {
  width: 80px;
}

.button-large {
  width: 140px;
}

.option-div {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
}

.option-div + .option-div {
  margin-top: 10px;
}
</style>
