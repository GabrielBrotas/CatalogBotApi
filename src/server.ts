import 'reflect-metadata';
import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import { errors } from 'celebrate';
import cors from 'cors';

import uploadConfig from './config/upload';

import './shared/database';
import './shared/container';

import { AppError } from './shared/errors/AppError';
import { companiesRouter } from './modules/companies/routes';
import { productsRouter } from './modules/products/routes';
import { clientsRouter } from './modules/clients/routes';
import { ordersRouter } from './modules/orders/routes';
import { Logger } from './shared/middlewares/logger';
import { categoriesRouter } from './modules/categories/routes';
import { Socket } from 'socket.io';
import { notificationsRouter } from './modules/notifications/routes';
import { SocketEventsHandler } from './modules/socket/EventsHandlers';

const app = express();
app.use(express.json());
app.use(cors());

const server = require('http').createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: "*",
  }
});

const serverLogger = new Logger('REQUEST');

export const middlewareLogger = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  serverLogger.log(`[${req.method}] => ${req.url}`);
  next();
};

app.use('/files', express.static(uploadConfig.uploadsFolder));
app.use(middlewareLogger);
app.use('/companies', companiesRouter);
app.use('/clients', clientsRouter);
app.use('/products', productsRouter);
app.use('/categories', categoriesRouter);
app.use('/orders', ordersRouter);
app.use('/notifications', notificationsRouter);
app.use(errors());

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        message: err.message,
      });
    }

    return response.status(500).json({
      status: 'error',
      message: `Internal server error - ${err.message}`,
    });
  },
);

let connections: Array<{userID: string, socketID: string}> = []

const socketEventsHandler = new SocketEventsHandler()

io.on("connection", (socket: Socket) => {
  console.log("New client connected " + socket.id);

  socket.on('updateOrderStatus', (data) => socketEventsHandler.updateOrderStatus(data, socket))

  socket.on('loggedUser', (data) => socketEventsHandler.loggedUser(data, socket))

  socket.on("disconnect", (data) => socketEventsHandler.disconnect(data,socket));

  socket.on("sendNotification", (data) => socketEventsHandler.sendNotification(data,socket));
});

const PORT = 4000;

server.listen(PORT, () => {
  console.log(`app running in port ${PORT}`);
});
