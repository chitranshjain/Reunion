FROM node:17

# Working DIR
WORKDIR /

# Package.json
COPY package*.json ./

# Install modules
RUN npm install

# Copy source files
COPY . .

# Environment Variable
ENV MONGODB mongodb+srv://userr:userr@cluster0.umq0n.mongodb.net/reunion?retryWrites=true&w=majority
ENV PORT 1337

# Run tests
RUN npm run test

# # Expose API Port
# EXPOSE 1337

CMD ["node", "app.js"]