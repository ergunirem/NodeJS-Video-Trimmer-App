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
          <small>
            * Start time can only be numbers in milliseconds i.e. 3000
          </small>
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
          <small>
            * Length can only be numbers in milliseconds i.e. 2000
          </small>
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
        <a class="link" :href="downloadLink" v-if="isVisible" download
          >Download Trimmed Video</a
        >
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

const isVisible = ref(false);
const downloadLink = ref("");

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
      //Performs Success Action
      console.log(res);

      //Renders the link with the public URL received from the backend
      isVisible.value = true;
      downloadLink.value = res.data.trimmedVideo;
      messages.value = [
        {
          severity: "success",
          content:
            "Success: Please click the link below to download the output",
          id: count.value++,
        },
      ];
    })
    .catch((error) => {
      //Performs Fail Action
      console.log(error);
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

.link {
  color: whitesmoke;
}
</style>
