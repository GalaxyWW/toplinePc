<template>
  <div class="appasider">
      <!-- 项目的logo -->
      <div class="logo">
        <img src="./logo.png" alt="">
      </div>
      <!-- 导航菜单栏 -->
      <!-- el-menu: 管理所有菜单栏的选项   default-active: 默认选中 @open:展开导航事件  @close: 关闭导航事件 -->
      <!-- background-color: 导航栏背景颜色  text-color: 导航中文字颜色    active-text-color: 导航中被选中字体的颜色 -->
      <!-- :router: 开启路由模式  把index当path路由跳转  unique-opened: 只保持一个列表打开 -->
      <el-menu :router='true' :unique-opened='true' default-active="2" class="el-menu-vertical-demo"  background-color="#353b4e" text-color="#ccc" active-text-color="#409eff">
     <!-- el-menu-item: 直接添加导航(没有二级导航)  index: 唯一性标识 -->
        <el-menu-item index='/home'>
          <span slot="title">首页</span>
        </el-menu-item>
     <!-- el-submenu: 一级下面还有二级 -->
        <el-submenu index='2'>
          <template slot="title">
            <span>内容管理</span>
          </template>
          <el-menu-item index='/article/publish'>
            <span slot="title">发布文章</span>
          </el-menu-item>
          <el-menu-item index='/article/list'>
            <span slot="title">内容列表</span>
          </el-menu-item>
          <el-menu-item index='/comment'>
            <span slot="title">评论列表</span>
          </el-menu-item>
          <el-menu-item index='/material'>
            <span slot="title">素材管理</span>
          </el-menu-item>
        </el-submenu>
        <!-- el-submenu: 一级下面还有二级 -->
         <el-submenu index='3'>
          <template slot="title">
            <span>粉丝管理</span>
          </template>
          <el-menu-item index='3.1'>
            <span slot="title">图文数据</span>
          </el-menu-item>
          <el-menu-item index='3.2'>
            <span slot="title">粉丝概况</span>
          </el-menu-item>
          <el-menu-item index='3.3'>
            <span slot="title">粉丝画像</span>
          </el-menu-item>
          <el-menu-item index='3.4'>
            <span slot="title">粉丝列表</span>
          </el-menu-item>
        </el-submenu>
        <el-menu-item index='/user/center'>
          <span slot="title">账号信息</span>
        </el-menu-item>
      </el-menu>
  </div>
</template>

<script>
export default {

}
</script>

<style lang='less' scoped>
.logo {
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #333;
  img {
    width: 120px;
  }
}
</style>
