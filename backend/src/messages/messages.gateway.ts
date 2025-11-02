import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class MessagesGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('message')
  findAll(
    @MessageBody() message: string,
    @ConnectedSocket() client: Socket,
  ): WsResponse<string> {
    console.log(`message received: ${message}`);

    client.broadcast.emit('message', message);

    return {
      event: 'message',
      data: message,
    };
  }

  handleConnection(socket: Socket) {
    console.log(`socket ${socket.id} connected`);
  }

  handleDisconnect(socket: Socket) {
    console.log(`socket ${socket.id} disconnected`);
  }
}
