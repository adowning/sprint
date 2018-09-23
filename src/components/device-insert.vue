<template>
<div class="insert">
    <form v-on:submit.prevent="onSubmit" name="insertForm">
        <input v-model="deviceId" autocomplete="off" type="text" name="deviceId" placeholder="deviceId" />
        <!-- <br/>
        <input v-model="userLst" autocomplete="off" type="text" name="color" placeholder="Color" />
        <br/> -->
        <button>Submit</button>
    </form>
</div>
</template>

<script>
import Vue from 'vue';
import * as Database from '../plugins/Database';
import * as randomInt from 'random-int';

export default Vue.component('device-insert', {
  data: () => {
      return {
          deviceId: ''

      };
  },
  methods: {
      async onSubmit() {
          console.log('OnSubmit');
          console.dir(this);
          const db = await Database.get();
          const obj = {
              deviceId: this.deviceId

          }
          console.dir(obj);
          await db.devices.insert(obj);
          console.log('Inserted new device: ' + this.deviceId);
          this.deviceId = '';

      }
  }
});
</script>


<style>
  input{
      font-size: 16px;
      font-weight: lighter;
      border: 0;
      border-bottom: 1px solid #999;
      margin-bottom: 20px;
      padding-bottom: 7px;
  }
  input:focus{
      outline: none;
  }
  button{
      background-color: #009688;
      outline: none;
      border: none;
      color: white;
      font-size: 16px;
      border-radius: 4px;
      padding: 1.5%;
      cursor: pointer;
      box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
  }
</style>
