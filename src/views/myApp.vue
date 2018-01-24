<template>
  <div class="app-container">

    <div class="header">
      <el-row>
        <el-alert
          title="用户应用概览"
          type="info"
          description="查看当前用户所有的应用信息"
          show-icon>
        </el-alert>
      </el-row>
    </div>
    <br/>
    <div class="app-main">
      <div class="app-main-chart">
        <el-row :gutter="20">
          <el-col :span="6">
            <span>应用状态信息(是否在运行)</span>
            <div class="grid-content bg-purple">
              <doughnut :chart-data="appStatusDoughnutData "></doughnut>
            </div>
          </el-col>
          <el-col :span="6">
            <span>应用资源使用情况</span>
            <div class="grid-content bg-purple">
              <bar-chart :chart-data="appResourcesStaticsBarData"></bar-chart>
            </div>
          </el-col>
          <el-col :span="6">
            <span>我的资源使用情况</span>
            <div class="grid-content bg-purple">
              <line-chart :chart-data="appDuarationStaticsLineData"></line-chart>
            </div>
          </el-col>

          <el-col :span="6">
            <span>应用资费信息</span>
            <div class="grid-content bg-purple">
              <pie-chart :chart-data="appMoneyStaticsPieData"></pie-chart>
            </div>
          </el-col>
        </el-row>

      </div>
      <br/>
      <div class="app-main-search" style="margin-top: 15px;">
        <el-input placeholder="请输入内容" v-model="searchCondition" class="input-with-select">
          <el-select v-model="searchType" slot="prepend" placeholder="请选择" style="width: 120px">
            <el-option label="应用名称" value="appName"></el-option>
            <el-option label="模板名称" value="appTemplateType"></el-option>
            <el-option label="模板类型" value="appType"></el-option>
          </el-select>
          <el-button slot="append" @click="conditionSearch"><span><i class="fa fa-search" aria-hidden="true"></i>
          </span>
          </el-button>
        </el-input>
      </div>
      <br/>
      <div class="app-main-tables ">
        <el-row>
          <el-col :span="24">
            <div class="grid-content bg-purple-dark">

              <el-table
                :default-sort="{prop: 'appcreatetime', order: 'descending'}"
                :stripe="true"
                :border="true"
                :data="myAppsData"
                tooltip-effect="dark"
                style="width: 100%">
                <el-table-column
                  type="selection"
                  width="55">
                </el-table-column>
                <el-table-column
                  prop="appname"
                  label="应用名称"
                  width="180">
                </el-table-column>
                <el-table-column
                  prop="appcreatetime"
                  label="应用创建日期"
                  sortable
                  :formatter="dateFormat"
                  width="180">
                </el-table-column>
                <el-table-column
                  prop="appimages"
                  label="应用镜像">
                </el-table-column>
                <el-table-column
                  prop="appstate"
                  label="应用状态">
                </el-table-column>
                <el-table-column
                  prop="appResource"
                  label="应用资源">
                </el-table-column>
                <el-table-column
                  prop="appuser"
                  label="应用所属用户">
                </el-table-column>
                <el-table-column
                  prop="appMoney"
                  label="当前资费">
                </el-table-column>
                <el-table-column
                  prop="appOperate"
                  label="可执行操作">
                  <template slot-scope="scope">
                    <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                    <el-button type="text" size="small">编辑</el-button>
                  </template>
                </el-table-column>

              </el-table>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">


            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[10, 25, 50, 100]"
              :page-size="currentPageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="totalSize">
            </el-pagination>
          </el-col>

        </el-row>
      </div>
    </div>


  </div>
</template>

