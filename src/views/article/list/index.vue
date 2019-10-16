<template>
  <div>
    <!-- 顶部搜索选项区域 -->
    <!-- el-card : 卡片 -->
    <el-card class="box-card">
      <!-- la[iande头部] -->
      <div slot="header" class="clearfix">
        <span>全部图文</span>
      </div>
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="文章状态 :">
            <el-radio v-model="status" label="">全部</el-radio>
            <el-radio v-model="status" label="0">草稿</el-radio>
            <el-radio v-model="status" label="1">待审核</el-radio>
            <el-radio v-model="status" label="2">待审核通过</el-radio>
            <el-radio v-model="status" label="3">待审核失败</el-radio>
        </el-form-item>
        <el-form-item label="频道列表 :">
          <el-select clearable v-model="form.channelid" placeholder="请选择活动区域">
            <!-- el-option: 下拉选项 label: 显示的文本 value: 对应的值   -->
            <el-option v-for="(item,index) in channelsList" :key="index" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="时间选择 :">
          <el-date-picker value-format='yyyy-MM-dd'
            v-model="dateTime" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button @click="searchList">搜索</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 文章显示区域 -->
<el-card class="box-card mycard">
  <div slot="header" class="clearfix">
    <span>共找到{{total_count}}条符合条件的内容</span>
  </div>
   <!-- 表格区域 -->
   <!-- el-table: 表格组件  :data: 指定表格的数据源  -->
  <el-table v-loading='tableLoading' :stripe='true' :border='true' :data="dataList"  style="width: 100%">
    <!-- el-table-column: 表格组件的每一列 label: 当前列的标题  prop: 当前行显示的数据的属性 -->
    <el-table-column align="center" label="图片" width="180">
      <!-- template: 表单将来当前行不是显示prop属性对应的数据,而是显示template的内容 -->
      <!-- 给template 设置 slot-scope="scope" -->
      <!-- 如果在template 中如果需要使用到数据的话,必须通过 slot-scope 属性来使用-->
      <!-- slot-scope : 是当前行的数据源 -->
      <template slot-scope="scope">
        <img class="myimg" :src="scope.row.cover.images[0]" alt="">
      </template>
    </el-table-column>
    <el-table-column align="center" prop="title" label="标题" width="180">
    </el-table-column>
    <el-table-column align="center" prop="status" label="状态" width="180">
      <template slot-scope="scope">
        <span v-if="scope.row.status === 0">草稿</span>
        <span v-if="scope.row.status === 1">待审核</span>
        <span v-if="scope.row.status === 2">审核通过</span>
        <span v-if="scope.row.status === 3">审核失败</span>
        <span v-if="scope.row.status === 4">已删除</span>
      </template>
    </el-table-column>
    <el-table-column prop="pubdate" label="发布日期" width="180">
    </el-table-column>
    <el-table-column align="center" label="操作">
     <template slot-scope="scope">
        <el-button size="mini" round @click="update(scope.row)"> <i class="el-icon-edit"></i>修改</el-button>
        <el-button size="mini" round @click="delArticle(scope.row)"> <i class="el-icon-delete"></i>删除</el-button>
     </template>
    </el-table-column>
  </el-table>
<!-- 分页区域 -->
<!-- el-pagination: 分也组件  layout: 分页组件的布局  total: 总页数 -->
<el-pagination :disabled='tableLoading' @current-change='pageChange' @next-click='nextClick' @prev-click='perClick' background layout="prev, pager, next" :total="total_count">
</el-pagination>
</el-card>
</div>
</template>

