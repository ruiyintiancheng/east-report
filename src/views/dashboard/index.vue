/*
 * @Author: lk 
 * @Date: 2018-11-21 14:55:40 
 * @Last Modified by: wk
 * @Last Modified time: 2020-05-21 09:46:24
 * @Description:  首页
 */
<template>
  <div class="dashboard-container">
    <el-row :gutter="15">
      <el-col :sm="12"
              :md="12"
              :lg="6"
              :xl="6">
        <div class="dashboard-card">
          <div class="dashboard-card-title">报送说明</div>
          <div class="dashboard-card-context">
            <div class="clearfix">
              <p>采集日期：</p>
              <p class="card-result bolder-weight">{{submitData.cjrq}}</p>
            </div>
            <div class="clearfix">
              <p class="card-result">&nbsp;
              </p>
            </div>
            <div class="clearfix">
              <p>数据量：</p>
              <p class="card-result bolder-weight">{{submitData.dataCounts}}(GB)</p>
            </div>
            <div class="clearfix">
              <p class="card-result">&nbsp;
              </p>
            </div>
            <div class="clearfix">
              <p>数据表：</p>
              <p class="card-result bolder-weight">{{submitData.tableCounts}}(张)</p>
            </div>
            <div class="clearfix">
              <p class="card-result">&nbsp;
              </p>
            </div>
            <div class="clearfix">
              <p>校验规则：</p>
              <p class="card-result bolder-weight">{{submitData.validateCounts}}(个)</p>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :sm="12"
              :md="12"
              :lg="6"
              :xl="6">
        <div class="dashboard-card">
          <div class="dashboard-card-title">数据情况</div>
          <div class="dashboard-card-context">
            <div class="dashboard-card-label"
                 style="margin-top:3px;">59张表有数据占比：</div>
            <div class="bill-row">
              <div class="h-data">
                <div style=" cursor: pointer;"
                     @click="submitData.haveData&&openTable('/east-current/dataSituation/getTableMessageHasData','59张表有数据表信息')"><a class="has-underline bolder-weight">{{submitData.haveData}}</a></div>
                <span>有数据表</span>
              </div>
              <div class="blue"
                   :style="{width:calculationRatio(submitData.haveData,59)+'px'}"></div>
              <div class="red"
                   :style="{width:calculationRatio(submitData.noData,59)+'px'}"> </div>
              <div class="h-data">
                <div style=" cursor: pointer;"
                     @click="submitData.noData&&openTable('/east-current/dataSituation/getTableMessageHasNotData','59张表无数据表信息')"><a class="has-underline bolder-weight">{{submitData.noData}}</a>
                </div>
                <span>无数据表</span>
              </div>
            </div>
            <span class="dashboard-card-label">49张有数据表大表占比：</span>
            <div class="bill-row">
              <div class="h-data">
                <div style=" cursor: pointer;"
                     @click="submitData.gtt&&openTable('/east-current/dataSituation/getTableMessageLargeTable','49张有数据表大表>=10万表信息')"><a class="has-underline bolder-weight">{{submitData.gtt}}</a></div>
                <span>&gt;=10万</span>
              </div>
              <div class="blue"
                   :style="{width:calculationRatio(submitData.gtt,59)+'px'}"></div>
              <div class="red"
                   :style="{width:calculationRatio(submitData.ltt,59)+'px'}"> </div>
              <div class="h-data">
                <div style=" cursor: pointer;"
                     @click="submitData.ltt&&openTable('/east-current/dataSituation/getTableMessageSmallTable','49张有数据表大表<10万表信息')"><a class="has-underline bolder-weight">{{submitData.ltt}}</a></div>
                <span>&lt;10万</span>
              </div>
            </div>
            <span class="dashboard-card-label">本期数据涨幅情况：</span>
            <div class="bill-row">
              <div class="h-data hasbgc"
                   style=" background-color:#199ED8;">
                <div style=" cursor: pointer;"
                     @click="submitData.growth&&openTable('/east-current/dataSituation/getTableMessageForDataGrowth','本期数据增长信息')"><a class="has-underline">{{submitData.growth}}</a></div>
                <span>增长</span>
              </div>
              <div class="h-data hasbgc"
                   style="margin:0 10px; background-color:#E6A23C">
                <div style=" cursor: pointer;"
                     @click="submitData.nc&&openTable('/east-current/dataSituation/getTableMessageForDataNotChange','本期数据没变化信息')"><a class="has-underline">{{submitData.nc}}</a></div>
                <span>没变化</span>
              </div>
              <div class="h-data hasbgc"
                   style=" background-color:#F56C6C">
                <div style=" cursor: pointer;"
                     @click="submitData.decrease&&openTable('/east-current/dataSituation/getTableMessageByDataReduction','本期数据减少信息')"><a class="has-underline">{{submitData.decrease}}</a></div>
                <span>减少</span>
              </div>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :sm="12"
              :md="12"
              :lg="6"
              :xl="6">
        <div class="dashboard-card">
          <div class="dashboard-card-title">校验问题</div>
          <div class="dashboard-card-context">
            <div class="clearfix">
              <p class="clearfix">会版规则问题数：</p>
              <p class="card-result"><span style=" cursor: pointer;font-weight: 600;"
                      @click="verificationProblem.currQuestions&&openVerification('/east-current/checkQuestion/getCheckQuestionDetailCurrentOne',undefined,'会版规则问题情况')"><a class="has-underline">{{verificationProblem.currQuestions}}</a></span>
              </p>
            </div>
            <div class="clearfix">
              <p class="card-result">较上期
                <span :style="{color:judgeColors(verificationProblem.lessQuestions),cursor:'pointer',fontWeight: 600}"
                      @click="openVerification('/east-current/checkQuestion/getCheckQuestionDetailCurrentOneChange',verificationProblem.lessQuestions,'会版规则问题数与上期比较情况')"><a class="has-underline">{{verificationProblem.lessQuestions>=0?'+'+verificationProblem.lessQuestions:verificationProblem.lessQuestions}}</a></span>
              </p>
            </div>
            <div class="clearfix">
              <p>会版问题数据量：</p>
              <p class="card-result"><span style="font-weight: 600;">{{verificationProblem.currQuestionCounts}}</span>
              </p>
            </div>
            <div class="clearfix">
              <p class="card-result">
                较上期 <span :style="{color:judgeColors(verificationProblem.lessQuestionCounts),fontWeight: 600}">{{verificationProblem.lessQuestionCounts>=0?'+'+verificationProblem.lessQuestionCounts:verificationProblem.lessQuestionCounts}}</span>
              </p>
            </div>
            <div class="clearfix">
              <p>非会版规则问题数：</p>
              <p class="card-result"><span style=" cursor: pointer;font-weight: 600;"
                      @click="verificationProblem.noCurrQuestions&&openVerification('/east-current/checkQuestion/getCheckQuestionDetailCurrentTwo',undefined,'非会版规则问题情况')"><a class="has-underline">{{verificationProblem.noCurrQuestions}}</a></span>
              </p>
            </div>
            <div class="clearfix">
              <p class="card-result">
                较上期 <span :style="{color:judgeColors(verificationProblem.lessNoCurrQuestions),cursor:'pointer',fontWeight: 600}"
                      @click="openVerification('/east-current/checkQuestion/getCheckQuestionDetailCurrentTwoChange',verificationProblem.lessNoCurrQuestions,'非会版规则问题数与上期比较情况')"><a class="has-underline">{{verificationProblem.lessNoCurrQuestions>=0?'+'+verificationProblem.lessNoCurrQuestions:verificationProblem.lessNoCurrQuestions}}</a></span>
              </p>
            </div>
            <div class="clearfix">
              <p>非会版问题数据量：</p>
              <p class="card-result"><span style="font-weight: 600;">{{verificationProblem.noCurrQuestionCounts}}</span>
              </p>
            </div>
            <div class="clearfix">
              <p class="card-result">
                较上期 <span :style="{color:judgeColors(verificationProblem.lessNoCurrQuestionCounts),fontWeight: 600}">{{verificationProblem.lessNoCurrQuestionCounts>=0?'+'+verificationProblem.lessNoCurrQuestionCounts:verificationProblem.lessNoCurrQuestionCounts}}</span>
              </p>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :sm="12"
              :md="12"
              :lg="6"
              :xl="6">
        <div class="dashboard-card">
          <div class="dashboard-card-title">业务问题分布</div>
          <div class="dashboard-card-context">
            <custom-echarts ref="wentitongjiChart"
                            propsHeight="170px"
                            id="wentitongji"
                            :option="wentitongji"></custom-echarts>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="15">
      <el-col :span="18">
        <div class="dashboard-status ">
          <el-carousel trigger="click"
                       :autoplay="false"
                       arrow="always"
                       height="440px"
                       indicator-position="outside">
            <el-carousel-item label="问题数排名">
              <custom-echarts ref="questionNumber"
                              propsHeight="460px"
                              id="questionNumber"
                              :option="questionNumber"></custom-echarts>
            </el-carousel-item>
            <el-carousel-item label="问题数据量排名">
              <custom-echarts ref="problemData"
                              propsHeight="460px"
                              id="problemData"
                              :option="problemData"></custom-echarts>
            </el-carousel-item>
          </el-carousel>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="dashboard-status dashboard-messages">
          <div class="dashboard-panel">
            <h3 class="dashboard-panel-title">
              工作通知
              <span class="dashboard-panel-more"
                    @click="settingNews=true">更多>></span>
            </h3>
            <div class="dashboard-panel-context">
              <a href="javascript:;"
                 v-for="(item,index) in noticeList"
                 :key="index"
                 @click="openNotify(item.notice_id)">
                <svg-icon class="svgI"
                          icon-class="icon" /> {{item.notice_title}}</a>
              <!-- icon-class="icon" /> {{item.notice_title}}</a> -->
            </div>
          </div>
          <div class="dashboard-panel">
            <h3 class="dashboard-panel-title">
              待办事项
            </h3>
            <div class="dashboard-panel-context">
              <a href="javascript:;"
                 v-for="(item,index) in matterList"
                 :key="index"
                 @click="openDetail(item,2)">
                <svg-icon class="svgI"
                          icon-class="clock" /> {{item.title}}</a>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
    <div class="dashboard-chart">
      <custom-echarts ref="lineBarChart"
                      propsHeight="400px"
                      id="lineBar"
                      :option="lineBar"></custom-echarts>
    </div>
    <notice ref='notice'></notice>
    <matter ref='matter'></matter>
    <single-frame ref="frame"></single-frame>
    <verification-problem ref="verification"></verification-problem>
    <el-dialog title="工作通知"
               v-el-drag-dialog
               :close-on-click-modal='false'
               top="8vh"
               :visible.sync="settingNews"
               width="90%"
               custom-class="dialog-default my-news-dialog no-footer">
      <div class="dialog-contant-default">
        <my-news ref="myNews"
                 v-if="settingNews"
                 @getNewsCount="getNewsCount"></my-news>
      </div>
    </el-dialog>
    <el-dialog :title="problemTitle"
               v-el-drag-dialog
               :close-on-click-modal='false'
               top="8vh"
               :visible.sync="problemVisble"
               width="90%"
               custom-class="dialog-default no-footer">
      <div class="dialog-contant-default"
           v-if="problemVisble">
        <repeat-problem :problemUrl="problemUrl"
                        :compareCount="compareCount"></repeat-problem>
      </div>
    </el-dialog>
    <news-detail ref="newsDetail"
                 @getNewsCount="getNewsCount"></news-detail>
  </div>