<script>
  import ElRow from 'element-ui/packages/row/src/row'
  import Icon from '../../../node_modules/vue-awesome/components/Icon.vue'
  import LineChart from '../../chartjs/LineChart'
  import PieChart from '../../chartjs/PieChart'
  import BarChart from '../../chartjs/BarChart'
  import BubbleChart from '../../chartjs/BubbleChart'
  import Doughnut from '../../chartjs/Doughnut'
  import PolarAreaChart from '../../chartjs/PolarAreaChart'
  import RadarChart from '../../chartjs/RadarChart'
  import ScatterChart from '../../chartjs/ScatterChart'
  import { getToken, removeToken, setToken, getCurrentUser } from '@/utils/auth'

  import axios from 'axios'
  import moment from 'moment'     //时间处理
  export default {
    components: {
      Icon,
      ElRow,
      LineChart,
      PieChart,
      BarChart, BubbleChart, Doughnut, PolarAreaChart, RadarChart, ScatterChart
    },
    data() {
      return {
        searchCondition: '',
        searchType: '',
        totalSize: 10,
        currentPage: 1,
        currentPageSize: 10,
        datacollection: null,
        activeNames: ['1'],
        user: '',
        myAppsData: null,
        appStatusDoughnutData: null,
        appResourcesStaticsBarData: null,
        appMoneyStaticsPieData: null,
        appDuarationStaticsLineData: null,
        tempsPageTableData: ''

      }
    },
    methods:{
      conditionSearch () {
        let param = new URLSearchParams()
        param.append('user', getCurrentUser())//解决axios 传值到Spring后台时无法获取参数的问题
        param.append('SearchType', this.searchType)
        param.append('SearchCondition', this.searchCondition)
        //  param.append('user', 'duliang')   //解决axios 传值到Spring后台时无法获取参数的问题
        this.$axios.post('/k8s/apps/conditionSearch', param)
          .then(response => {
            console.log(response.data)
            this.myAppsData = response.data.data
            console.log(response.data)
          }).catch(error => { this.myAppsData = 'There was an error :' + error.message}
        )
      },
      appStatusRunningDought () {
        let param = new URLSearchParams()
        param.append('user', getCurrentUser())//解决axios 传值到Spring后台时无法获取参数的问题

        this.$axios.post('/k8s/apps/status/running', param)
          .then(response => {
            this.appStatusDoughnutData = response.data.data
          }).catch(error => { this.appStatusDoughnutData = 'There was an error :' + error.message}
        )
      },
      appResourceStaticBar () {
        let param = new URLSearchParams()
        let currentUser = getCurrentUser()
        param.append('user', currentUser)   //解决axios 传值到Spring后台时无法获取参数的问题
        this.$axios.post('/k8s/apps/status/resources', param)
          .then(response => {
            this.appResourcesStaticsBarData = response.data.data
          }).catch(error => { this.appResourcesStaticsBarData = 'There was an error :' + error.message}
        )
      },
      appDuarationStaticLine () {
        let param = new URLSearchParams()
        let currentUser = getCurrentUser()
        param.append('user', currentUser)  //解决axios 传值到Spring后台时无法获取参数的问题
        this.$axios.post('/k8s/apps/status/durations', param)
          .then(response => {
            this.appDuarationStaticsLineData = response.data.data
          }).catch(error => { this.appDuarationStaticsLineData = 'There was an error :' + error.message}
        )
      },
      appMoneyStaticPie () {
        let param = new URLSearchParams()
        let currentUser = getCurrentUser()
        param.append('user', currentUser)  //解决axios 传值到Spring后台时无法获取参数的问题
        this.$axios.post('/k8s/apps/status/money', param)
          .then(response => {
            this.appMoneyStaticsPieData = response.data.data
          }).catch(error => { this.appMoneyStaticsPieData = 'There was an error :' + error.message}
        )

      },
      handleSizeChange (val) {
        this.currentPageSize = val
        this.myAppsData = this.tempsPageTableData.slice(this.currentPageSize * (this.currentPage - 1), this.currentPageSize * (this.currentPage))
      },
      handleCurrentChange (val) {
        this.currentPage = val
        let pageSize = this.currentPageSize
        this.myAppsData = this.tempsPageTableData.slice((pageSize) * (val - 1), val * (pageSize))
      },
    },

    created () {
      this.appStatusRunningDought()
      this.appResourceStaticBar()
      this.appDuarationStaticLine()
      this.appMoneyStaticPie()
      console.log('-----current user token', getToken())
      this.$axios.post('/k8s/apps/search')
        .then(response => {
          this.myAppsData = response.data.data
          this.tempsPageTableData = this.myAppsData
          this.totalSize = this.myAppsData.length
          console.log(response.data.data)
        }).catch(error => { this.myAppsData = 'There was an error :' + error.message}
      )
    },
  }
</script>
<style scoped>
  .wrapper{
    width: 800px;
    margin: 30px auto;
  }
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>
