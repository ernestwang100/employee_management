<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import request from '../utils/request.js'

const router = useRouter()
const registerUser = reactive({
  username: '',
  userPwd: '',
})
const confirmPassword = ref('')
const usernameMsg = ref('')
const userPwdMsg = ref('')
const confirmPwdMsg = ref('')

// Validate Username
async function checkUsername() {
  const usernameReg = /^[a-zA-Z0-9]{5,10}$/
  if (!usernameReg.test(registerUser.username)) {
    usernameMsg.value = 'Invalid format. Use 5-10 letters or numbers.'
    return false
  }

  // Check if username is taken
  const { data } = await request.post(`user/checkUsernameUsed?username=${registerUser.username}`)
  if (data.code !== 200) {
    usernameMsg.value = 'Username is already taken'
    return false
  }
  usernameMsg.value = 'Available'
  return true
}

// Validate Password
function checkUserPwd() {
  const passwordReg = /^[0-9]{6}$/
  if (!passwordReg.test(registerUser.userPwd)) {
    userPwdMsg.value = 'Password must be exactly 6 digits'
    return false
  }
  userPwdMsg.value = 'Valid'
  return true
}

// Validate Confirm Password
function checkConfirmPassword() {
  if (registerUser.userPwd !== confirmPassword.value) {
    confirmPwdMsg.value = 'Passwords do not match'
    return false
  }
  confirmPwdMsg.value = 'Match'
  return true
}

// Register User
async function register() {
  if ((await checkUsername()) && checkUserPwd() && checkConfirmPassword()) {
    const { data } = await request.post('user/register', registerUser)
    if (data.code === 200) {
      alert('Registration successful')
      router.push('/login')
    } else {
      alert('Sorry, username was taken during registration')
    }
  } else {
    alert('Please fix validation errors')
  }
}

// Clear Form
function clearForm() {
  registerUser.username = ''
  registerUser.userPwd = ''
  confirmPassword.value = ''
  usernameMsg.value = ''
  userPwdMsg.value = ''
  confirmPwdMsg.value = ''
}
</script>

<template>
  <div>
    <h3 class="header">Register</h3>
    <table class="form-table">
      <tr>
        <td>Username</td>
        <td>
          <input
            class="input-field"
            type="text"
            v-model="registerUser.username"
            @blur="checkUsername"
          />
          <span class="message">{{ usernameMsg }}</span>
        </td>
      </tr>
      <tr>
        <td>Password</td>
        <td>
          <input
            class="input-field"
            type="password"
            v-model="registerUser.userPwd"
            @blur="checkUserPwd"
          />
          <span class="message">{{ userPwdMsg }}</span>
        </td>
      </tr>
      <tr>
        <td>Confirm Password</td>
        <td>
          <input
            class="input-field"
            type="password"
            v-model="confirmPassword"
            @blur="checkConfirmPassword"
          />
          <span class="message">{{ confirmPwdMsg }}</span>
        </td>
      </tr>
      <tr>
        <td colspan="2" class="button-container">
          <button class="btn" @click="register">Register</button>
          <button class="btn" @click="clearForm">Reset</button>
          <router-link to="/login">
            <button class="btn">Go to Login</button>
          </router-link>
        </td>
      </tr>
    </table>
  </div>
</template>

<style scoped>
.header {
  text-align: center;
  color: cadetblue;
  font-family: 'Arial', sans-serif;
}

.form-table {
  width: 500px;
  border: 5px solid cadetblue;
  margin: auto;
  border-radius: 5px;
  font-family: 'Arial', sans-serif;
}

.form-table td {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid powderblue;
}

.input-field {
  border: 1px solid lightgray;
  width: 80%;
  padding: 5px;
  border-radius: 3px;
}

.btn {
  margin-top: 10px;
  padding: 8px 12px;
  color: cadetblue;
  background-color: #f9f9f9;
  border: 1px solid cadetblue;
  border-radius: 4px;
  cursor: pointer;
}

.btn:hover {
  background-color: lightgray;
}

.message {
  color: tomato;
  margin-left: 10px;
}

.button-container {
  text-align: center;
  padding-top: 10px;
}
</style>
