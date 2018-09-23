<template>
<div id="edit-box" class="device-edit box">
    <h4>Edit</h4>
    <div class="alert" v-if="!synced">
        <h4>Warning:</h4>
        <p>Someone else has <b>changed</b> this document. If you click save, you will overwrite the changes.</p>
        <button v-on:click="resync()">resync</button>
    </div>
    <div class="alert deleted" v-if="device.deleted">
        <h4>Error:</h4>
        <p>Someone else has <b>deleted</b> this document. You can not save anymore.</p>
    </div>

      {{device.deviceId}}

    <br />
    <button v-on:click="cancel()">cancel</button>
    <button id="edit-submit-button" v-on:click="submit()" v-if="!device.deleted">submit</button>
</div>
</template>

<script>
import Vue from 'vue';
import * as Database from '../plugins/Database';
import {
    skip
} from 'rxjs/operators';

export default Vue.component('device-edit', {
    data: () => {
        return {
            synced: true,
            deleted: false,
            formData: null,
            subs: []
        };
    },
    props: ['device'],
    mounted: async function() {
        this.subs.push(
            this.device.$
            .pipe(
                skip(1)
            )
            .subscribe(() => this.synced = false)
        );
    },
    beforeDestroy: function() {
        this.subs.forEach(sub => sub.unsubscribe());
    },
    methods: {
        async submit() {
            console.log('deviceEdit.submit()');
            await this.device.atomicSet('hp', this.formData);
            this.$emit('submit');
        },
        resync() {
            console.log('deviceEdit.resync()');
            this.device.resync();
        },
        cancel() {
            console.log('deviceEdit.cancel()');
            this.device.resync();
            this.$emit('cancel');
        }
    }
});
</script>


<style>
.device-edit {
    position: fixed;
    z-index: 10;
    width: 70%;
    margin-left: 10%;
    min-height: 200px;
    margin-top: -5px;
    padding: 20px;
}

.alert {
    border-style: solid;
    border-width: 2px;
    border-radius: 10px;
    padding: 8px;
    border-color: #e0e021;
    &.deleted {
        border-color: red;
    }
    h4 {
        padding: 0;
        margin: 0;
    }
}

.color-box {
    width: 20px;
    height: 20px;
    float: left;
    margin-right: 11px;
    border-radius: 2px;
    border-width: 1px;
    border-style: solid;
    border-color: grey;
}
</style>