<script>
// 得到token   得到的是字符串,所以需要JSON转换  设置在响应拦截器中
// let userInfo = JSON.parse(window.localStorage.getItem('userInfo'))
export default {
  data () {
    return {
      form: {
        channelid: '',
        resource: ''
      },
      // 开始和结束的时间
      dateTime: [],
      // 保存文章列表数据
      dataList: [],
      // 保存文章的总条数
      total_count: 0,
      // 分页的页码
      page: 1, // 默认第一页
      // 每页的条数
      per_page: 10, // 每页显示10条数据
      // 控制表格的加载效果
      tableLoading: false,
      // 得到频道的数据源
      channelsList: [],
      // 筛选的状态属性
      status: ''
    }
  },
  methods: {
    // 打开页面时,请求文章列表的数据
    getArticleList () {
      // 开启加载动漫
      this.tableLoading = true
      setTimeout(() => {
        this.$http({
          url: '/articles',
          method: 'GET',
          // 如果请求方式是GTE,使用params的方式来传参
          params: {
            page: this.page,
            per_page: this.per_page
            // status: 0, // 草稿
            // channel_id: 3,
            // begin_pubdate: this.dateTime[0], // 开始时间
            // end_pubdate: this.dateTime[1]// 结束时间
          }
        // 设置在响应拦截器中
        // headers: {
        //   Authorization: `Bearer ${userInfo.token}`
        // }
        }).then(res => {
        // 将文章数据保存到dataList里
          this.dataList = res.results
          // 数据的总条数保存到total_count
          this.total_count = res.total_count
          // 关闭加载动漫
          this.tableLoading = false
        })
      }, 500)
    },
    // 点击上一页会触发
    perClick () {
      // 先将当前页减一
      this.page = this.page - 1
      // 然后重启请求数据
      this.getArticleList()
    },
    // 点击下一页会触发
    nextClick () {
      // 先将当前页加一
      this.page = this.page + 1
      // 然后重启请求数据
      this.getArticleList()
    },
    // 当点击当前页码时会触发
    pageChange (page) {
      // 将页码赋值给this.page
      this.page = page
      // 重新请求数据
      this.getArticleList()
    },
    // 删除数据的方法
    delArticle (row) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let url = `/articles/${row.id}`
        // 将数据进行删除
        this.$http({
          url: url,
          method: 'DELETE'
        }).then(res => {
          this.searchList()
          // 提示删除成功
          this.$message({
            message: '删除成功',
            type: 'success'
          })
        })
      })
    },
    // 获取频道数据
    getChannels () {
      // 请求服务器得到数据
      this.$http({
        url: '/channels',
        method: 'GET'
      }).then(res => {
        this.channelsList = res.channels
      })
    },
    // 筛选数据
    searchList () {
      this.tableLoading = true
      // 创建一个参数对象
      // 如果我们的参数在这里存在就直接添加到对象中,不存在,就不添加
      let paramsObj = {}
      // 判断是否存在状态
      if (this.status) {
        paramsObj.status = this.status
      }
      // 判断是否存在频道数据
      if (this.form.channelid) {
        paramsObj.channel_id = this.form.channelid
      }
      // 判断是否存在时间
      if (this.dateTime != null && this.dateTime.length !== 0) {
        paramsObj.begin_pubdate = this.dateTime[0]
        paramsObj.end_pubdate = this.dateTime[1]
      }

      // 得到所有相关的属性
      // 状态: status  频道: form.channelid  时间: dateTime
      this.$http({
        url: '/articles',
        method: 'GEt',
        params: {
          page: this.page,
          per_page: this.per_page,
          // ... 展开运算符
          ...paramsObj
        }
      }).then(res => {
        // 将数据保存
        this.dataList = res.results
        this.total_count = res.total_count
        this.tableLoading = false
      })
    },
    // 进入修改文章页面
    update (row) {
      this.$router.push(`/article/edit/${row.id}`)
    }
  },
  created () {
    // 得到文章列表
    this.getArticleList()
    // 得到频道数据
    this.getChannels()
  }
}
</script>

<style lang='less'>
.mycard {
  margin-top: 20px;
}
.myimg {
  width: 150px;
  height: 100px;
}
</style>
