import { WAConnection } from '@adiwajshing/baileys';
import { Socket } from 'socket.io';
import { api } from '../../shared/services/api';
import { connectToWhatsApp } from './whatsapp/services/connectWhatsapp.service';
import { disconnectWhatsappService } from './whatsapp/services/disconnect.service';
// import { disconnectWhatsappService } from './whatsapp/services/disconnect.service';

export class SocketEventsHandler {
  private connections: Array<{userID: string, socketID: string}> = []
  private waConnections: Array<{userID: string, conn: WAConnection}> = []

  constructor() {
    this.connections = []
  }

  updateOrderStatus(data: any, socket: Socket): void {
    const { userID, status } = data

    const userToSendConnection = this.connections.find(user => user.userID === userID)

    if(userToSendConnection) {
      console.log('send to ', userToSendConnection.socketID)
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
      Sender: data.Sender,
      Status: data.Status
    })
    .then((res: any) => {
      const userToSendConnection = this.connections.find(user => user.userID === res.data.Receiver)

      if(userToSendConnection) {
        socket.broadcast.to(userToSendConnection.socketID).emit('newNotification', res.data);
      }
    })
  }

  async connectWhatsapp(data: any, socket: Socket): Promise<void> {
    const conn = new WAConnection()

    this.waConnections.filter( c => c.userID !== data.userId)
    this.waConnections.push({userID: data.userId, conn})

    await connectToWhatsApp(socket, conn, data.userId).catch (err => console.log("unexpected error: " + err) )
  }

  async disconnectWhatsapp(data: any, socket: Socket): Promise<void> {
    try{
      for (const waconn of this.waConnections) {
        if(waconn.userID === data.userId) {
          await waconn.conn.logout()
          waconn.conn.close()
        }
      }
    } catch(err) {
      console.log('disconnect wpp err => ', err)
    }
  }


}
