# ReactRH
Projeto para aprendizado de ReactJS. O projeto contém autenticação JWT gerenciada pelo Spring Boot, contando com PostgreSQL para armazenar as contas de usuário. O sistema utiliza docker para subir um container com o MinIO, uma emulação de bucket S3.

## ✅ Requisitos para rodar o projeto
### 🔧Back-end (Java + Spring Boot)

- Java 21 
- Maven 3.9+
- Docker
- PostgreSQL instalado localmente
    - Porta padrão: 5432
    - Ferramenta opcional: [pgAdmin4](https://www.pgadmin.org/) para visualização e gerenciamento

>⚠️ Certifique-se de que o Docker esteja em execução antes de iniciar o projeto, pois o serviço de bucket (MinIO) depende dele.

---
### 🖥️ Front-end (React + Vite)

- Node.js `^18.x` ou `^20.x`
- npm `^9.x` ou `^10.x`

> O projeto utiliza [Vite](https://vitejs.dev/) como bundler e o Tailwind CSS para estilos.

## ⚙️ Instalação
Após clonar o projeto, execute os seguintes passos:

### 🗄️ Back-end
#### 1. Configure o PostgreSQL

Crie um banco de dados com o nome: reactrh

#### 2. Configure o MinIO
Com o Docker em execução, suba o container com o seguinte comando:
```bash
$ docker run -p 9000:9000 -p 9001:9001 quay.io/minio/minio server /data --console-address ":9001"
```
- Opcional: Acesse o console do MinIO em http://localhost:9001.
    - login: minioadmin
    - senha: minioadmin

#### 3. Compile o projeto Spring Boot:
- esteja no diretório reactRH-api e execute o comando:
```bash
mvn clean install
```

#### 4. Execute a aplicação Spring Boot:
- esteja no diretório reactRH-api e execute o comando:
```bash
mvn spring-boot:run
```

### 🖥️Front-end

#### 1. Instale as dependências
- esteja no diretório reactRH-web e execute o comando:
```bash
npm install
```

#### 2. Execute o ambiente de desenvolvimento
```bash
npm run dev
```
O front-end deve rodar em: http://localhost:5173

### ⚠️ Atenção!
A aplicação se conecta ao back-end em http://localhost:8080. Se você usar uma porta diferente, ajuste o proxy no vite.config.js.