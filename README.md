Skyline Viagens - Gerenciamento de Pacotes de Viagem

Este projeto é um sistema simples para gerenciamento de pacotes de viagem. Ele permite o cadastro e a visualização de viagens armazenadas em um banco de dados MySQL.

📌 Tecnologias Utilizadas

Node.js

Express.js

MySQL (mysql2)

Body-Parser

Cors

HTML, CSS e JavaScript

🚀 Como Executar o Projeto

1️⃣ Pré-requisitos

Antes de começar, você precisará ter instalado em sua máquina:

Node.js

MySQL

2️⃣ Configuração do Banco de Dados

Certifique-se de que o MySQL está rodando.

Crie um banco de dados chamado agencia_viagens.

Execute o seguinte comando SQL para criar a tabela:

CREATE TABLE viagens (
    id INT AUTO_INCREMENT PRIMARY KEY,
    destino VARCHAR(255) NOT NULL,
    data_viagem DATE NOT NULL,
    preco DECIMAL(10,2) NOT NULL,
    vagas INT NOT NULL
);

Altere as credenciais do banco de dados no arquivo server.js, se necessário.

3️⃣ Instalação e Execução do Servidor

Clone este repositório:

git clone https://github.com/seu-usuario/seu-repositorio.git

Acesse a pasta do projeto:

cd skyline-viagens

Instale as dependências:

npm install

Inicie o servidor:

npm start

O servidor estará rodando em http://localhost:3000

📌 Funcionalidades

📌 Cadastrar viagens via formulário HTML

📌 Listar todas as viagens disponíveis

📌 Modo Escuro para melhor experiência do usuário

📌 Rotas da API

Método

Rota

Descrição

GET

/

Página inicial

POST

/viagens

Cadastra uma nova viagem

GET

/Listar

Lista todas as viagens cadastradas

📌 Melhorias Futuras

🔹 Edição e exclusão de viagens

🔹 Integração com um banco de dados na nuvem

🔹 Melhor design e usabilidade

📌 Autor

Projeto desenvolvido por José Vitor Mader.

