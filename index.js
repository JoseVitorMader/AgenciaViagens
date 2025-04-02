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


app.get('/', (req, res) => {
    res.sendFile(__dirname, 'public', 'index.html');
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


app.listen(3000, () => {
    console.log('Servidor rodando na url http://localhost:3000');
});
