
🌆 Skyline Viagens - Gerenciamento de Pacotes de Viagem
Sistema simples para gerenciamento de pacotes de viagem, permitindo o cadastro e a visualização de viagens armazenadas em um banco de dados MySQL.

📌 Tecnologias Utilizadas
- 🟩 Node.js
- 🚀 Express.js
- 🛢️ MySQL (mysql2)
- 📦 Body-Parser
- 🔄 CORS
- 🌐 HTML, CSS e JavaScript

🚀 Como Executar o Projeto

1️⃣ Pré-requisitos
Antes de começar, certifique-se de ter os seguintes itens instalados:
- Node.js
- MySQL

2️⃣ Configuração do Banco de Dados
Certifique-se de que o MySQL está rodando.

Crie o banco de dados com o seguinte comando:

CREATE DATABASE agencia_viagens;

Em seguida, crie a tabela viagens  e a tabela usuarios:



	CREATE TABLE usuarios(
		id INT AUTO_INCREMENT PRIMARY KEY,
		nome VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        senha VARCHAR(255) NOT NULL
	);
 
    CREATE TABLE viagens (
       id INT AUTO_INCREMENT PRIMARY KEY,
       destino VARCHAR(255) NOT NULL,
       data_viagem DATE NOT NULL,
       preco DECIMAL(10, 2) NOT NULL,
       vagas INT NOT NULL
       );
   

⚠️ Importante: Altere as credenciais do banco no arquivo server.js se necessário.

3️⃣ Instalação e Execução do Servidor

# Clone o repositório
git clone https://github.com/JoseVitorMader/AgenciaViagens.git

# Acesse a pasta do projeto
cd skyline-viagens

# Instale as dependências
npm install

# Inicie o servidor
npm start

✅ O servidor estará disponível em: http://localhost:3000

✨ Funcionalidades
- ✅ Cadastrar viagens via formulário HTML
- ✅ Listar todas as viagens disponíveis
- 🌙 Modo escuro para melhor experiência do usuário

📡 Rotas da API

| Método | Rota       | Descrição                  |
|--------|------------|----------------------------|
| GET    | /          | Página inicial             |
| POST   | /viagens   | Cadastra uma nova viagem   |
| GET    | /listar    | Lista todas as viagens     |

🚧 Melhorias Futuras
- ✏️ Edição e exclusão de viagens
- ☁️ Integração com banco de dados na nuvem
- 🎨 Melhorias no design e usabilidade

👨‍💻 Autor
Desenvolvido com 💙 por José Vitor Mader

