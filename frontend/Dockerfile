FROM node:18-alpine

WORKDIR /app

# Copia os arquivos que gerenciam as dependências do front
COPY package*.json ./

# Instala as dependências do React/Vite
RUN npm install

# Copia todo o código do frontend para dentro do container
COPY . .

# Expõe a porta padrão que o Vite usa em desenvolvimento
EXPOSE 5173

# Roda o servidor do Vite liberando o acesso externo para a rede do Docker
CMD ["npm", "run", "dev", "--", "--host"]