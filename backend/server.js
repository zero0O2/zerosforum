import express from "express";
import cors from "cors"
import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {v2 as cloudinary} from "cloudinary"    
import multer from "multer";


const app = express()

app.use(express.json())
app.use(cors())

dotenv.config()

mongoose.connect(process.env.CONNECT_MONGO)
.then(()=>{console.log("Conectado ao mongoDB")})


// ================= SCHEMAS MODELS ====================

const userSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true},
    email: { type: String, required: true, unique: true, lowercase: true},
    password: { type: String, required: true, minlength: 6, select: false },
    avatar : { type: String, default: "https://freesvg.org/img/abstract-user-flat-4.png" },
    role: { type:String, default:"user"},
    createdAt: { type: Date, default: Date.now }
})

const postsSchema = new mongoose.Schema({
    authorId: {type: mongoose.Schema.Types.ObjectId,ref: "User",required: true},

    title: {type: String,trim: true,maxlength: 100},

    content: {type: String,maxlength: 1000 , trim: true},

    image: {type: String},

    likes: [{type: mongoose.Schema.Types.ObjectId,ref: "User"}],

    commentAccept: {type: Boolean,default: true},

    comments: [{
        user: {type: mongoose.Schema.Types.ObjectId,ref: "User",required: true},
        text: {type: String,required: true},
        createdAt: {type: Date,default: Date.now}
    }]

}, { timestamps: true });

const User = mongoose.model("User",userSchema)
const Post = mongoose.model("Post",postsSchema)




const ValidationUserRole = async (token,acessRole) => {
    const id = token.id
    const user = await User.findById(id)

    if(!user) return res.status(404).json({message:"usuário nao encontrado"})

    if(!acessRole.includes(user.role)) return false

    return true
}








// ================= ROTAS ====================

//                  Users

app.get("/users", async(req, res)=>{
    
    try {
        const AuthHeader = req.headers.authorization
        const key = AuthHeader.split(" ")[1]
    
        const token = jwt.verify(key,process.env.JWT_SECRET)
        const user = await User.findById(token?.id)
    
        if(!user.role.includes("dev","adm")){return res.status(401).json({message:"Acesso não autorizado"})}
        
        const Banco = await User.find()
        res.json(Banco)

    } catch (error) {
        console.error(error)
        res.status(500).json({message:"Erro ao carregar dados do banco"})
    }
    
})

app.get("/userMaisAtivo", async(req, res)=>{
    
    try {
        const AuthHeader = req.headers.authorization
        const key = AuthHeader.split(" ")[1]
    
        const token = jwt.verify(key,process.env.JWT_SECRET)
        const user = await User.findById(token?.id)
    
        if(!user.role.includes("dev","adm")){return res.status(401).json({message:"Acesso não autorizado"})}
        
        const userComMaisPosts = await Post.aggregate([
            {
                $group:{
                    _id:"$authorId",
                    TotalPostsFeitos:{$sum:1}
                }
            },
            {
                $sort:{TotalPostsFeitos:-1}
            },
            {
                $limit:1
            }
        ])
        

        const Users = await User.findById(userComMaisPosts[0]._id)
        
        res.json({user:Users,totalPosts:userComMaisPosts[0].TotalPostsFeitos})

    } catch (error) {
        console.error(error)
        res.status(500).json({message:"Erro ao carregar dados do banco",error})
    }
    
})

app.get("/users/:id", async(req, res) => {
    const id = req.params.id

    try{
        const UserFind = await User.findById(id)

        if(!UserFind){
            return res.status(403).json({message:"usuario nao encontrado"})
        }

        res.json(UserFind)
        
    } catch (error){
        console.log(error)
        res.status(404).json({message:"modelo de id incorreto"})
    }
})

app.put("/users/:id", async (req, res)=>{
    const {name, email, password, passwordUpdate, avatar} = req.body
    const id = req.params.id
    
    const SearchError = async () => {
        const erros = {}
        
        if(name !== undefined){
            
            if(!name || name.trim().length == 0) erros.name = {message:"Preencha o campo de nome para continuar"}
            
        }
        
        if(email !== undefined){
            
            if(!email || email.trim().length == 0) erros.email = {message:"Preencha o campo de email para continuar"}
            
        }
        
        if(password !== undefined){
            
            if(!passwordUpdate) erros.passwordUpdate = {message:"Digite sua nova senha para continuar"}
            
            if(!password) erros.password = {message:"Preencha o campo de senha para continuar"}
            
            const user = await User.findById(id,"+password")
            const hashAccess = await bcrypt.compare(password,user.password)
            
            if(!hashAccess && password) erros.password = {message:"Senha incorreta"}
        }
        
        if(passwordUpdate !== undefined){
            
            if(!password) erros.password = {message:"Digite sua senha para continuar"}
            if(!passwordUpdate) erros.passwordUpdate = {message:"Digite sua nova senha para continuar"}
            if(passwordUpdate.length < 8 && passwordUpdate ) erros.passwordUpdate = {message:"Sua senha deve ter no minimo 8 caracteres"}
            if(passwordUpdate === password && password && passwordUpdate) erros.passwordUpdate = {message:"Nova senha deve ser diferente da atual"}
            
        }
        
        return erros
    }
    
    const erros = await SearchError()
    
    if(Object.keys(erros).length > 0) {return res.status(400).json(erros)}    
    
    try{
        const newObject = {}
        
        if(name) newObject.name = name
        if(email) newObject.email = email
        if(passwordUpdate) newObject.password = await bcrypt.hash(passwordUpdate,10)
            
        newObject.avatar = avatar !== undefined  && !avatar.trim() ? "https://freesvg.org/img/abstract-user-flat-4.png" : avatar

        
        const UserUpdate = await User.findByIdAndUpdate(
            id,
            newObject,
            {returnDocument: "after",runValidators:true}
        )
        
        res.status(200).json(UserUpdate)
        
    }catch (error){
        res.status(400).json({message:"Email ja cadastrado"})
    }
    
})

