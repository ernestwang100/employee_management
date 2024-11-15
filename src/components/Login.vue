<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { userStore } from '../stores/userStore.js'
import request from '../utils/request.js'

let user = userStore()
let router = useRouter()

// Reactive data to store form information
let loginUser = reactive({ username: '', userPwd: '' })
// Reactive data to store validation messages
let usernameMsg = ref('')
let userPwdMsg = ref('')

// Username validation function
function checkUsername() {
  const usernameReg = /^[a-zA-Z0-9]{5,10}$/
  if (!usernameReg.test(loginUser.username)) {
    usernameMsg.value = 'Invalid format'
    return false
  }
  usernameMsg.value = 'OK'
  return true
}

// Password validation function
function checkUserPwd() {
  const userPwdReg = /^[0-9]{6}$/
  if (!userPwdReg.test(loginUser.userPwd)) {
    userPwdMsg.value = 'Invalid format'
    return false
  }
  userPwdMsg.value = 'OK'
  return true
}

// Login function
async function login() {
  if (checkUsername() && checkUserPwd()) {
    let { data } = await request.post('user/login', loginUser)
    if (data.code === 200) {
      alert('Login successful')
      // Update Pinia data
      user.uid = data.data.uid
      user.username = data.data.username
      // Redirect to showSchedule
      router.push('/showSchedule')
    } else if (data.code === 503) {
      alert('Incorrect password')
    } else if (data.code === 501) {
      alert('Incorrect username')
    } else {
      alert('Unknown error')
    }
  }
}

// Function to clear the form
function clearForm() {
  loginUser.username = ''
  loginUser.userPwd = ''
  usernameMsg.value = ''
  userPwdMsg.value = ''
}
</script>

<template>
  <div>
    <h3 class="header-title">Please Log In</h3>
    <table class="form-table" cellspacing="0">
      <tr class="table-row">
        <td>Enter Username</td>
        <td>
          <input
            class="input-field"
            type="text"
            v-model="loginUser.username"
            @blur="checkUsername"
          />
          <span id="usernameMsg" v-text="usernameMsg"></span>
        </td>
      </tr>
      <tr class="table-row">
        <td>Enter Password</td>
        <td>
          <input
            class="input-field"
            type="password"
            v-model="loginUser.userPwd"
            @blur="checkUserPwd"
          />
          <span id="userPwdMsg" v-text="userPwdMsg"></span>
        </td>
      </tr>
      <tr class="table-row">
        <td colspan="2" class="button-container">
          <input class="button" type="button" @click="login" value="Log In" />
          <input class="button" type="button" @click="clearForm" value="Reset" />
          <router-link to="/regist">
            <button class="button">Register</button>
          </router-link>
        </td>
      </tr>
    </table>
  </div>
</template>

<style scoped>
.header-title {
  text-align: center;
  color: #2c3e50;
  font-family: Arial, sans-serif;
  font-size: 20px;
  margin-bottom: 20px;
}

.form-table {
  width: 100%;
  max-width: 500px;
  border: 3px solid #87ceeb;
  margin: 0 auto;
  border-radius: 8px;
  font-family: Arial, sans-serif;
  background-color: #f9f9f9;
}

.table-row td {
  padding: 12px;
  border-bottom: 1px solid #ddd;
  text-align: left;
}

.input-field {
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 80%;
  padding: 8px;
  font-size: 14px;
}

.button {
  border: 2px solid #87ceeb;
  border-radius: 6px;
  padding: 8px 16px;
  background-color: #f0f8ff;
  color: #333;
  cursor: pointer;
  transition:
    background-color 0.3s,
    color 0.3s;
  margin: 5px;
}

.button:hover {
  background-color: #87ceeb;
  color: #fff;
}

#usernameMsg,
#userPwdMsg {
  color: #ff4500;
  font-size: 12px;
}

.button-container {
  text-align: center;
  padding: 10px;
}
</style>
