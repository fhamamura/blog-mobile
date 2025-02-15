# Usar a imagem oficial do Node.js
FROM node:latest

# Definir o diretório de trabalho
WORKDIR /app

# Copiar arquivos de package e instalar dependências
COPY package*.json ./
RUN npm install

# Copiar o restante da aplicação
COPY . .

# Expor a porta de execução
EXPOSE 3000

# Comando de execução
CMD ["node", "index.js"]