app.delete("/users/:id", async (req, res)=>{
    const id = req.params.id    
    const authBearer = req.headers.authorization
    
    const rolesPermitidos = ["dev","adm"]
    
    if (!authBearer){return res.status(401).json({message:"Authorization nao enviado"})}
    
    const token = authBearer.split(" ")[1]
    
    try {
        const idJwt = jwt.verify(token,process.env.JWT_SECRET)
        
        const userLog = await User.findById(idJwt.id)
        const userDelete = await User.findById(id)
        
        if(!userLog) return res.json({message:"usuario nao encontrado"})
        if(!userDelete) return res.json({message:"Usuario ja deletado ou nao existe"})
            
        if(rolesPermitidos.includes(userLog.role)) {
            await User.findByIdAndDelete(id,{returnDocument: "after"})
            return res.json({message:"Usuario deletado (admin)"})
        }
        
        if(userLog._id.toString() == userDelete._id.toString()) {
            await User.findByIdAndDelete(id,{returnDocument: "after"})
            return res.json({message:"Usuario deletado"})
        }
                
        res.json({message:"Sem permissão"})
        
    } catch (error) {
        res.json(error)
    }
    
})


//              =======Login======


app.post("/login",async (req,res)=>{
    
    try {
        const {email, password} = req.body
        
        if(!email || !password){
            const erros = {}
            
            if(!email) erros.email = {message:"Campo de email precisa ser preenchido"}
            if(!password) erros.senha = {message:"Campo de senha precisa ser preenchido"}
            
            return res.status(400).json(erros)
        }
        
        const usuario = await User.findOne({email}).select("+password")
        
        if(!usuario ){
            return res.status(400).json({message:"Email ou senha de usuario incorreta"})
        }
        
        const hasPass = await bcrypt.compare(password,usuario.password )
        
        if(!hasPass ){
            return res.status(400).json({message:"Email ou senha de usuario incorreta"})
        }
        
        const token = jwt.sign(
            {id:usuario._id},
            process.env.JWT_SECRET,
            {expiresIn:"2d"}
        )
        
        res.json({token})
        
        
    } catch (error) {
        return res.status(400).json({message:"Email ou senha de usuario incorreta"})
    }
    
    
})


//              =======Cadastro======


app.post("/cadastro", async(req, res) => {
    const {name, email, password , passwordConfirm} = req.body

    const erro = {}
    
    if(!name || !email || !password || !passwordConfirm){

        if(!name) erro.name = {message:"Campo de nome deve ser preenchido"}
        if(!email) erro.email = {message:"Campo de email deve ser preenchido"}
        if(!password) erro.senha = {message:"Campo de senha deve ser preenchido"}
        if(!passwordConfirm) erro.senhaConfirm = {message:"Campo de confirmar senha deve ser preenchido"}
        
        
    }
    
    if (passwordConfirm && password !== passwordConfirm) erro.senhaConfirm = {message:"As senhas devem ser as mesmas"}
    
    if(Object.keys(erro).length > 0) return res.status(400).json({erro})

    try{  
        const passHash = await bcrypt.hash(password,10)
        
        const UserCreated = await User.create({name,email,password:passHash})
        res.json(UserCreated)

    } catch (error){
        console.log(error.message)
        res.status(403).json(error.message)
    }
})

app.get("/autorizacao",(req,res)=>{

    try {
        const AuthHeader = req.headers["authorization"]
        
        const token = AuthHeader.split(" ")[1]
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        res.status(202).json(decoded)
        
    } catch (error) {
        res.status(402).json({message:"acesso nao autorizado"})
    }

})

app.get("/posts", async (req,res)=>{

    const post = await Post.find().populate("authorId")
    
    res.json(post)

})

app.get("/posts/:id", async (req,res)=>{
    const id = req.params.id


    const posts = await Post.find().populate("authorId")
    const postsUser = posts.filter(e =>( e.authorId._id == id))

    if(postsUser.length <= 0 ){res.status(404).json({message:"Nenhum post que corresponde ao úsuario"})}

    res.json(postsUser)

    
})