</template>

<script>
import 'echarts/map/js/china.js'
import { baseRequest } from '@/api/base'
// import { baseSearch } from '@/api/base'
import CustomEcharts from '@/components/Charts/CustomEcharts'
import Notice from './components/Notice'
import Matter from './components/Matter'
import SingleFrame from './components/SingleFrame'
// import { openWebSocket } from '@/utils/websocket'
import VerificationProblem from './components/verificationProblem'
import repeatProblem from './components/repeatProblem'
import MyNews from '@/views/myNews'
import NewsDetail from '@/views/myNews/components/NewsDetail'
export default {
  // name: 'dashboard',
  components: {
    CustomEcharts,
    Notice,
    Matter,
    SingleFrame,
    VerificationProblem,
    MyNews,
    NewsDetail,
    repeatProblem
  },
  data() {
    return {
      settingNews: false,
      problemVisble: false,
      problemUrl: '', // 校验问题地址
      compareCount: null,
      problemTitle: null,
      branchTrend: {}, // 折线
      bankIssues: {}, // 柱
      businessSegment: {}, // 业务问题分布
      verificationProblem: {}, // 校验问题
      submitData: {}, // 报送说明、数据情况
      colunmWidth: 0,
      wentitongji: {}, // 问题统计
      questionNumber: {},
      problemData: {},
      lineBar: {}, // 折线柱状图
      noticeList: [
      ],
      matterList: [
        {
          'title': '厦门分行接口人变更',
          'id': '1'
        },
        {
          'title': '深圳分行数据导入失败',
          'id': '2'
        },
        {
          'title': '四川分行机构地址错误',
          'id': '3'
        }
      ]
    }
  },
  mounted() {
    this.getAllData()
    this.getWidth()
    this.getJobNotifications()
    // this.getNewsCount().then(_ => {
    //   openWebSocket(function(result) {
    //     result = JSON.parse(result)
    //     if (typeof (result) !== 'object') return
    //     const h = this.$createElement
    //     const notify = this.$notify({
    //       title: result.msgTitle ? result.msgTitle : '消息',
    //       dangerouslyUseHTMLString: true,
    //       message: h('a', {// 内容 可点击弹框
    //         on: {
    //           click: _ => {
    //             this.openNotify(result.msgId)
    //           }
    //         }
    //       }, result.msgContent),
    //       duration: 0, // 显示时间, 毫秒。设为 0 则不会自动关闭
    //       offset: 250, // 位置
    //       showClose: true, // 是否展示可关闭按钮
    //       iconClass: 'el-icon-bell' // 自定义图标的类名，会覆盖 type
    //     })
    //     this.notifyList.push(notify)
    //     this.newsCount = this.newsCount + 1
    //   }.bind(this))
    // })
  },
  methods: {
    // 打开消息
    openNotify(id) {
      baseRequest('/basic/notices/select', { noticeId: id, urlMode: '2' }).then(response => {
        const row = response.data.item
        if (row) {
          const formData = {
            noticeTitle: row.noticeTitle,
            summary: row.summary,
            content: row.content,
            noticeId: row.noticeId
          }
          this.$refs.newsDetail.seeView(formData)
        }
      })
    },
    // 获取未读文件数
    getNewsCount() {
      return new Promise((resolve) => {
        baseRequest('/basic/notices/notify').then(response => {
          this.$store.dispatch('SetNewsCount', response.data.item.news_count).then(() => {
            resolve()
          })
        })
      })
    },
    // 获取工作通知数据
    getJobNotifications() {
      const params = {
        noticeTitle: null,
        pageNo: '1',
        summary: null,
        urlMode: '2'
      }
      this.noticeList = []
      baseRequest('/basic/notices/myNewsList', params).then(response => {
        // this.noticeList = response.data.item
        if (response.data.item.length > 0) {
          this.noticeList = response.data.item.slice(0, 4)
        }
      })
    },
    // 打开问题校验弹框
    openVerification(url, n, name) {
      this.problemTitle = name
      this.problemUrl = url
      this.compareCount = n
      this.problemVisble = true
      // this.$refs.verification.onpenTable(url, n, name)
    },
    // 打开数据情况弹框
    openTable(url, title) {
      this.$refs.frame.onpenTable(url, title)
    },
    // 判断颜色
    judgeColors(num) {
      if (num) {
        // if (num > 0) {
        //   return '#199ED8'
        // } else if (num < 0) {
        return '#F56C6C'
        // }
      }
    },
    getAllData() {
      baseRequest('/east-current/submissions/getExplanation').then(response => {
        this.submitData = response.data.item
      })
      baseRequest('/east-current/dataCheck/getCheckQuestions').then(response => {
        this.verificationProblem = response.data.item
      })
      baseRequest('/east-current/dataCheck/getBranchRankings').then(response => {
        this.bankIssues = response.data.item
        this.$nextTick(_ => {
          this.columnFirst()
          this.columnSecond()
        })
      })
      baseRequest('/east-current/dataCheck/getQuestionTendencyChart').then(response => {
        this.getLineBar(response.data.item)
      })
      baseRequest('/east-current/dataCheck/getBusinessQuestionsDistrabution').then(response => {
        const businessSegment = response.data.item
        this.businessProblems(businessSegment)
      })
    },
    // 获取柱状图宽度
    getWidth() {
      // this.$nextTick(_ => {
      const w = document.getElementsByClassName('dashboard-status')[0].offsetWidth
      this.colunmWidth = w
      // })
    },
    // 柱状图1
    columnFirst() {
      this.questionNumber = {
        title: {
          text: '各行问题数排名',
          x: 'left',
          y: 'top',
          textStyle: {
            fonrSize: 16
          }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            axisLabel: {
              interval: 0,
              rotate: 40
            },
            type: 'category',
            data: ['北京分行', '天津分行', '上海分行', '深圳分行', '江西分行',
              '山西省分行', '国际金融事业部', '广东分行', '福建分行', '辽宁分行', '吉林分行', '广西分行', '河南分行',
              '重庆分行', '河北分行', '黑龙江分行', '新疆分行', '山西分行', '陕西分行', '甘肃分行', '青海分行'
            ],
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '',
            type: 'bar',
            barWidth: '13px',
            data: [99, 87, 81, 70, 66, 53, 42, 41, 33, 30, 25, 20, 13, 11, 9, 7, 5, 3, 2, 1, 0],
            itemStyle: {
              emphasis: {
                barBorderRadius: 30
              }
            }
          }
        ]
      }
    },
    // 柱状图2
    columnSecond() {
      this.problemData = {
        title: {
          text: '各行问题数据量排名',
          x: 'left',
          y: 'top',
          textStyle: {
            fonrSize: 16
          }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            axisLabel: {
              interval: 0,
              rotate: 40
            },
            type: 'category',
            data: ['北京分行', '天津分行', '上海分行', '深圳分行', '江西分行',
              '山西省分行', '国际金融事业部', '广东分行', '福建分行', '辽宁分行', '吉林分行', '广西分行', '河南分行',
              '重庆分行', '河北分行', '黑龙江分行', '新疆分行', '山西分行', '陕西分行', '甘肃分行', '青海分行'
            ],
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '',
            type: 'bar',
            barWidth: '13px',
            data: [399, 337, 281, 230, 176, 175, 91, 75, 61, 51, 47, 43, 35, 33, 31, 28, 22, 17, 13, 3, 0],
            itemStyle: {
              emphasis: {
                barBorderRadius: 30
              }
            }
          }
        ]
      }
    },
    // 折线图
    getLineBar(item) {
      this.branchTrend = item
      this.lineBar = {
        title: {
          text: '**分行时间趋势图',
          x: 'left',
          y: 'top',
          textStyle: {
            fonrSize: 16
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        tooltip: {
          trigger: 'axis'
        },
        xAxis: {
          type: 'category',
          data: this.branchTrend.xAxisData
        },
        yAxis: {
          type: 'value'
        },
        color: ['#31A1D7', '#FD9EE5', '#70F4F7', '#FFAE8B'],

        legend: {
          data: this.branchTrend.legendData,
          y: 10,
          selected: this.branchTrend.selected
        },
        series: this.branchTrend.seriesData.map(item => {
          const serie = {
            data: item.data,
            name: item.name,
            type: 'line'
          }
          return serie
        })
      }
    },
    // 饼状图
    businessProblems(b) {
      this.wentitongji = {
        title: {
          left: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{b} : {c} ({d}%)'
        },
        legend: {
          type: 'scroll',
          orient: 'vertical',
          right: 3,
          top: 20,
          bottom: 20,
          data: b.legendData,
          selected: b.selected
        },
        series: [
          {
            type: 'pie',
            // radius: '70%',
            center: ['40%', '55%'],
            data: b.seriesData,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }
    },
    // 算比列
    calculationRatio(num, all) {
      const a = num / all * 80
      return Math.round(a)
    },
    openDetail(item, index) {
      if (index === 1) {
        this.$refs.notice.seeView(item)
      } else {
        this.$refs.matter.seeView(item)
      }
    }
  }
}
</script>
<style lang="scss">
.bolder-weight {
  font-weight: 600;
}
.has-underline {
  text-decoration: underline;
}
.dashboard-container {
  .el-carousel__button {
    // background-color: #31A1D7;
    // color:#fff;
    // padding: 11px 18px;
    background-color: #ecf5ff;
    color: #73777a;
    padding: 10px 18px;
    border-radius: 4px;
    border: 1px solid #e5eaed;
    font-size: 13px;
    font-weight: 600;
    opacity: 1;
  }
  .el-carousel__indicator.is-active button {
    opacity: 1;
    color: #409eff;
    border: 1px solid #409eff;
  }
  .el-carousel__indicators--outside .el-carousel__indicator:hover button {
    opacity: 1;
  }
  background-color: #eff1f4;
  padding: 0 15px 15px;
  .dashboard-card {
    height: 225px;
    margin-top: 15px;
    background-color: #fff;
    .dashboard-card-title {
      text-align: left;
      font-weight: bold;
      font-size: 20px;
      height: 40px;
      line-height: 40px;
      margin-left: 20px;
    }
    .dashboard-card-context {
      margin-left: 20px;
      height: 185px;
      .field {
        font-size: 14px;
        margin: 0;
        padding: 0;
        height: 20px;
        line-height: 20px;
      }
      p {
        margin: 0;
        line-height: 22px;
        font-size: 14px;
        float: left;
        &.card-result {
          float: right;
          padding-right: 10px;
        }
      }
      .data-situation-row {
        margin-bottom: 16px;
      }
      .dashboard-card-label {
        font-size: 14px;
      }
      .bill-row {
        // vertical-align: middle;
        text-align: right;
        padding-right: 10px;
        margin-top: 3px;
        .blue {
          display: inline-block;
          height: 10px;
          // width: 100px;
          position: relative;
          top: -10px;
          background-color: #409eff;
        }
        .red {
          display: inline-block;
          height: 10px;
          // width: 100px;
          position: relative;
          top: -10px;
          background-color: #f56c6c;
        }
        .h-data {
          // box-sizing: inherit;
          display: inline-block;
          text-align: center;
          width: 50px;
          color: #666;
          padding: 4px 0;
          border-radius: 8px;
          line-height: 15px;
          &.hasbgc {
            color: #fff;
            div {
              color: #fff;
            }
          }
          // height: 40px;
          // line-height: 20px;
          div {
            font-size: 14px;
            font-weight: 600;
            color: #000;
          }
          span {
            display: block;
            // width: 50px;
            font-size: 12px;
          }
        }
      }
    }
  }
  .dashboard-status {
    height: 500px;
    overflow: hidden;
    margin-top: 15px;
    background-color: #fff;
    &.dashboard-messages {
      background-color: #eff1f4;
      .dashboard-panel {
        height: calc(50% - 10px);
        background-color: #fff;
        &:last-child {
          margin-top: 20px;
        }
        .dashboard-panel-title {
          height: 50px;
          line-height: 50px;
          font-size: 20px;
          margin: 0;
          padding-left: 10px;
          position: relative;
          border-bottom: 1px solid #ccc;
          .dashboard-panel-more {
            position: absolute;
            right: 10px;
            font-size: 13px;
            font-weight: normal;
            color: #666;
            cursor: pointer;
            &:hover {
              color: #85c1ff;
            }
          }
        }
        .dashboard-panel-context {
          height: calc(100% - 60px);
          padding: 10px;
          padding-left: 30px;
          overflow: auto;
          a {
            display: block;
            height: 40px;
            line-height: 40px;
            color: #85c1ff;
            text-decoration: underline;
            font-size: 18px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            .svgI {
              color: #000;
            }
          }
        }
      }
    }
  }
  .dashboard-chart {
    height: 400px;
    margin-top: 15px;
    background-color: #fff;
    textarea {
      height: 95%;
    }
  }
}
</style>
