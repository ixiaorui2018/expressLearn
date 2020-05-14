<template>
  <div>
    <el-table stripe :data="articles">
      <el-table-column prop="title" label="文章标题" width="140"></el-table-column>
      <el-table-column prop="content" label="文章内容" width="320"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="edit(scope.row._id)">编辑</el-button>
          <el-button size="mini" type="danger" @click="remove( scope.row._id)">删除</el-button>
        </template>
      </el-table-column>>
    </el-table>
  </div>
</template>

<script>
export default {
  inject:['reload'],
  data() {
    return {
      articles: []
    };
  },
  methods: {
    fetch() {
      this.$http.get("article").then(res => {
        this.articlesData = res.data;
      });
    },
    remove(id) {
      this.$http.delete(`/article/${id}`).then(() => {
        this.$message({
          message: "文章删除成功",
          type: "success"
        });
        this.fetch();
        this.reload();
      });
    },
    edit(id) {
      this.$router.push(`/articles/${id}/edit`)
    }
  },
  created() {
    this.$http.get("article").then(res => {
      this.articles = res.data;
    });
  }
};
</script>

<style>
</style>