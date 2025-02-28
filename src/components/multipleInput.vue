<template>
  <div class="input-multiple-box" id='inputMultipleBox'>
    <div>
      <el-tag v-for="(tag, index) in inputTagList" :key="index" type="info" closable @close="handleClose(index)">
        {{ tag }}
      </el-tag>
    </div>
    <el-input
      v-bind="$attrs"
      v-model="inputValue"
      @keyup.enter="handleInputConfim"
      @blur="handleInputConfim"
      style="flex: 1; min-width: 100px"
      placeholder="按下enter键或者失去焦点进行添加"
    ></el-input>
  </div>
</template>
 
<script lang="ts" setup>
import { onMounted, ref, watch, defineProps, defineEmits } from 'vue'

const props = defineProps(["inputTags", "separator"]);
const emit = defineEmits(['update:inputTags'])

const inputTagList = ref([])
const inputValue = ref('')
const handleClose = (index: number) => {
  inputTagList.value.splice(index, 1)
  emit('update:inputTags', inputTagList.value.join(props.separator || ','))
}
const handleInputConfim = () => {
  if (inputValue.value) {
    inputTagList.value.push(inputValue.value)
    inputValue.value = ''
    emit('update:inputTags', inputTagList.value.join(props.separator || ','))
  }
}

watch(()=>props.inputTags, () => {
  inputTagList.value = props.inputTags.split(props.separator || ',')
});

onMounted(() => {
  if (props.inputTags) {
    inputTagList.value = props.inputTags.split(props.separator || ',')
  }
})
</script>
 
<style lang="scss" scoped>
.input-multiple-box {
  width: 100%;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  // padding: 0 5px;
  display: flex;
  flex-wrap: wrap;
}
</style>
<style lang="scss">
#inputMultipleBox {
  .el-input__inner {
    border: none;
  }
}
</style>
