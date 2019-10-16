<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>图片管理</span>
    </div>
    <div class="itemBtn">
      <div class="items">
        <el-radio-group v-model="myradio" size="mini" @change="changeAll">
          <el-radio-button label="全部"></el-radio-button>
          <el-radio-button label="收藏"></el-radio-button>
        </el-radio-group>
      </div>
      <div class="upload">
        <el-button @click="uploadMat" type="primary" plain size="small">上传图片</el-button>
      </div>
    </div>
    <!-- 放置素材 -->
    <el-row :gutter="20" v-loading="loading">
      <el-col :span="6" v-for="(item, index) in matericalList" :key="index">
        <el-card class="mycard">
          <img class="myimg" :src="item.url" alt />
          <div class="mybtns">
            <el-button
              @click="collect(true, item.id)"
              v-if="item.is_collected === false"
              type="text"
            >
              <i class="el-icon-star-off"></i>
            </el-button>
            <el-button
              @click="collect(false, item.id)"
              v-if="item.is_collected === true"
              type="text"
            >
              <i class="el-icon-star-on"></i>
            </el-button>
            <el-button @click="delMat(item.id)" type="text">
              <i class="el-icon-delete"></i>
            </el-button>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <!-- 分页 -->
    <el-pagination
      @current-change="pageChange"
      @next-click="nextClick"
      @prev-click="perClick"
      background
      layout="prev, pager, next"
      :total="total_count"
    ></el-pagination>
    <!-- 弹出的面板 -->
    <!-- visible.sync: 控制当前面板的显示与隐藏 -->
    <el-dialog :center="true" title="上传图片" :visible.sync="dialogFormVisible">
      <el-upload
        class="avatar-uploader"
        action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
        :headers= 'headers'
        name= 'image'
        :show-file-list="false"
        :on-success='uploadsuccess'>
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="closePanle">关闭</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
let userInfo = JSON.parse(window.localStorage.getItem('userInfo'))
export default {
  data () {
    return {
      myradio: '全部',
      matericalList: [],
      // 控制面板的显示与隐藏
      dialogFormVisible: false,
      // 上传组件中的图片地址
      imageUrl: '',
      // 上传的请求头
      headers: {
        'Authorization': `Bearer ${userInfo.token}`
      },
      // 评论的的总条数
      total_count: 0,
      // 分页的页码
      page: 1,
      // 每页的条数
      per_page: 20,
      // 加载状态
      loading: false

    }
  },
  methods: {
    // 得到素材
    // collect: true:收藏的数据  false: 全部数据
    getMatericalList (collect) {
      this.loading = true
      this.$http({
        url: '/user/images',
        method: 'GET',
        params: {
          collect: collect
        }
      }).then(res => {
        console.log(res)
        this.loading = false
        this.total_count = res.total_count
        this.matericalList = res.results
      })
    },
    changeAll (params) {
      // 给全部绑定事件
      if (params === '全部') {
        // 加载全部数据
        this.getMatericalList(false)
      } else {
        this.getMatericalList(true)
      }
    },
    // 收藏或取消收藏
    collect (bool, id) {
      this.$http({
        url: `/user/images/${id}`,
        method: 'PUT',
        data: {
          collect: bool
        }
      }).then(res => {
        this.$message({
          message: res.collect ? '收藏成功' : '取消成功',
          type: 'success'
        })
        // 重新获取数据   根据 myradio 中的数据渲染
        if (this.myradio === '全部') {
          this.getMatericalList(false)
        } else {
          this.getMatericalList(true)
        }
      })
    },
    // 删除素材
    delMat (id) {
      this.$http({
        url: `/user/images/${id}`,
        method: 'DELETE'
      }).then(res => {
        // 提示用户删除成功
        this.$message({
          message: '删除成功',
          type: 'success'
        })
        // 重新获取数据   根据 myradio 中的数据渲染
        if (this.myradio === '全部') {
          this.getMatericalList(false)
        } else {
          this.getMatericalList(true)
        }
      })
    },
    // 点击上传素材是触发
    uploadMat () {
      this.dialogFormVisible = true
    },
    // 上传图片成功是触发
    uploadsuccess (response, file, fileList) {
      this.imageUrl = response.data.url
    },
    // 关闭面板是触发
    closePanle () {
      // 关闭面板
      this.dialogFormVisible = false
      // 提示用户上传成功
      this.$message({
        message: '上传成功',
        type: 'success'
      })
      this.imageUrl = ''
      // 刷新数据
      this.getMatericalList(false)
    },
    // 点击上一页会触发
    perClick () {
      // 先将当前页减一
      this.page = this.page--
      // 然后重启请求数据
      this.getMatericalList()
    },
    // 点击下一页会触发
    nextClick () {
      // 先将当前页加一
      this.page = this.page++
      // 然后重启请求数据
      this.getMatericalList()
    },
    // 当点击当前页码时会触发
    pageChange (page) {
      // 将页码赋值给this.page
      this.page = page
      // 重新请求数据
      this.getMatericalList()
    }
  },
  created () {
    // 加载素材数据
    this.getMatericalList()
  }
}
</script>

<style scoped lang='less'>
.itemBtn {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.mycard {
  .myimg {
    width: 100%;
    height: 250px;
  }
  .mybtns {
    display: flex;
    justify-content: space-around;
    i {
      font-size: 30px;
    }
  }
}
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader {
    text-align: center
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 60px;
    color: #4411eb;
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