app.post("/posts", async (req,res)=>{
    const {image,title,content,commentAccept} = req.body

    const AuthHeader = req.headers.authorization.split(" ")[1]
    const token = jwt.verify(AuthHeader,process.env.JWT_SECRET)

    if(!token) {return res.status(400).json({message:"Postagem não disponival para usuario,faça login"})}
    if (!title?.trim() && !content?.trim() && !image) {return res.status(400).json({message:"Não é permitido a criação de posts vazios"}) }

    const dados = {}

    dados.authorId = token.id
    if(title) dados.title = title
    if(content) dados.content = content
    if(commentAccept) dados.commentAccept = commentAccept

    try {
        const post = await Post.create(dados)
        res.status(201).json( await post.populate("authorId"))
    } catch (error) {
        res.status(400).json({message:"Erro ao criar Post, tente novamente"})
    }

})

app.put("/posts/:id", async (req,res)=>{
    const {image} = req.body
    const id = req.params.id

    if(!image?.trim()){ return res.status(400).json({message:"Erro ao fazer upload da imagem"})}
        
    try {
        const update = await Post.findByIdAndUpdate(id,{image},{new:true}).populate("authorId")
        res.json(update)
    } catch (error) {
        res.status(400).json({message:"Erro ao adicionar imagem"})
    }

})

app.put("/likes/:id", async (req,res)=>{
    const idPost = req.params.id
    
    try {
        const AuthHeader = req.headers.authorization.split(" ")[1]
        const token = jwt.verify(AuthHeader,process.env.JWT_SECRET).id

        const post = await Post.findById(idPost)
        
        const jaDeuLike = post.likes.some(e => e == token)
        
        if(jaDeuLike) await Post.findByIdAndUpdate(idPost,{$pull:{likes:token}},{new:true})
        if(!jaDeuLike) await Post.findByIdAndUpdate(idPost,{$addToSet:{likes:token}},{new:true})
                
                
        const postLike = await Post.findById(idPost).populate("authorId")

        res.json(postLike)

    } catch (error) {
        return res.status(400).json(error)
    }
})

app.delete("/posts/:id", async (req,res)=>{
    const idPost = req.params.id
    
    try {
        const post = await Post.findByIdAndDelete(idPost).populate("authorId")
        
        if(!post) {return res.status(400).json("Post ja deletado ou nao encontrado")}

        res.json(post)

    } catch (error) {
        return res.status(400).json(error)
    }
})

app.get("/postsDados/postOfDays/:id", async (req,res)=>{
    
    const {id} = req.params

    const dateNow = new Date()
    const lastWeek = new Date()
    lastWeek.setDate(dateNow.getDate() - id)

    const headers = req.headers.authorization
    if(!headers) return res.json({message:"headers não enviado"})
        
    const bearer = headers.split(" ")[1]
        
    try {
        const token = jwt.verify(bearer,process.env.JWT_SECRET)
        
        const isAuth =  await ValidationUserRole(token,["dev","adm"])

        if(!isAuth) {return res.status(401).json({message:"acesso nao autorizado"})}

        const PostsForWeek = await Post.aggregate([
            {
                $match:{
                    createdAt:{
                        $gte:lastWeek,
                        $lte:dateNow
                    }
                }
            },
            {
                $group:{
                    _id:{$dayOfWeek:"$createdAt"},
                    total:{$sum:1},
                }
            },
            {
                $sort:{_id:1}
            }
        ])

        const diaSemanaFormat = {
            1:"Domingo",
            2:"Segunda",
            3:"Terça",
            4:"Quarta",
            5:"Quinta",
            6:"Sexta",
            7:"Sabado",
        }

        const PostsForWeekFormated = PostsForWeek.map(e=>(
            {...e,_id:diaSemanaFormat[e._id]}
        ))

        res.json(PostsForWeekFormated)

    } catch (error) {
        res.json(error)
    }

})

app.get("/postsDados/daySearch/:id", async (req,res)=>{
    
    const {id} = req.params

    const dateNow = new Date()
    const lastWeek = new Date()
    lastWeek.setDate(dateNow.getDate() - id)

    const headers = req.headers.authorization
    if(!headers) return res.json({message:"headers não enviado"})
        
    const bearer = headers.split(" ")[1]
        
    try {
        const token = jwt.verify(bearer,process.env.JWT_SECRET)
        
        const isAuth =  await ValidationUserRole(token,["dev","adm"])

        if(!isAuth) {return res.status(401).json({message:"acesso nao autorizado"})}

        const PostsForDays = await Post.aggregate([
            {
                $match:{
                    createdAt:{
                        $gte:lastWeek,
                        $lte:dateNow
                    }
                }
            }
        ])

        res.json(PostsForDays)
    }catch(error){
        console.log(error)
    }

})







app.listen(process.env.PORT , ()=>{ 
    console.log(`Escutando na porta: ${process.env.PORT}`)
})