<template>
  <el-form @submit.native.prevent="saveArticle" ref="form" :model="article" label-width="80px">
    <el-form-item label="文章标题">
      <el-input v-model="article.title"></el-input>
    </el-form-item>
    <el-form-item label="文章内容">
      <el-input type="textarea" v-model="article.content"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" native-type="submit">创建</el-button>
      <el-button type="info">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      article: {
        title: "",
        content: ""
      }
    };
  },
  methods: {
    saveArticle() {
      this.$http.post('/article',this.article).then(res=>{
        console.log(res.data)
          this.$message({
            message: '创建文章成功！',
            type: 'success'
        });
        this.$router.push('/articles/index')
      })
    }
  }
};
</script>