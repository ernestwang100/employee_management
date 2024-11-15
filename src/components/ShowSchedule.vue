<script setup>
import { scheduleStore } from '../stores/scheduleStore.js'
import { userStore } from '../stores/userStore.js'
import request from '../utils/request.js'
import { ref, reactive, onMounted } from 'vue'

let user = userStore()
let schedule = scheduleStore()

onMounted(() => {
  loadSchedules()
})

async function loadSchedules() {
  let { data } = await request.get('schedule/findAllSchedule', { params: { uid: user.uid } })
  schedule.itemList = data.data
}

async function addSchedule() {
  let { data } = await request.get('schedule/addSchedule', { params: { uid: user.uid } })
  if (data.code === 200) {
    loadSchedules()
  } else {
    alert('Failed to add schedule')
  }
}

async function updateSchedule(item) {
  let { data } = await request.post('schedule/updateSchedule', item)
  if (data.code == 200) {
    loadSchedules()
  } else {
    alert('Failed to update schedule')
  }
}

async function deleteSchedule(index) {
  let { data } = await request.get('schedule/deleteSchedule', {
    params: { sid: schedule.itemList[index].sid },
  })
  if (data.code == 200) {
    loadSchedules()
  } else {
    alert('Failed to delete schedule')
  }
}
</script>

<template>
  <div>
    <h3 class="header">Your Schedule</h3>
    <table class="table" cellspacing="0">
      <tr class="table-row">
        <th>No.</th>
        <th>Task</th>
        <th>Status</th>
        <th>Actions</th>
      </tr>
      <tr class="table-row" v-for="(item, index) in schedule.itemList" :key="index">
        <td>{{ index + 1 }}</td>
        <td>
          <input type="text" v-model="item.title" />
        </td>
        <td>
          <input type="radio" value="1" v-model="item.completed" /> Completed
          <input type="radio" value="0" v-model="item.completed" /> Not Completed
        </td>
        <td class="action-buttons">
          <button class="button" @click="deleteSchedule(index)">Delete</button>
          <button class="button" @click="updateSchedule(item)">Save</button>
        </td>
      </tr>
      <tr class="table-row action-buttons">
        <td colspan="4">
          <button class="button" @click="addSchedule()">Add New Schedule</button>
        </td>
      </tr>
    </table>
  </div>
</template>

<style scoped>
.header {
  text-align: center;
  color: cadetblue;
  font-family: Arial, sans-serif;
  font-size: 1.5em;
  margin-top: 1em;
}

.table {
  width: 80%;
  border: 2px solid cadetblue;
  margin: auto;
  border-radius: 5px;
  font-family: Arial, sans-serif;
  background-color: #f9f9f9;
}

.table-row th,
.table-row td {
  padding: 1em;
  border: 1px solid powderblue;
  text-align: center;
}

input[type='text'] {
  width: 90%;
  padding: 0.5em;
  border: 1px solid cadetblue;
  border-radius: 4px;
}

.button {
  padding: 0.5em 1em;
  margin: 0.5em;
  color: #333;
  background-color: antiquewhite;
  border: 1px solid powderblue;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s ease;
}

.button:hover {
  background-color: #ffe4c4;
}

.action-buttons {
  text-align: center;
}
</style>
