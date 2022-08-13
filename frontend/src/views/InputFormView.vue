<template>
  <div class="home">
    <InputForm />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import InputForm from "@/components/InputForm.vue"; // @ is an alias to /src

@Options({
  components: {
    InputForm,
  },
})
export default class InputFormView extends Vue {}
</script>
