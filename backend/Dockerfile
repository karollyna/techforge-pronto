FROM node:18-alpine

WORKDIR /app

# Copia os arquivos de configuração de dependências
COPY package*.json ./
COPY prisma ./prisma/

# Instala as dependências
RUN npm install

# Copia o restante do código do backend
COPY . .

# Gera o client do Prisma (essencial para o banco de dados funcionar)
RUN npx prisma generate

# Compila o TypeScript para JavaScript
RUN npm run build

EXPOSE 3000

# Comando para rodar as migrations e iniciar o servidor backend
CMD ["sh", "-c", "npx prisma migrate deploy && npm run start"]