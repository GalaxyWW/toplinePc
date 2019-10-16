<template>
  <div class="appheader">
    <!-- 一行 -->
    <el-row>
      <!-- 列 -->
      <el-col :span='14'>
        江苏传智播客教育科技股份有限公司
      </el-col>
       <el-col :offset='8' :span='2'>
        <el-dropdown trigger='click'>
          <span class="el-dropdown-link userinfp">
            <img class="icon" :src="userInfo.photo" alt="">
            <span class="name">{{ userInfo.name }}</span>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人信息</el-dropdown-item>
          <el-dropdown-item>git地址</el-dropdown-item>
          <el-dropdown-item>退出</el-dropdown-item>
        </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      userInfo: {}
    }
  },
  // 生命周期函数creatrd
  created () {
    // 网页刚打开时,从localstorage中取出userInfo   parse: json转js对象
    this.userInfo = JSON.parse(window.localStorage.getItem('userInfo'))
  }
}
</script>

<style lang='less' scoped>
  .userinfp {
    display: flex;
    align-items: center;
    .icon {
      width: 35px;
      height: 35px;
      border-radius: 50%;
      margin-right: 10px;
    }
  }
  .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }
</style>
