<template>
  <!-- <router-view/> -->
  <multipleInput
    style="width: 500px;"
    v-model:inputTags="modbus"
    placeholder="请输入"
    clearable
  >
  </multipleInput>
</template>
<script lang="ts" setup>
import multipleInput from '@/components/multipleInput.vue'
import { ref } from 'vue'

const modbus = ref('')
</script>

<style lang="scss">
*{
  padding: 0;
  margin: 0;
}
html,body,#app{
  width: 100%;
  height: 100%;
}
</style>
