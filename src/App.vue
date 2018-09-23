
<template>
<div id="app">
    <h1>RxDB - vuejs</h1>

    <div id="list-box" class="box">
      <h3>Heroes</h3>
        <heroes-list v-on:edit="editHero"></heroes-list>
    </div>
    <div id="insert-box" class="box">
        <hero-insert></hero-insert>

    </div>
     <hero-edit v-if="edit" v-bind:hero="edit" v-on:cancel="edit=null" v-on:submit="edit=null"></hero-edit>

    <div id="list-box" class="box">
      <h3>Devices</h3>
        <devices-list></devices-list>
            <div id="insert-box" class="box">
        <device-insert></device-insert>
    </div>
     <device-edit v-if="editDevice" v-bind:device="editDevice" v-on:cancel="editDevice=null" v-on:submit="editDevice=null"></device-edit>
    </div>
</div>
</template>

<script>
import * as Database from './plugins/Database';
import HeroesList from './components/heroes-list.vue';
import DevicesList from './components/devices-list.vue';
import HeroInsert from './components/hero-insert.vue';
import DeviceInsert from './components/device-insert.vue';
import HeroEdit from './components/hero-edit.vue';
import DeviceEdit from './components/device-edit.vue';
export default {
    name: 'app',
    data() {
        return {
          edit: null,
          editDevice: null
        }
    },
    methods: {
      editHero(hero){
        this.edit = hero;
      },
      editDevice(device){
        this.editDevice = device;
      }
    }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
#insert-box,
#list-box,
h1 {
    width: 86%;
    padding: 3%;
    margin-left: auto;
    margin-right: auto;
}
.box{
    box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
    margin-bottom: 20px;
    background: white;
}
#insert-box h3,
#insert-box input,
#insert-box button{
    width: 100%;
}
.box h3{
    margin-top: 0;
}
h1{
    display: block;
    font-size: 1.17em;
    -webkit-margin-before: 1em;
    -webkit-margin-after: 1em;
    -webkit-margin-start: 0px;
    -webkit-margin-end: 0px;
    font-weight: bold;
    margin: 0 auto;
    padding: 3%;
    width: 92%;
}
h3{
    font-size: 14px;
    color: rgba(0, 0, 0, 0.54);
}
</style>
