import { Socket } from 'socket.io';
import { api } from '../../shared/services/api';


export class SocketEventsHandler {
  private connections: Array<{userID: string, socketID: string}> = []

  constructor() {
    this.connections = []
  }

  updateOrderStatus(data: any, socket: Socket): void {
    const { userID, status } = data

    const userToSendConnection = this.connections.find(user => user.userID === userID)

    if(userToSendConnection) {
      socket.broadcast.to(userToSendConnection.socketID).emit('updatedOrderStatus', {userID, status});
    }
  }

  loggedUser(data: any, socket: Socket): void {
    const userConnectionExists = this.connections.find(user => user.userID === data)

    if(userConnectionExists) {
      this.connections = this.connections.filter(connection => connection.userID !== userConnectionExists.userID)
    }

    this.connections.push({userID: data, socketID: socket.id})
    // console.log(connections)
  }

  disconnect(data: any, socket: Socket): void {
    console.log("Client disconnected");
    this.connections = this.connections.filter(connection => connection.socketID !== socket.id)
    // console.log(connections)
  }

  sendNotification(data: any, socket: Socket): void {
    api.post('/notifications',
    {
      Text: data.Text,
      Type: data.Type,
      Receiver: data.Receiver,
      Order: data.Order,
      Sender: data.Sender
    })
    .then((res: any) => {
      const userToSendConnection = this.connections.find(user => user.userID === res.data.Receiver)

      if(userToSendConnection) {
        socket.broadcast.to(userToSendConnection.socketID).emit('newNotification', res.data);
      }
    })
  }


}