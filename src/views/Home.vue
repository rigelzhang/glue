<template>
<el-container>
  <el-header style="height: 100px;">
    <el-row :gutter="20">
      <el-col type="flex" class="row-bg":span="6" :offset="0">
        <img class="img" src="../assets/中邮logo.png">
      </el-col>
    </el-row>
  </el-header>
  <el-container>
    <el-aside width="200px" >
      <!--导航菜单-->
      <el-menu :default-active="$route.path" class="el-menu-vertical-demo" @open="handleopen" @close="handleclose" @select="handleselect"
               unique-opened router v-show="!collapsed">
        <template v-for="(item,index) in $router.options.routes" v-if="!item.hidden">
          <el-submenu :index="index+''" v-if="!item.leaf">
            <template slot="title"><i :class="item.iconCls"></i>{{item.name}}</template>
            <el-menu-item v-for="child in item.children" :index="child.path" :key="child.path" v-if="!child.hidden">{{child.name}}</el-menu-item>
          </el-submenu>
          <el-menu-item v-if="item.leaf&&item.children.length>0" :index="item.children[0].path"><i :class="item.iconCls"></i>{{item.children[0].name}}</el-menu-item>
        </template>
      </el-menu>
      <!--导航菜单-折叠后-->
      <ul class="el-menu el-menu-vertical-demo collapsed" v-show="collapsed" ref="menuCollapsed">
        <li v-for="(item,index) in $router.options.routes" v-if="!item.hidden" class="el-submenu item">
          <template v-if="!item.leaf">
            <div class="el-submenu__title" style="padding-left: 20px;" @mouseover="showMenu(index,true)" @mouseout="showMenu(index,false)"><i :class="item.iconCls"></i></div>
            <ul class="el-menu submenu" :class="'submenu-hook-'+index" @mouseover="showMenu(index,true)" @mouseout="showMenu(index,false)">
              <li v-for="child in item.children" v-if="!child.hidden" :key="child.path" class="el-menu-item" style="padding-left: 40px;" :class="$route.path==child.path?'is-active':''" @click="$router.push(child.path)">{{child.name}}</li>
            </ul>
          </template>
          <template v-else>
        <li class="el-submenu">
          <div class="el-submenu__title el-menu-item" style="padding-left: 20px;height: 56px;line-height: 56px;padding: 0 20px;" :class="$route.path==item.children[0].path?'is-active':''" @click="$router.push(item.children[0].path)"><i :class="item.iconCls"></i></div>
        </li>
        </template>
</li>
</ul>

    </el-aside>
    <!--<el-main>-->
      <!--<section class="content-container">-->
        <!--<div class="grid-content bg-purple-light">-->
          <!--<el-col :span="24" class="breadcrumb-container">-->
            <!--<strong class="title">{{$route.name}}</strong>-->
            <!--<el-breadcrumb separator="/" class="breadcrumb-inner">-->
              <!--<el-breadcrumb-item v-for="item in $route.matched" :key="item.path">-->
                <!--{{ item.name }}-->
              <!--</el-breadcrumb-item>-->
            <!--</el-breadcrumb>-->
          <!--</el-col>-->
          <!--<el-col :span="24" class="content-wrapper">-->
            <!--<transition name="fade" mode="out-in">-->
              <!--<router-view></router-view>-->
            <!--</transition>-->
          <!--</el-col>-->
        <!--</div>-->
      <!--</section>-->
      <!--<router-view ></router-view>-->
    <!--</el-main>-->
<section class="content-container">
  <div class="grid-content bg-purple-light">
    <!--<el-col :span="24" class="breadcrumb-container">-->
      <!--<strong class="title">{{$route.name}}</strong>-->
      <!--<el-breadcrumb separator="/" class="breadcrumb-inner">-->
        <!--<el-breadcrumb-item v-for="item in $route.matched" :key="item.path">-->
          <!--{{ item.name }}-->
        <!--</el-breadcrumb-item>-->
      <!--</el-breadcrumb>-->
    <!--</el-col>-->
    <el-col :span="24" class="content-wrapper">
      <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </el-col>
  </div>
</section>
  </el-container>
</el-container>
</template>
<script>
import lg from './../assets/中邮logo.png'
export default {
  data () {

    },
  methon: {
    collapse:function(){
      this.collapsed=!this.collapsed;
    },
    showMenu(i,status){
      this.$refs.menuCollapsed.getElementsByClassName('submenu-hook-'+i)[0].style.display=status?'block':'none';
    }
  }

}
</script>
<style lang="scss" >
  .el-menu{
    background-color:#2B313E;
  }
  .el-submenu__title{
    color: #C0C0C0;;
  }
  .el-submenu__title:hover{
    color:rgb(255,168,0);
  }
  .el-menu-item{
    color: #C0C0C0;
  }
  .el-menu-item:hover{
    color: rgb(255,168,0);
  }
  .el-header {
    background-color: #B3C0D1;
    color: #C0C0C0;
    text-align: center;
    line-height: 100px;
  }
  .img{
    height:50%;
    width: 70%;
    text-align: center;
    vertical-align: middle;
  }

//日后再改
    .el-aside {
      background-color: #2B313E;
      color: #333;
      text-align: center;
      line-height: 200px;
      height: 720px;
    }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }

  /*body > .el-container {*/
    /*margin-bottom: 40px;*/
  /*}*/

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
</style>
