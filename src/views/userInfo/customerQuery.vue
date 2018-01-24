<template>
  <section>
    <!--查询表单-->
  <el-col :span="8" offset="1" style="padding-bottom: 0px; margin-top:30px;">
    <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
      <!--开始自我验证-->
      <el-form-item label="客户姓名" prop="name">
        <el-input type="text" v-model="ruleForm2.name" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="电话" prop="phone">
        <el-input v-model="ruleForm2.phone" type="tel"></el-input>
      </el-form-item>
      <el-form-item label="身份证号码" prop="identity">
        <el-input v-model="ruleForm2.identity" ></el-input>
      </el-form-item>
      <el-col :offset="7">
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm2')">查询</el-button>
      </el-form-item>
      </el-col>
    </el-form>
  </el-col>
    <el-col :span="22" offset="1">
    <el-table
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
        prop="username"
        label="客户姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="mobile"
        label="手机号"
        width="180">
      </el-table-column>
      <el-table-column
        prop="customer_id"
        label="身份证号">
      </el-table-column>
      <el-table-column
        prop="customer_no"
        label="客户号">
      </el-table-column>
      <el-table-column
        prop="acct_no"
        label="贷款账号">
      </el-table-column>
        <el-table-column
          prop="prod_name"
          label="产品名称">
      </el-table-column>
        <el-table-column
          prop="allocation_amt"
          label="贷款金额">
        </el-table-column>
      <el-table-column
        prop="status"
        label="状态">
      </el-table-column>
    </el-table>
    </el-col>
  </section>
</template>
<script>
  import ElCol from "element-ui/packages/col/src/col";
  import {fetch} from "../../reglue";
  import reglue from "../../reglue"
  var a=null;
//  import axios from 'axios'
//  axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
//  axios.defaults.baseURL = 'http://127.0.0.1:8084/glue';
  export default {
    components: {ElCol},
    data() {
      // 验证名字正则表达式

      var validateName = (rule, value, callback) => {
        var regExp=/^[\u4e00-\u9fa5]{2,4}$/;
        if (value === '') {
          callback();
        }else if(regExp.test(value) === false){
          callback(new Error('请输入正确的名字'))
        } else {
          callback();
        }
      };
      //验证电话号码正则表达式
      var validateTel = (rule, value, callback) => {
        var regExp = /^1[3|5|8|7][0-9]{9}$/;
        if (value === '' ) {
          callback(new Error('请输入手机号码'));
        }else if (regExp.test(value) === false) {
          callback(new Error('请输入正确手机号码'))
        } else {
          callback();
        }
      };
      //验证身份正号码正则表达式
      var validateIdentity = (rule, value, callback) => {
        var regExp = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
        if (value === '') {
          callback();
        }else if (regExp.test(value) === false) {
          callback(new Error('请输入正确的身份证号码'))
        } else {
          callback();
        }
      };

      return {
        ruleForm2: {
          name: '',
          phone:'',
          identity:'',
        },
        rules2: {
          identity:[{validator:validateIdentity,trigger:'blur'}] ,
          phone:[{
            validator:validateTel,trigger:'blur'}],
          name:[{
            validator:validateName,trigger:'blur'}],
        },
        phoneI:"",
        tableData: null,
        rigel:[{"allocation_amt":"10000","customer_no":"10000001998","acct_no":"贷款账号1",
          "mobile":"13500000001","customer_id":"440101198511110987","prod_name":"产品名称1",
          "username":"测试用户名1","status":"正常"},{"allocation_amt":"20000","customer_no":"10000001999",
          "acct_no":"贷款账号2","mobile":"13500000002","customer_id":"440101198511110988","prod_name":"产品名称2",
          "username":"测试用户名2","status":"正常"},{"allocation_amt":"30000","customer_no":"10000002000","acct_no":"贷款账号3","mobile":
          "13500000003","customer_id":"440101198511110989","prod_name":"产品名称3","username":"测试用户名3","status":"正常"}]
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
         reglue.glueApi('/cust').then(function (data) {
            //alert(data);
           a=data;
            console.log(data);
           //this.tableData=data;
         });
         this.tableData=a;
         console.log(a);
//
//         alert(JSON.stringify(this.tableData));
         //alert(typeof reglue.glueApi('/cust'));
            //alert(typeof reglue.glueApi('/cust').data)
            //alert(typeof reglue.glueApi('/cust'))
//            this.$axios.post('/cust')
//              .then(response => {
//                alert(JSON.stringify( response.data));
//                this.tableData = response.data;
//                console.log(response.data);
//              }).catch(error => { this.tableData = 'There was an error :' + error.message}
//            )
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
    }

  }
</script>
<style>

</style>
