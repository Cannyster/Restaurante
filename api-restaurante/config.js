import express from 'express';
import jsonServer from 'json-server';
import { v4 as uuidv4 } from 'uuid';

const server = express();
const router = jsonServer.router('data/db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(express.json());

const PORT = 3335;

export { server, router, uuidv4, PORT };
