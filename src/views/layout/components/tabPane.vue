/*
 * @Author: lk 
 * @Date: 2019-03-04 10:11:03 
 * @Last Modified by: lk
 * @Last Modified time: 2019-08-23 14:29:08
 * @Description:  个人设置
 */
<template >
<div class="tabPane">
<el-form v-if="type==='1'"  label-width="70px" style='width: 400px; margin:0 auto;' >
<el-form-item >
{{$t('personalSettings.language')}}：
<el-select v-model="value">
<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
</el-select> 
</el-form-item>
<el-form-item> 
{{$t('personalSettings.color')}}：
<el-color-picker v-model="color" @change="colorChange" style="position:absolute;"></el-color-picker>
</el-form-item>
</el-form>
<div class="transfer-father" v-else-if="type==='2'">
<el-transfer  filterable  :filter-method="filterMethod" :props="{key:'action_id',label:'msg_text'}"   v-model="selected"  :data="transferOptions" :titles="[$t('personalSettings.options'), $t('personalSettings.selected')]">
</el-transfer>
</div>
<el-form  v-else-if="type==='3'" ref="passwordForm" :rules="passwordRules"  label-width="100px" style='width: 400px; margin:0 auto;' :model="formLabelAlign">
  <el-form-item :label="$t('personalSettings.oldPassword')" prop="oldPassword">
    <el-input v-model="formLabelAlign.oldPassword" placeholder="请输入旧密码"></el-input>
  </el-form-item>
  <el-form-item :label="$t('personalSettings.newPassword')" prop="newPassword">
    <el-input v-model="formLabelAlign.newPassword" placeholder="请输入新密码"></el-input>
  </el-form-item>
  <el-form-item :label="$t('personalSettings.confirmPassword')" prop="confirmPassword">
    <el-input v-model="formLabelAlign.confirmPassword" placeholder="请确认密码"></el-input>
  </el-form-item>
</el-form>
<div class="form-footer">
<el-button type="primary" @click="saveOperate()">{{$t('save')}}</el-button>
</div>
</div>
</template>

<script>
import { saveUpdate } from '@/utils/validate'
import { baseRequest } from '@/api/base'
import ThemePicker from '@/components/ThemePicker'
export default {
  props: {
    type: String,
    default: '1'
  },
  components: {
    ThemePicker
  },
  data() {
    var validatePass = (rule, value, callback) => {
      if (value !== this.formLabelAlign.newPassword) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    var validateLanguage = (rule, value, callback) => {
      var reg = new RegExp('[\\u4E00-\\u9FFF]+', 'g')
      if (reg.test(value)) {
        callback(new Error('密码不能包含汉字!'))
      } else {
        callback()
      }
    }
    return {
      value: '',
      color: '#304156',
      oldColor: '',
      transferOptions: [],
      selected: [],
      filterMethod(query, item) {
        return item.msg_text.indexOf(query) > -1
      },
      formLabelAlign: {
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
      },
      passwordRules: {
        oldPassword: [{
          required: true, message: '请输入旧密码'
        }],
        newPassword: [{
          required: true, message: '请输入新密码'
        }, {
          validator: validateLanguage
        }],
        confirmPassword: [{
          required: true, message: '请再次输入新密码'
        }, {
          validator: validatePass, trigger: 'blur'
        }]
      }
    }
  },
  computed: {
    options: function() {
      return this.$t('personalSettings.colorOption')
    }
  },
  created() {
    this.value = this.$store.state.app.language
    this.color = this.$store.state.app.bgColor
    if (this.type === '2') {
      baseRequest('/function/getLastMenuByUserId').then(response => {
        const options = response.data.item.options
        const selected = response.data.item.selected
        for (const iterator of selected) {
          if (iterator.config_value) {
            this.selected.push(Number.parseInt(iterator.config_value))
          }
        }
        const index = options.findIndex(val => val.msg_text === '我的收藏')
        if (index !== -1) {
          options.splice(index, 1)
        }
        this.transferOptions = options
      })
    }
  },
  destroyed() {
    if (this.oldColor) {
      this.$store.dispatch('setBgColor', this.oldColor)
    }
  },
  methods: {
    colorChange(color) {
      if (!this.oldColor) {
        this.oldColor = this.$store.state.app.bgColor
      }
      this.$store.dispatch('setBgColor', this.color)
    },
    saveUpdate() {
      if (this.type === '1') {
        baseRequest('/customConfig/update', {
          defId: 1,
          configValue: this.value
        }).then(_ => {
          this.$store.dispatch('setLanguage', this.value).then(() => {
            this.$i18n.locale = this.value
            baseRequest('/customConfig/update', {
              defId: 2,
              configValue: this.color
            }).then(_ => {
              this.$store.dispatch('setBgColor', this.color).then(() => {
                this.oldColor = ''
                this.$Message.success(this.$t('success'))
                location.reload()
              })
            })
          })
        })
      } else if (this.type === '2') {
        baseRequest('/customConfig/update', {
          defId: 3,
          configValue: this.selected
        }).then(_ => {
          this.$Message.success(this.$t('success'))
          location.reload()
        })
      } else if (this.type === '3') {
        saveUpdate('/users/changePassword', this.formLabelAlign, this.passwordRules, this.$refs.passwordForm, ['oldPassword',
          'newPassword',
          'confirmPassword']).then(() => {
          this.$Message.info('密码变更，请重新登陆')
          this.$store.dispatch('LogOut').then(() => {
            this.$router.push('/login')
          })
        })
      }
    },
    saveOperate() {
      if (this.type === '3') {
        this.saveUpdate()
      } else {
        this.$confirm('此操作将重新加载系统, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.saveUpdate()
        })
      }
    }
  }
}
</script>
<style scoped>
  .form-footer{
    position: absolute;
    bottom: 30px;
    left: 50%;
    transform: translateX(-50%);
  }
</style>
<style lang="scss">
  .dialog-contant-default.personalSettings{
    .el-tabs.el-tabs--top.el-tabs--border-card{
      height: 100%;
      .el-tabs__content {
        position: static;
        height: calc(100% - 90px);
        .el-tab-pane{
          height:100%;
          .tabPane{
            height:100%;
            .transfer-father{
              height: 100%;
              margin-left: calc(10% - 40px);
              .el-transfer{
                height:100%;
                .el-transfer-panel{
                  height:100%;
                  width: 40%;
                  .el-transfer-panel__body{
                    height: calc(100% - 40px);
                    .el-checkbox-group.el-transfer-panel__list.is-filterable{
                      height: calc(100% - 62px);
                      overflow: auto;
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
</style>

