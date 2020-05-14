const express = require('express')
const app = express()

app.use(require('cors')())


//允许识别json数据
app.use(express.json())

const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/element-admin',{
    useCreateIndex: true,
    useFindAndModify: true,
    useNewUrlParser: true,
})

const Article = mongoose.model("Article", new mongoose.Schema({
    title: {
        type: String
    },
    content: {
        type: String
    },
    type: {
        type: String
    }
}))

app.get('/',async(req,res)=>{
    res.send('index')
})

// 查询所有文章
app.get("/api/article", async (req, res) => {
    const articles = await Article.find()
    res.send(articles)
})

// 文章详情
app.get("/api/article/:id", async (req, res) => {
    const article = await Article.findById(req.params.id)
    res.send(article)
})

// 修改文章
app.put("/api/article/:id", async (req, res) => {
    const article = await Article.findByIdAndUpdate(req.params.id, req.body)
    res.send(article)
})

// 新增文章
app.post("/api/article", async (req, res) => {
    const articles = await Article.create(req.body)
    res.send(articles)
})

// 删除文章(接受参数)
app.delete("/api/article/:id", async (req, res) => {
    await Article.findByIdAndDelete(req.params.id)
    res.send({
        status: true
    })
})

//服务端端默认启用3001端口
app.listen(3001,() =>{
    console.log("服务已启动！")
})