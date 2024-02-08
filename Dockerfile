FROM node:20

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package*.json ./
COPY prisma ./app/prisma
COPY .env ./app/.env

RUN npm install

# Bundle app source
COPY . .

# Expose port and start application
EXPOSE 3000
CMD ["npm", "run", "dev"]