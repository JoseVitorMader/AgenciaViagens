const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');


const app = express();

app.use(express.static('public'));
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));



const db = mysql.createConnection({
    host: 'localhost', // Endereço do banco de dados
    user: 'root', //nome de usuário do banco    
    password: 'root', // Senha do banco
    database: 'agencia_viagens', // Nome do banco de dados
    port: 3306 // Porta de conexão com o banco
});

db.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
    } else {
        console.log('Conectado ao banco de dados!');
    }
});

app.get("/", function(req, res){
    res.sendFile(__dirname + "/login.html");
}); 

app.get("/home", function(req, res){
    res.sendFile(__dirname + "/public/home.html");
}); 

app.get("/cadastrar", function(req, res){
    res.sendFile(__dirname + "/public/cadastro.html");
});


// Rota para cadastrar viagens
app.post('/viagens', function(req, res) {
    const destino = req.body.destino;
    const data_viagem = req.body.data_viagem;
    const preco = req.body.preco;
    const vagas = req.body.vagas;

    const values = [destino, data_viagem, preco, vagas];
    const insert = "INSERT INTO viagens (destino, data_viagem, preco, vagas) VALUES (?, ?, ?, ?)";

    db.query(insert, values, function(err, result) {
        if (!err) {
            console.log("Dados inseridos com sucesso!");
        } else {
            console.log("Erro ao inserir dados!", err);
            res.send("Erro ao inserir dados!");
        }
    })
})


   

//Vizualizar
app.get("/Listar", function(req, res){
    const listar = "SELECT * FROM viagens";

    db.query(listar, function(err, rows){
        if (!err) {
            console.log("Consulta Realizada Com Sucesso!");
            res.send(`
                <html>
                    <head> 
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <title> Skyline Viagens ✈ </title>
                        <link rel="stylesheet" href="./style.css">
                    </head>
                    <body>

                         <header>
                            Skyline Viagens ✈
                        </header>

                        <h1> Relatório de Viagens </h1>
                        <div class="container">
                            <header class = "header">
                                <div>
                                    <h1>Skyline Viagens</h1>
                                    <p class="tagline"> Gerenciamento de Pacotes de Viagem</p>
                                    </div>
                                    <button class="theme-toggle" id="themeToggle">
                                        <i class="fas fa-moon"></i> Modo Escuro
                                    </button>
                            </header>

                        <section class="card">
                            <h2> Pacotes de Viagem Disponíveis </h2>
                            <div class="table-container">
                                <table>
                                    <thead>
                                        <tr>
                                            <th> ID </th>
                                            <th> Destino </th>
                                            <th> Data da Viagem </th>
                                            <th> Valor da Viagem </th>
                                            <th> Vagas </th>
                                            <th> Ações </th>
                                            <th> Ações </th>
                                        </tr>
                                        </thead>
                                        <tbody id="listaViagens"> </tbody>
                                        ${rows.map(row => `
                                            <tr>
                                                <td> ${row.id} </td>
                                                <td> ${row.destino} </td>
                                                <td> ${row.data_viagem} </td>
                                                <td> ${row.preco} </td>
                                                <td> ${row.vagas} </td>
                                                <td> <a href="/excluir/${row.id}">Excluir</a> </td>
                                                <td> <a href="/editar/${row.id}">Editar</a> </td>
                                            </tr>
                                            `).join('')}
                                </table>
                            </div>
                        </section>
                        <a href="/"> <button> Voltar </button> </a>
                        </div>
                        <script src="script.js"></script>
                    </body>
                </html>
                `);

        } else {
            console.log("Erro no relatório de Estoque", err);
            res.send("Erro!")
        }
    })
});

app.get('/excluir/:id', function(req, res){
    const id = req.params.id;

    db.query('DELETE FROM viagens WHERE id = ?', [id], function(err, result){
        if (err) {
            console.log('Erro ao excluir o produto', err);
            res.status(500).send('Erro ao excluir o produto');
            return;
        }
    })
    console.log('Produto excluído com sucesso!');
    res.redirect('/listar');
})

