/*
 * @Author: wk 
 * @Date: 2020-03-27 09:25:26 
 * @Last Modified by: lk
 * @Last Modified time: 2020-05-11 17:39:08
 * @Description:  数据弹出框
 */
<template>
  <div class="data-situation"
       @click="bodyClik">
    <el-dialog :title="title"
               v-el-drag-dialog
               width="75%"
               :visible.sync="dialogFormVisible"
               custom-class="dialog-default  no-footer">
      <div class="dialog-contant-default">
      <div class="base-row">
        <div>
          <!-- 表格 -->
          <el-table ref="basicTable"
                    v-loading="loading"
                    :data="tableData"
                    element-loading-text="给我一点时间"
                    stripe
                    :height="tableHeight"
                    border
                    highlight-current-row
                    fit
                    header-cell-class-name="ai-el-table-header">
            <el-table-column width=50
                             type="index"
                             align="center"
                             fixed="left"
                             label="序号"></el-table-column>
            <el-table-column :min-width="150"
                             align='center'
                             label="表名称">
              <template slot="header">
                <div class="browse-condition">
                  <span class="choose-current">表名称</span>
                  <span class="caret-wrapper"
                        @click="aaa($event)">
                    <i class="sort-caret  el-icon-arrow-down"></i>
                  </span>
                  <div class="tb-filter"
                       id="tln"
                       @click="$event=>$event.stopPropagation()">
                    <input class="filter-input"
                           type="text"
                           v-model="tanleName"
                           size="small"
                           style="outline:none; border-radius: 5px;border: 1px solid #ccc;"
                           id="tninput"
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
              <template slot-scope="scope">
                {{scope.row.table_chn_name}}
              </template>
            </el-table-column>
            <el-table-column :min-width="150"
                             align='center'
                             label="表域">
              <template slot-scope="scope">
                {{scope.row.table_scope_name}}
              </template>
            </el-table-column>
            <el-table-column :min-width="300"
                             align='center'
                             label="报送范围">
              <template slot-scope="scope">
                {{scope.row.submission_range}}
              </template>
            </el-table-column>
            <el-table-column :min-width="150"
                             align='center'
                             label="备注">
              <template slot-scope="scope">
                {{scope.row.remark?scope.row.remark:''}}
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
export default {
  data() {
    return {
      creen: 'none',
      tanleName: '',
      tableToggle: true,
      searchToggle: true,
      tableData: [],
      // tableHead: {},
      dialogFormVisible: false,
      gridData: [],
      loading: false,
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

    // serach.onclick = (e) => {
    //   alert(9)
    //   e.stopPropagation()
    // }
  },
  methods: {
    // 重置
    clearanceCondition() {
      this.tableData = this.gridData
      document.getElementById('tninput').value = ''
    },
    // 筛选条件
    conditionScreening() {
      if (this.tanleName) {
        this.tableData = this.gridData.filter(data => data.table_chn_name.toLowerCase().includes(this.tanleName.toLowerCase()))
        const serach = document.getElementById('tln')
        serach.style.display = 'none'
      } else {
        return
      }
    },
    aaa(e) {
      e.stopPropagation()
      const serach = document.getElementById('tln')
      if (serach.style.display === 'none') {
        serach.style.display = 'block'
      } else {
        serach.style.display = 'none'
      }
    },
    onpenTable(url, name) {
      if (url) {
        this.dialogFormVisible = true
        this.loading = true
        baseSearch(url).then(response => {
          this.gridData = response.data.item.tableData
          this.tableData = this.gridData
          this.title = name
          this.loading = false
        }, _ => {
          this.loading = false
        })
        // this.dialogFormVisible = true
      }
    },
    bodyClik() {
      const serach = document.getElementById('tln')
      serach.style.display = 'none'
      document.getElementById('tninput').value = ''
    }
  }
}
</script>
<style lang="scss" scope>
.data-situation {
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
      position: absolute;
      left: -30px;
      top: 30px;
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
  .el-table__header-wrapper {
    overflow: visible;
  }
}
</style>
