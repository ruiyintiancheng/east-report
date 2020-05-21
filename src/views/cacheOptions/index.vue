<template>
    <div>
        缓存下拉框
        <el-select v-model="value">
            <el-option v-for="(text,value) in options['1001']" :value="value" :key="value" :label="text"></el-option>
        </el-select>
    </div>
</template>
<script>
import { baseRequest } from '@/api/baseRap'
export default {
  data() {
    return {
      value: null,
      options: {
        '1001': {}
      }
    }
  },
  mounted() {
    this.cacheOptions(baseRequest, '/common/cacheOptions', [1001]).then(options => {
      for (const key in options) {
        this.options[key] = options[key]
      }
    })
  }
}
</script>

