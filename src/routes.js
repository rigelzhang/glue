//import Vue from 'vue'
//import Router from 'vue-router'
//import HelloWorld from './components/HelloWorld'
import Home from './views/Home.vue'
import Cquery from './views/userInfo/customerQuery.vue'
import Main from './views/Main.vue'
import Atest from './views/afReport/Page5.vue'

 let routes = [
    // {
    //   path: '/',
    //   name: 'HelloWorld',
    //   component: HelloWorld
    // },
   {
     path: '/',
     component: Home,
     name: '用户信息',
     iconCls: 'el-icon-message',//图标样式class
     children: [
        { path: '/main', component: Main, name: '主页', hidden: true },
       // { path: '/table', component: Table, name: 'Table' },
       // { path: '/form', component: Form, name: 'Form' },
       // { path: '/user', component: user, name: '列表' },
       {path:'/query',component: Cquery,name:"查询参数"}
     ]
   },
   {
     path: '/',
     component: Home,
     name: '反欺诈查询',
     iconCls: 'el-icon-message',//图标样式class
     children: [
       { path: '/main', component: Main, name: '主页', hidden: true },
       { path: '/page', component: Atest, name: '反欺诈测试' },
       //
     ]
   },

  ];
export default  routes;
