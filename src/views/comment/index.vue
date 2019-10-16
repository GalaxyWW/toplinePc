<template>
  <el-card>
    <!-- 评论表格 -->
    <el-table v-loading= 'loading' :data="commentList" style="width: 100%">
      <el-table-column prop="title" label="标题" width="180"></el-table-column>
      <el-table-column label="评论状态" width="180">
          <template slot-scope="scope">
              <el-tag v-if="scope.row.comment_status ===false" type="danger">禁用</el-tag>
              <el-tag v-if="scope.row.comment_status ===true" type="success">启用</el-tag>
          </template>
      </el-table-column>
      <el-table-column prop="total_comment_count" label="总评论数"></el-table-column>
      <el-table-column prop="fans_comment_count" label="粉丝评论数"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="closeComment(scope.row)" type="text">
              {{ scope.row.comment_status ? '关闭评论' : '开启评论' }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination @current-change='pageChange' @next-click='nextClick' @prev-click='perClick' background layout="prev, pager, next" :total="total_count"></el-pagination>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
    // 评论的列表
      commentList: [],
      // 评论的的总条数
      total_count: 0,
      // 分页的页码
      page: 1,
      // 每页的条数
      per_page: 10,
      // 加载状态
      loading: false
    }
  },
  methods: {
    // 得到评论的数据
    getCommentList () {
      this.loading = true
      this.$http({
        url: '/articles',
        method: 'GET',
        params: {
          response_type: 'comment',
          page: this.page,
          per_page: this.per_page
        }
      }).then(res => {
        // 获取总评论数
        this.total_count = res.total_count
        this.loading = false
        //   得到评论的列表
        this.commentList = res.results
      })
    },
    // 关闭或开启评论
    closeComment (row) {
      this.$http({
        url: `/comments/status?article_id=${row.id}`,
        method: 'PUT',
        data: {
          // 将状态取反
          allow_comment: !row.comment_status
        }
      }).then(res => {
        this.getCommentList()
        // 显示提示信息
        this.$message({
          message: res.allow_comment ? '开启成功' : '关闭成功',
          type: 'success'
        })
      })
    },
    // 点击上一页会触发
    perClick () {
      // 先将当前页减一
      this.page = this.page - 1
      // 然后重启请求数据
      this.getCommentList()
    },
    // 点击下一页会触发
    nextClick () {
      // 先将当前页加一
      this.page = this.page + 1
      // 然后重启请求数据
      this.getCommentList()
    },
    // 当点击当前页码时会触发
    pageChange (page) {
      // 将页码赋值给this.page
      this.page = page
      // 重新请求数据
      this.getCommentList()
    }
  },
  created () {
    // 获取评论的数据
    this.getCommentList()
  }
}
</script>

<style>
.el-pagination.is-background {
    margin-top: 20px;
    display: flex;
    justify-content: center;
}
</style>