app.get('/editar/:id', function(req, res){
    const id = req.params.id;

    db.query('SELECT * FROM viagens WHERE id = ?', [id], function(err, result){
        if (err) {
            console.log('Erro ao editar o produto', err);
            res.status(500).send('Erro ao editar o produto');
            return;
        }
        res.send(`
            <html>
                <head> 
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title> Skyline Viagens ✈ </title>
                    <style>
                    :root {
                        /* Light Theme */
                        --light-bg: #f5f7fa;
                        --light-primary: #1e88e5;
                        --light-primary-dark: #1565c0;
                        --light-text: #263238;
                        --light-card: #ffffff;
                        --light-border: #e0e0e0;
                        --light-shadow: rgba(0, 0, 0, 0.1);
                        --light-hover: #f1f5f9;

                        /* Dark Theme */
                        --dark-bg: #121f2f;
                        --dark-primary: #64b5f6;
                        --dark-primary-dark: #42a5f5;
                        --dark-text: #e0e0e0;
                        --dark-card: #1e293b;
                        --dark-border: #2d3748;
                        --dark-shadow: rgba(0, 0, 0, 0.3);
                        --dark-hover: #2d3748;
                    }

                    * {
                        margin: 0;
                        padding: 0;
                        box-sizing: border-box;
                        transition: background-color 0.3s ease, color 0.3s ease;
                    }

                    body {
                        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                        background-color: var(--light-bg);
                        color: var(--light-text);
                        line-height: 1.6;
                        min-height: 100vh;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        padding: 2rem;
                    }

                    body.dark-mode {
                        background-color: var(--dark-bg);
                        color: var(--dark-text);
                    }

                    .header {
                        width: 100%;
                        max-width: 1200px;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        margin-bottom: 2rem;
                    }

                    .theme-toggle {
                        background: var(--light-primary);
                        color: white;
                        border: none;
                        padding: 0.5rem 1rem;
                        border-radius: 4px;
                        cursor: pointer;
                        font-weight: 500;
                        display: flex;
                        align-items: center;
                        gap: 0.5rem;
                    }

                    body.dark-mode .theme-toggle {
                        background: var(--dark-primary-dark);
                    }

                    .theme-toggle:hover {
                        opacity: 0.9;
                    }

                    .container {
                        width: 100%;
                        max-width: 1200px;
                        display: flex;
                        flex-direction: column;
                        gap: 2rem;
                    }

                    h1 {
                        color: var(--light-primary);
                        font-size: 2.5rem;
                        margin-bottom: 0.5rem;
                    }

                    body.dark-mode h1 {
                        color: var(--dark-primary);
                    }

                    h2 {
                        color: var(--light-primary-dark);
                        font-size: 1.8rem;
                        margin-bottom: 1rem;
                    }

                    body.dark-mode h2 {
                        color: var(--dark-primary);
                    }

                    .card {
                        background-color: var(--light-card);
                        border-radius: 8px;
                        box-shadow: 0 4px 6px var(--light-shadow);
                        padding: 2rem;
                        margin-bottom: 1rem;
                    }

                    body.dark-mode .card {
                        background-color: var(--dark-card);
                        box-shadow: 0 4px 6px var(--dark-shadow);
                    }

                    .form-group {
                        display: flex;
                        flex-direction: column;
                        gap: 1.5rem;
                    }

                    .form-row {
                        display: grid;
                        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                        gap: 1rem;
                    }

                    .input-group {
                        display: flex;
                        flex-direction: column;
                        gap: 0.5rem;
                    }

                    label {
                        font-weight: 500;
                        color: var(--light-primary-dark);
                    }

                    body.dark-mode label {
                        color: var(--dark-primary);
                    }

                    input {
                        padding: 0.75rem;
                        border: 1px solid var(--light-border);
                        border-radius: 4px;
                        font-size: 1rem;
                        background-color: var(--light-card);
                        color: var(--light-text);
                    }

                    body.dark-mode input {
                        border-color: var(--dark-border);
                        background-color: var(--dark-card);
                        color: var(--dark-text);
                    }

                    input:focus {
                        outline: none;
                        border-color: var(--light-primary);
                        box-shadow: 0 0 0 2px rgba(30, 136, 229, 0.2);
                    }

                    body.dark-mode input:focus {
                        border-color: var(--dark-primary);
                        box-shadow: 0 0 0 2px rgba(100, 181, 246, 0.2);
                    }

                    button {
                        padding: 0.75rem 1.5rem;
                        background-color: var(--light-primary);
                        color: white;
                        border: none;
                        border-radius: 4px;
                        font-size: 1rem;
                        font-weight: 500;
                        cursor: pointer;
                        transition: all 0.2s ease;
                    }

                    body.dark-mode button {
                        background-color: var(--dark-primary-dark);
                    }

                    button:hover {
                        background-color: var(--light-primary-dark);
                        transform: translateY(-1px);
                    }

                    body.dark-mode button:hover {
                        background-color: var(--dark-primary);
                    }

                    .table-container {
                        overflow-x: auto;
                        width: 100%;
                    }

                    table {
                        width: 100%;
                        border-collapse: collapse;
                        background-color: var(--light-card);
                        box-shadow: 0 4px 6px var(--light-shadow);
                        border-radius: 8px;
                        overflow: hidden;
                    }

                    body.dark-mode table {
                        background-color: var(--dark-card);
                        box-shadow: 0 4px 6px var(--dark-shadow);
                    }

                    thead {
                        background-color: var(--light-primary);
                        color: white;
                    }

                    body.dark-mode thead {
                        background-color: var(--dark-primary-dark);
                    }

                    th, td {
                        padding: 1rem;
                        text-align: left;
                        border-bottom: 1px solid var(--light-border);
                    }

                    body.dark-mode th, 
                    body.dark-mode td {
                        border-bottom: 1px solid var(--dark-border);
                    }

                    th {
                        font-weight: 600;
                    }

                    tr:hover {
                        background-color: var(--light-hover);
                    }

                    body.dark-mode tr:hover {
                        background-color: var(--dark-hover);
                    }

                    @media (max-width: 768px) {
                        .form-row {
                            grid-template-columns: 1fr;
                        }
                        
                        th, td {
                            padding: 0.75rem;
                        }
                    }
                    </style>
                </head>
                <body>
                <header class="header">
                    <div>
                        <h1>Skyline Viagens</h1>
                        <p class="tagline">Gerenciamento de Pacotes de Viagem</p>
                    </div>
                    <button class="theme-toggle" id="themeToggle">
                        <i class="fas fa-moon"></i> Modo Escuro
                    </button>
                </header>
                <main>
                    <section class="card">
                    <h1> Editar Produto </h1>
                    <form action="/editar/${id}" method="POST">
                        <input type="text" name="destino" value="${result[0].destino}">
                        <input type="date" name="data_viagem" value="${result[0].data_viagem}">
                        <input type="text" name="preco" value="${result[0].preco}">
                        <input type="number" name="vagas" value="${result[0].vagas}">
                        <button type="submit"> Atualizar </button>
                    </form>
                    </section>
                </main>
                    <script>
                    const apiUrl = 'http://localhost:3000';

                    // Sistema de tema escuro/claro 
                    document.addEventListener('DOMContentLoaded', function() {
                        const themeToggle = document.getElementById('themeToggle');
                        const icon = themeToggle.querySelector('i');
                        
                        // Verifica preferência do usuário
                        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                        if (prefersDark) {
                            document.body.classList.add('dark-mode');
                            icon.className = 'fas fa-sun';
                            themeToggle.innerHTML = '<i class="fas fa-sun"></i> Modo Claro';
                        }
                        
                        themeToggle.addEventListener('click', () => {
                            document.body.classList.toggle('dark-mode');
                            
                            if (document.body.classList.contains('dark-mode')) {
                                icon.className = 'fas fa-sun';
                                themeToggle.innerHTML = '<i class="fas fa-sun"></i> Modo Claro';
                            } else {
                                icon.className = 'fas fa-moon';
                                themeToggle.innerHTML = '<i class="fas fa-moon"></i> Modo Escuro';
                            }
                        });
                    });

                    </script>
                </body>
            </html>
        `);
    })
})

