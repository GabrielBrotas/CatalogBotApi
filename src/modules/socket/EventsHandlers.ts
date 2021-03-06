import { APP_WEB_URL } from './../../config/constants';
import { MessageType, WAConnection } from '@adiwajshing/baileys';
import { Socket } from 'socket.io';
import { api } from '../../shared/services/api';
import { connectToWhatsApp } from './whatsapp/services/connectWhatsapp.service';
import { formatUserCellphoneToBaileysRemoteJID } from '../../utils/whatsapp';
import { CompaniesRepository } from '../../modules/companies/repositories/implementations/CompaniesRepository';

export class SocketEventsHandler {
  private connections: Array<{userID: string, socketID: string}> = []
  private waConnections: Array<{userID: string, conn: WAConnection}> = []

  constructor() {
    this.connections = []
  }

  updateOrderStatus(data: any, socket: Socket): void {
    const { ReceiverID, SenderID, status, deliveryTime = null, OrderID = null, clientWhatsapp } = data

    const userConnection = this.connections.find(user => user.userID === ReceiverID)

    if(userConnection) {
      socket.broadcast.to(userConnection.socketID).emit('updatedOrderStatus', {ReceiverID, status, deliveryTime});
    }

    this.sendWppMessageOrderUpdate({ReceiverID, SenderID, status, deliveryTime, clientWhatsapp, OrderID}, socket)
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

  async sendWppMessageOrderUpdate(data: any, socket: Socket): Promise<void> {
    const { ReceiverID, SenderID, status, deliveryTime = null, OrderID = null, clientWhatsapp } = data
    const clientWpp = formatUserCellphoneToBaileysRemoteJID(clientWhatsapp)

    try{
      let conn: WAConnection = null

      for (const waconn of this.waConnections) {
        if(waconn.userID === SenderID) {
          conn = waconn.conn
        }
      }

      if(!clientWpp) return
      if(!conn) return


      if (status === 'pending') {
        // TODO, send message to company
          // Text: "Um cliente acabou de solicitar um pedido!'",
        return
      }

      const companiesRepository = new CompaniesRepository()
      const {flow} = await companiesRepository.findById(SenderID)

      if (status === 'confirmed') {
          // await conn.sendMessage(clientWpp.with9, replaceIncludeMessage({
          //   answer: flow['3-1'],
          //   CompanyID: SenderID,
          //   DeliveryTime: deliveryTime,
          //   OrderID: OrderID,
          // }), MessageType.text)

          await conn.sendMessage(clientWpp.without9, replaceIncludeMessage({
            answer: flow['3-1'],
            CompanyID: SenderID,
            DeliveryTime: deliveryTime,
            OrderID: OrderID,
          }), MessageType.text)
        return
      }

      if (status === 'sent') {
        // await conn.sendMessage(clientWpp.with9, replaceIncludeMessage({
        //   answer: flow['3-2'],
        //   CompanyID: SenderID,
        //   DeliveryTime: deliveryTime,
        //   OrderID: OrderID,
        // }), MessageType.text)

        await conn.sendMessage(clientWpp.without9, replaceIncludeMessage({
          answer: flow['3-2'],
          CompanyID: SenderID,
          DeliveryTime: deliveryTime,
          OrderID: OrderID,
        }), MessageType.text)
        return
      }

      if (status === 'received') {
        // await conn.sendMessage(clientWpp.with9, replaceIncludeMessage({
        //   answer: flow['3-3'],
        //   CompanyID: SenderID,
        //   DeliveryTime: deliveryTime,
        //   OrderID: OrderID,
        // }), MessageType.text)

        await conn.sendMessage(clientWpp.without9, replaceIncludeMessage({
          answer: flow['3-3'],
          CompanyID: SenderID,
          DeliveryTime: deliveryTime,
          OrderID: OrderID,
        }), MessageType.text)
        return
      }

      if (status === 'canceled') {
        // await conn.sendMessage(clientWpp.with9, replaceIncludeMessage({
        //   answer: flow['3-4'],
        //   CompanyID: SenderID,
        //   DeliveryTime: deliveryTime,
        //   OrderID: OrderID,
        // }), MessageType.text)

        await conn.sendMessage(clientWpp.without9, replaceIncludeMessage({
          answer: flow['3-4'],
          CompanyID: SenderID,
          DeliveryTime: deliveryTime,
          OrderID: OrderID,
        }), MessageType.text)
        return
      }

    } catch(err) {
      console.log('disconnect wpp err => ', err)
    }
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

interface ReplaceIncludeMessageDTO {
  answer: string;
  DeliveryTime?: string;
  CompanyID?: string;
  OrderID?: string;
}

function replaceIncludeMessage({answer, DeliveryTime, CompanyID, OrderID}: ReplaceIncludeMessageDTO) {
  let response = answer;

  if (response.includes('{{DeliveryTime}}') && DeliveryTime) {
    response = response.replace(`{{DeliveryTime}}`, DeliveryTime);
  }

  if (response.includes('{{OrderUrl}}') && CompanyID && OrderID) {
    response = response.replace(`{{OrderUrl}}`, `${APP_WEB_URL}/catalog/${CompanyID}?o=${OrderID}`);
  }

  return response
}
