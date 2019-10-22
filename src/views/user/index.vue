<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>用户信息</span>
    </div>
    <el-row :gutter="30">
      <el-col :span="12">
        <el-form :model="user" status-icon label-width="100px" class="demo-ruleForm">
          <el-form-item label="用户名">
            <el-input type="text" v-model="user.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="个性签名">
            <el-input type="text" v-model="user.intro" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="头条账号">
            <el-input type="text" disabled v-model="user.id" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="手机号">
            <el-input type="text" disabled v-model="user.mobile" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input type="text" v-model="user.email" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button @click="updateUser">修改</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="12">
        <el-upload
          class="avatar-uploader"
          action='www.baidu.com'
          :http-request='uploadImg'
          :show-file-list="false">
          <img :src="user.photo" class="avatar" />
          <!-- <i class="el-icon-plus avatar-uploader-icon"></i> -->
        </el-upload>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      user: {

      }
    }
  },
  methods: {
    // 获取用户信息
    getUserInfo () {
      this.$http({
        url: '/user/profile',
        method: 'GET'
      }).then(res => {
        this.user = res
      })
    },
    // 将修改后的数据提交的服务器
    updateUser () {
      this.$http({
        url: '/user/profile',
        method: 'PATCH',
        data: {
          name: this.user.name,
          intro: this.user.intro,
          email: this.user.email
        }
      }).then(res => {
        this.$message({
          message: '更新成功',
          type: 'success'
        })
        // 将信息更新到vuex中
        // 调用vuex中的mutations 中的方法来修改userInfo
        this.$store.commit('changeUserInfo', res)
      })
    },
    uploadImg (params) {
      // 上传图片   默认是不支持图片上传的
      // 如果要支持图片的上传,需要将参数通过formData传递
      // 将参数转为formData对象
      let fd = new FormData()
      fd.append('photo', params.file)
      this.$http({
        url: 'http://ttapi.research.itcast.cn/mp/v1_0/user/photo',
        method: 'PATCH',
        data: fd
      }).then(res => {
        this.user.photo = res.photo
        this.$store.commit('changeUserInfoImg', res.photo)
      })
    }
  },
  created () {
    // 得到用户信息
    this.getUserInfo()
  }
}
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 40px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
