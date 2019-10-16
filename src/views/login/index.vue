<template>
  <!-- 登录页面 -->
  <div class="login">
    <div class="login-warp">
      <!-- logo区域 -->
      <div class="loginlogo">
        <img src="./ia_100000000.png" alt />
      </div>
      <!-- el-form:管理所有表单元素的父容器 ref: Vue中提供操作 dom的方式 model:表单元素中的数据源 -->
      <el-form ref="form" :model="form" :rules="rules">
        <!-- el-form-item:表单域 -->
        <el-form-item prop="mobile">
          <el-input v-model="form.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <!-- 第一种解决一行间距问题 -->
        <!-- <div class="myitem">
           <el-input v-model="form.code" placeholder="请输入验证码"></el-input>
            <el-button class="itembtn">获取验证码</el-button>
        </div>-->
        <el-form-item prop="code">
          <el-row>
            <el-col :span="14">
              <el-input v-model="form.code" placeholder="请输入验证码"></el-input>
            </el-col>
            <el-col :span="8" :offset="2">
              <!-- ! 隐式转换取反 -->
              <el-button
                :disabled="!!timer"
                class="colBdtn"
                @click="getCode"
              >{{ timer ? `${codeTime}秒后重新获取`:'获取验证码'}}</el-button>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item prop="read" class="xieYi">
          <el-checkbox v-model="form.read" >
            我已阅读并同意
            <a href="#">用户协议</a>和
            <a href="#">隐私条款</a>
          </el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="login" :loading="loginloading" class="loginbtn">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
// 导入 axios  这个不需要了,因为已经把axios设置到了Vue原型中了
// import axios from 'axios'
export default {
  data () {
    return {
      // 表单的参数
      form: {
        mobile: '13911111111',
        code: '246810',
        read: false
      },
      //   控制loading的显示
      loginloading: false,
      // 定义表单验证规则
      rules: {
        mobile: [
          // required:必选项   trigger:触发时机   blur:失去焦点时
          { required: true, message: '请输入手机号码', trigger: 'blur' },
          { min: 11, max: 11, message: '长度在11个字符', trigger: 'blur' }
        ],
        code: [
          // required:必选项   trigger:触发时机  blur:失去焦点时
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { min: 6, max: 6, message: '长度在6个字符', trigger: 'blur' }
        ],
        read: [
          { required: true, message: '请先阅读用户协议', trigger: 'change' },
          // 正则限制结果为true
          { pattern: /true/, message: '请先阅读用户协议', trigger: 'change' }
        ]
      },
      // 倒计时的时间
      codeTime: 60,
      // 设置一个定时器
      timer: null
    }
  },
  methods: {
    // 用户登录表单验证方法
    login () {
      //   得到 el-item 元素
      // validate:这个方法是验证当前表单元素中所有的规则
      this.$refs['form'].validate(valid => {
        // 如果 valid 为true,说明验证通过,为false则不通过
        if (valid) {
          // 将数据提交到服务器
          // 调用请求数据的方法
          this.submitData()
        } else {
          // 结束当前方法
        }
      })
    },
    // 提交数据的方法
    submitData () {
      // 将加载状态设置为true
      this.loginloading = true
      // 发送请求到服务器
      this.$http({
        url: '/authorizations',
        method: 'POST',
        data: this.form
      }).then(res => {
        console.log(res)
        // 等到用户信息
        // 响应拦截器以设置
        // let userInfo = res.data.data
        let userInfo = res
        // 将用户的信息保存到 localStorage 中    JSON.stringify: 转换模式  js转json
        window.localStorage.setItem('userInfo', JSON.stringify(userInfo))
        // 只要进入这个方法说明登录成功
        this.$message({
          message: '登录成功',
          type: 'success'
        })
        // 请求完成后,将loginloading改为false
        this.loginloading = false
        this.$router.push('/')
      }).catch(err => {
        console.log(err)
        this.$message.error('手机号码或验证码错误')
      })
    },
    getCode () {
      // 获取 form 表单
      // validateField : 验证的方法,传两个参数
      // 第一个传要验证的字段,第二个传验证后的回调函数   errMsg:验证不通过后提示的文本
      this.$refs['form'].validateField('mobile', errMsg => {
        if (errMsg.trim().length > 0) {
          // 验证不通过
          return
        }
        // 验证通过的:开启计时器
        this.timer = setInterval(() => {
          // 时间需要减少
          this.codeTime--
          // 当时间为0时,需要将定时器清除
          if (this.codeTime <= 0) {
            // 清除定时器
            clearTimeout(this.timer)
            // 重置时间
            this.codeTime = 0
            // 将定时器重置为null
            this.timer = null
          }
        }, 1000)
      })
    }
  }
}
</script>

<style lang='less'>//scoped
.login {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url("./ia_100000001.jpg");
  .login-warp {
    background-color: #fff;
    padding: 30px;
    min-width: 450px;
    .loginlogo {
      text-align: center;
      img {
        width: 150px;
        margin-bottom: 20px;
      }
    }
    .loginbtn {
      width: 100%;
    }
    .myitem {
      display: flex;
      justify-content: space-between;
      .itembtn {
        margin-left: 20px;
      }
    }
    .colBdtn {
      width: 100%;
    }
    .xieYi {
      .el-checkbox__label {
        color: #3d3535;
      }
      a {
        color: blue;
        text-decoration: none;
      }
    }
  }
}
</style>
