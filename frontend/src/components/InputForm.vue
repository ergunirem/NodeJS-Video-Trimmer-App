<template>
  <div class="field">
    <h1>Input Form</h1>
    <div class="grid align-items-center">
      <div class="col-5">
        <label class="label">Video URL</label>
      </div>
      <div class="col-3">
        <InputText type="text" v-model="videoURL" class="description" />
      </div>
    </div>
    <div class="col-offset-5" margin>
      <small> * It can only be the URL of a video you want to trim </small>
    </div>
    <div class="field">
      <div class="grid align-items-center">
        <div class="col-5">
          <label class="label">Start Time</label>
        </div>
        <div class="col-3">
          <InputNumber v-model="startTime" />
        </div>
        <div class="col-offset-5" margin>
          <small> * Start time can only be numbers in milliseconds </small>
        </div>
      </div>
      <div class="grid align-items-center">
        <div class="col-5">
          <label class="label">Length</label>
        </div>
        <div class="col-3">
          <InputNumber v-model="length" />
        </div>
        <div class="col-offset-5" margin>
          <small> * Length can only be numbers in milliseconds </small>
        </div>
      </div>
      <div class="grid align-items-center">
        <div class="col-offset-5">
          <Button @click="sendData" label="Send" icon="pi pi-send" />
          <transition-group name="p-message" tag="div">
            <Message
              v-for="msg of messages"
              :severity="msg.severity"
              :key="msg.id"
              >{{ msg.content }}</Message
            >
          </transition-group>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import InputText from "primevue/inputtext";
import InputNumber from "primevue/inputnumber";
import Button from "primevue/button";
import Message from "primevue/message";
import axios from "axios";
import { ref } from "vue";

const messages = ref([]);
const count = ref(0);

const videoURL = ref();
const startTime = ref();
const length = ref();

async function sendData() {
  const postBody = {
    videoURL: videoURL.value,
    startTime: startTime.value,
    length: length.value,
  };
  console.log(postBody);

  await axios
    .post("http://localhost:3000/", postBody)
    .then((res) => {
      //Perform Success Action
      console.log(res);
      messages.value = [
        {
          severity: "success",
          content: `Success:  ${res.data}`,
          id: count.value++,
        },
      ];
    })
    .catch((error) => {
      console.log(error);
      // error.response.status Check status code
      messages.value = [
        {
          severity: "error",
          content: `Error: ${error.message}`,
          id: count.value++,
        },
      ];
    });
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.label {
  padding-right: 12px;
  font-weight: 500;
  font-size: large;
}
</style>
