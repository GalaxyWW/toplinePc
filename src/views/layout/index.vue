<template>
  <div class="layout">
    <el-container>
      <el-aside width="200px">
          <layoutasider />
      </el-aside>
      <el-container>
      <el-header>
        <layoutheader />
      </el-header>
        <el-main>
          <!-- 将来请求路径时,优先加载layout -->
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
// 导入两个布局子组件
import layoutasider from '../layout/components/layoutAsider'
import layoutheader from '../layout/components/layoutHeader'

export default {
  components: {
    layoutasider,
    layoutheader
  }
}
</script>

<style lang='less' scoped>
.layout {
    height: 100%;
    // $>去掉空格
    &>.el-container {
        height: 100%;
    }
}
.el-aside {
  background-color: #323745;
  color: #333
}
.el-header {
    background-color: #fff;
    color: #333;
    line-height: 60px;
  }
  .el-main {
    background-color: #eee;
    color: #333;
  }
</style>