app.post('/editar/:id', function(req, res){
    const id = req.params.id; // Obtém o ID do produto a ser editado da URL
    const destino = req.body.destino; // Obtém a nova descrição do corpo da requisição
    const data_viagem = req.body.data_viagem; // Obtém a nova quantidade do corpo da requisição
    const preco = req.body.preco; // Obtém o novo valor unitário do corpo da requisição
    const vagas = req.body.vagas; // Obtém a nova quantidade do corpo da requisição
 
    const update = "UPDATE viagens SET destino = ?, data_viagem = ?, preco = ?, vagas = ? WHERE id = ?";
 
    db.query(update, [destino, data_viagem, preco, vagas, id], function(err, result){
        if(!err){
            console.log("Viagem editada com sucesso!");
            res.redirect('/listar'); // Redireciona para a página de listagem após a edição
        }else{
            console.log("Erro ao editar o produto ", err);
            res.send("Erro")
        }
    });
}); 

app.post('/cadastrarUsu', function (req, res){

    // captura e armazenamento dos campos do formulário html
    const nome = req.body.nome;
    const email = req.body.email;
    const senha = req.body.senha;

    const values = [nome, email, senha];
    const insert = "INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)";

    db.query(insert, values, function(err, result,){
        if (!err) {
            console.log("Dados Inseridos Com Sucesso!");
            res.redirect('/');
        } else {
            console.log("Não Foi Possivel Inserir os Dados!", err);
            res.send("Erro!")
        }
    })
});

app.post('/login', function(req, res){
    const username = req.body.email;
    const password = req.body.senha;
    
    db.query('SELECT * FROM usuarios WHERE email = ? AND senha = ?', [username, password], function(error, results, fields){
        if (error) {
            console.error("Erro ao executar a consulta", error);
            res.status(500).send("Erro interno ao verificar credenciais")
            return
        } 
        if(results.length > 0){
            res.redirect("/home");
        } else {
            res.render('login', { errorMessage: "Credenciais inválidas", username: username});
            return
        }
    });
}); 

app.listen(3000, () => {
    console.log('Servidor rodando na url http://localhost:3000');
});
