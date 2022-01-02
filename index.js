const express = require('express')
const handle = require('express-handlebars')
const conn = require('./db/conexao')


const app = express()

app.use(express.static('public'))
app.use(
    express.urlencoded(
        {
            extended: true,
        }),
    )

app.use(express.json())

app.engine('handlebars', handle.engine())
app.set('view engine', 'handlebars')

app.get('/', (req, res) => {
    res.render('home')
})

app.post('/book/insertbook', (req, res) => {
    const nome = req.body.nome
    const idade = req.body.idade

    const sql = `insert into users (??, ??) values (?, ?);`
    const data = ['nome', 'idade', nome, idade]

    conn.query(sql, data, (err) => {
        if(err){
            console.log(err);
        }else{
            console.log("dados inseridos");
        }
        res.redirect('/')
    })
})
app.get('/todos', (req, res) => {
    const sql = "SELECT * FROM users"

    conn.query(sql, (err, data) => {
        if(err){
            console.log(err);
        }

        const users = data
        console.log(users);

        res.render('todos', {users})
    })

    


})
app.get('/usuario/:id', (req, res) => {
    const id = req.params.id
    const sql = `SELECT * FROM users WHERE ?? = ?`
    const data = ['id', id]

    conn.query(sql, data, (err, data) => {
        if(err){
            console.log(err);
        }

        const user = data[0]
        console.log(user);

         res.render('usuario', {user})
    })

    


})

app.get('/usuario/edit/:id', (req, res) => {
    const id = req.params.id

    const sql = `SELECT * FROM users WHERE ?? = ?`
    const data = ['id', id]

    conn.query(sql, data, (err, data) => {
        if(err){
            console.log(err);
            return
        }
        const user = data[0]
        console.log(user);
        res.render('editarUsuario', {user})
    })
})

app.post('/user/update', (req, res) => {
    const id = req.body.id
    const nome = req.body.nome
    const idade = req.body.idade

    const sql = `UPDATE users SET ?? = ?, ?? = ? WHERE ?? = ?`
    const data = ['nome', nome, 'idade', idade, 'id', id]

    conn.query(sql, data, (err) => {
        if(err){
            console.log(err);
            return
        }

        res.redirect('/todos')
    })
})
app.post('/user/delete/:id', (req, res) => {
    const id = req.params.id

    const sql = `DELETE FROM users WHERE ?? = ?`
    const data = ['id', id]
    conn.query(sql, data, (err) => {
        if(err){
            console.log(err);
            return
        }

        res.redirect('/todos')
    })
})



app.listen(3000)
