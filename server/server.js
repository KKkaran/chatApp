const express = require('express');
const path = require('path');
// import ApolloServer
const { ApolloServer } = require('apollo-server-express');
const {authMiddleware} = require("./utils/auth")
// import our typeDefs and resolvers
const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');

const PORT = process.env.PORT || 3001;
const app = express();

const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server,{
  cors:{
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST']
  }
});

const startServer = async () => {
  // create a new Apollo server and pass in our schema data
  const server = new ApolloServer({ 
    typeDefs, 
    resolvers, 
    context: authMiddleware 
  });

  // Start the Apollo server
  await server.start();

  // integrate our Apollo server with the Express application as middleware
  server.applyMiddleware({ app });

  // log where we can go to test our GQL API
  console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
};

// Initialize the Apollo server
startServer();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../client/build/index.html'));
// });
io.on('connection', (socket) => {
  console.log('a user connected');

  const id = socket.handshake.query.id;//id will be the logged in user id passed from client
  socket.join(id)
  
  socket.on('chat message', ({msg, id}) => {
    console.log('message from client: ' + msg.text + " " + id);
    
    socket.emit("rec",{msg})
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});
db.once('open', () => {
  server.listen(PORT, () => {
    console.log(`Socket running on server`);
  });

});