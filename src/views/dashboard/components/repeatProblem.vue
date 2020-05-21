<template>
    <div class="repeat-problem">
        <div class="base-row">
          <div class="row-botton clearfix">
            <div class="row-title">
              <svg-icon icon-class="search" />
              <span>筛选查询</span>
            </div>
            <div class="row-option">
              <el-button icon="el-icon-search" @click="getOptions()" type="primary">查询</el-button>
              <el-button icon="el-icon-refresh" @click="reset()" >重置</el-button>
              <a @click="searchToggle=false;reduceHeight=240;" v-if="searchToggle"><svg-icon icon-class="up" />&nbsp;收起</a>
              <a  @click="searchToggle=true;reduceHeight=310;" v-else><svg-icon icon-class="down"/>&nbsp;展开</a>
            </div>
          </div>
          <!-- <search-form v-show="searchToggle" ref="searchForm" :inputCount="3" :searchFormData="configData"></search-form> -->
            <el-form v-show="searchToggle" ref="problemForm" class="form-search" :model="formData" inline>
                <div class="input-both-3" style="min-width: 343px;">
              <el-form-item  prop="table_chn_name" >
                      <span class="input-label">表中文名</span>
                <el-input v-model="formData.table_chn_name" clearable style="width:250px;"
                ></el-input>
              </el-form-item>
                  </div>
                   <div class="input-both-3" style="min-width: 343px;">
              <el-form-item prop="column_chn_name" >
                      <span class="input-label">字段中文名</span>
                <el-input v-model="formData.column_chn_name" clearable style="width:250px;"
                ></el-input>
              </el-form-item>
              </div>
            </el-form>
        </div>
        <div class="base-row">
            <div class="row-botton clearfix">
              <div class="row-title">
                <svg-icon icon-class="ul" />
                <span>数据列表</span>
              </div>
               <div class="row-option">
                <a @click="tableToggle=false" v-if="tableToggle"><svg-icon icon-class="up" />&nbsp;收起</a>
                <a  @click="tableToggle=true" v-else><svg-icon icon-class="down"/>&nbsp;展开</a>
               </div>
            </div>
            <el-table v-show="tableToggle" ref="basicTable"
                        class="dashboard-table"
                        v-loading="loading"
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
                <template slot-scope="scope">
                    {{scope.row[value]}}
                </template>
                </el-table-column>
            </el-table>
                <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageNo" :page-sizes="[10,20,30,50]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
                </el-pagination>
        </div>
            
    </div>
</template>
<script>
import { baseSearch } from '@/api/base'
export default {
  props: {
    problemUrl: String,
    compareCount: [Number, String]
  },
  data() {
    return {
      pageSize: null,
      pageNo: 1,
      total: null,
      loading: false,
      tableData: [],
      tableHead: {},
      formData: {
        table_chn_name: '',
        column_chn_name: ''
      },
      searchToggle: true,
      tableToggle: true,
      reduceHeight: 310
    }
  },
  computed: {
    tableHeight() {
      return this.$store.state.app.dialogHeight - this.reduceHeight
    }
  },
  mounted() {
    this.getOptions()
  },
  methods: {
    getOptions(page) {
      this.loading = true
      if (!page) {
        this.pageNo = 1
      }
      const params = {
        pageSize: this.pageSize,
        pageNo: this.pageNo,
        table_chn_name: this.formData.table_chn_name,
        column_chn_name: this.formData.column_chn_name
      }
      if (this.compareCount) {
        if (this.compareCount > 0) {
          params.isAdd = '1'
        } else {
          params.isAdd = '0'
        }
      } else {
        if (this.compareCount === 0) {
          this.tableData = []
          return
        }
      }
      baseSearch(this.problemUrl, params).then(response => {
        this.tableData = response.data.item[0].tableData
        this.tableHead = response.data.item[0].tableHead
        this.total = response.data.total
        this.pageSize = response.data.pageSize
        this.loading = false
      })
    },
    reset() {
      this.formData.table_chn_name = ''
      this.formData.column_chn_name = ''
      this.getOptions()
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.getOptions()
    },
    handleCurrentChange(val) {
      this.pageNo = val
      this.getOptions(true)
    }
  }
}
</script>