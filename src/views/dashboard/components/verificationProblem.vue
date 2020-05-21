/*
 * @Author: wk 
 * @Date: 2020-03-31 09:41:34 
 * @Last Modified by: lk
 * @Last Modified time: 2020-05-14 17:00:02
 * @Description:  校验问题弹框
 */
<template>
  <div class="ver-problem"
       >
    <el-dialog :title="title"
               v-el-drag-dialog
               width="75%"
               :visible.sync="dialogFormVisible"
               custom-class="dialog-default  no-footer">
      <div class="dialog-contant-default">
      <div class="base-row">
        <div >
          <!-- 表格 -->
          <el-table ref="basicTable"
                    class="dashboard-table"
                    v-loading="loading"
                    v-if="tableEx"
                    :data="tableData"
                    element-loading-text="给我一点时间"
                    stripe
                    :height="tableHeight"
                    border
                    highlight-current-row
                    fit
                    header-cell-class-name="ai-el-table-header">
            <el-table-column width=80
                             type="index"
                             align="center"
                             fixed="left"
                             label="序号"></el-table-column>
            <el-table-column
                            v-for="(label,value) in tableHead" :key="value+label"
                            :min-width="150" 
                             align='center'
                             :label="label">
               <template slot="header" v-if="value === 'table_chn_name'">
                <div class="browse-condition">
                  <span class="choose-current">{{label}}</span>
                  <span class="caret-wrapper"
                        @click="tableFilter($event)">
                    <i class="sort-caret  el-icon-arrow-down"></i>
                  </span>
                  <div class="tb-filter"
                       id="trn"
                       @click="$event=>$event.stopPropagation()">
                    <input class="filter-input trninput"
                           type="text"
                           v-model="tanleName"
                           size="small"
                           style="outline:none; border-radius: 5px;border: 1px solid #ccc;"
                           placeholder="" />
                    <div class="filter-btn">
                      <span class="btnt"
                            @click="conditionScreening">查询</span>
                      <span class="btnt"
                            @click="clearanceCondition">重置</span>
                    </div>
                  </div>
                </div>
              </template>
              <template slot="header" v-else-if="value === 'column_chn_name'">
                <div class="browse-condition">
                  <span class="choose-current">{{label}}</span>
                  <span class="caret-wrapper"
                        @click="columnFilter($event)">
                    <i class="sort-caret  el-icon-arrow-down"></i>
                  </span>
                  <div class="tb-filter"
                       id="trnr"
                       @click="$event=>$event.stopPropagation()">
                    <input class="filter-input trninput"
                           type="text"
                           v-model="tanleField"
                           size="small"
                           style="outline:none; border-radius: 5px;border: 1px solid #ccc;"
                           placeholder="" />
                    <div class="filter-btn">
                      <span class="btnt"
                            @click="conditionScreening1">查询</span>
                      <span class="btnt"
                            @click="clearanceCondition">重置</span>
                    </div>
                  </div>
                </div>
              </template>               
              <template slot-scope="scope">
                {{scope.row[value]}}
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { baseSearch } from '@/api/base'
import { deepClone } from '@/utils'
export default {
  data() {
    return {
      tanleName: '',
      tanleField: '',
      tableData: [],
      tableHead: {},
      tableToggle: true,
      searchToggle: true,
      dialogFormVisible: false,
      gridData: [],
      loading: false,
      tableEx: true,
      title: ''
    }
  },
  computed: {
    tableHeight() {
      return this.$store.state.app.dialogHeight - 100
    }
  },
  mounted() {
    // this.tableData = this.gridData
    // this.bodyClik()
    document.body.addEventListener('click', this.bodyClik)
  },
  methods: {
    // 重置
    clearanceCondition() {
      this.bodyClik()
      this.loading = true
      this.tableData = deepClone(this.gridData)
      this.tanleName = ''
      this.tanleField = ''
      const arr = document.querySelectorAll('.trninput')
      if (arr.length > 0) {
        for (const iterator of arr) {
          iterator.value = ''
        }
      }
      this.loading = false
    },
    // 筛选条件
    conditionScreening() {
      if (this.tanleName) {
        this.bodyClik()
        this.loading = true
        this.tableData = this.gridData.filter(data => data.table_chn_name.toLowerCase().includes(this.tanleName.toLowerCase()))
        this.tanleField = ''
        if (document.getElementById('trnrinput')) {
          document.getElementById('trnrinput').value = ''
        }
        const serach = document.getElementById('trn')
        serach.style.display = 'none'
        this.loading = false
      } else {
        return
      }
    },
    columnFilter(e) {
      e.stopPropagation()
      const s = document.getElementById('trnr')
      s.style.left = e.clientX - 97 + 'px'
      s.style.top = e.clientY + 20 + 'px'
      s.style.display = 'block'
      const serach = document.getElementById('trn')
      if (serach) { serach.style.display = 'none' }
    },
    // 筛选条件
    conditionScreening1() {
      if (this.tanleField) {
        this.bodyClik()
        this.loading = true
        this.tableData = this.gridData.filter(data => data.column_chn_name.toLowerCase().includes(this.tanleField.toLowerCase()))
        this.tanleName = ''
        // if (document.getElementById('trninput')) {
        //   document.getElementById('trninput').value = ''
        // }
        const serach = document.getElementById('trnr')
        serach.style.display = 'none'
        this.loading = false
      } else {
        return
      }
    },
    tableFilter(e) {
      e.stopPropagation()
      const s = document.getElementById('trn')
      s.style.left = e.clientX - 97 + 'px'
      s.style.top = e.clientY + 20 + 'px'
      s.style.display = 'block'
      const serach = document.getElementById('trnr')
      if (serach) { serach.style.display = 'none' }
      // if (serach.style.display === 'none') {
      //   serach.style.display = 'block'
      // } else {
      //   serach.style.display = 'none'
      // }
    },
    onpenTable(url, n, name) {
      this.title = name
      if (url) {
        if (n) {
          if (n > 0) {
            this.loading = true
            this.dialogFormVisible = true
            baseSearch(url, { isAdd: '1' }).then(response => {
              this.gridData = response.data.item.tableData
              this.tableData = deepClone(this.gridData)
              this.tableHead = response.data.item.tableHead
            }, _ => {
              this.loading = false
            })
          } else {
            this.loading = true
            this.dialogFormVisible = true
            baseSearch(url, { isAdd: '0' }).then(response => {
              this.gridData = response.data.item.tableData
              this.dialogFormVisible = true
              this.tableData = deepClone(this.gridData)
              this.tableHead = response.data.item.tableHead
              this.loading = false
            }, _ => {
              this.loading = false
            })
          }
        } else {
          if (n === 0) {
            return
          } else {
            this.loading = true
            this.dialogFormVisible = true
            baseSearch(url).then(response => {
              this.gridData = response.data.item.tableData
              this.dialogFormVisible = true
              this.tableData = deepClone(this.gridData)
              this.tableHead = response.data.item.tableHead
              this.loading = false
            }, _ => {
              this.loading = false
            })
          }
        }
        // this.dialogFormVisible = true
      }
    },
    bodyClik() {
      const serach = document.getElementById('trn')
      const serach1 = document.getElementById('trnr')
      if (serach) {
        // const serach1 = document.getElementById('trnr')
        serach.style.display = 'none'
      // serach1.style.display = 'none'
      // document.getElementById('trninput').value = ''
      // document.getElementById('trnrinput').value = ''
      }
      if (serach1) {
        serach1.style.display = 'none'
      }
    }
  }
}
</script>
<style lang="scss" scope>
.ver-problem {
  .caret-wrapper {
    position: relative;
    top: 3px;
  }
  .el-table .browse-condition {
    position: relative;
    //   // margin-top: 10px;
    //   // .choose-current {
    //   // }
    .tb-filter {
      z-index: 99999999999999999999999999999;
      width: 150px;
      height: 90px;
      position: fixed;
      padding: 0 10px;
      // left: -30px;
      // top: 30px;
      background-color: #fff;
      border: 1px solid #ebeef5;
      border-radius: 2px;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
      box-sizing: border-box;
      margin: 2px 0;
      text-align: center;
      display: none;
      .filter-input {
        width: 100%;
        height: 28px;
        margin-top: 8px;
        padding: 0;
        // border-radius: 5px;
        // display: block;
        // border: 1px solid #dcdfe6;
      }
      .filter-btn {
        width: 100%;
        height: 40px;
        position: absolute;
        bottom: 0;
        left: 0;
        border-top: 1px solid #ebeef5;
        padding-top: 5px;
        // text-align: center;
        .btnt {
          display: inline-block;
          height: 30px;
          line-height: 30px;
          width: 50px;
          margin: 0;
          cursor: pointer;
        }
      }
    }
  }
  .el-table th {
    overflow: visible;
  }
  .el-table th div {
    overflow: visible;
    line-height: 15px;
  }
  // .el-table__header-wrapper {
  //   overflow: visible;
  // }
}
</style>