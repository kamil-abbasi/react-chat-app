import { OnGatewayConnection, OnGatewayDisconnect, WsResponse } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
export declare class MessagesGateway implements OnGatewayConnection, OnGatewayDisconnect {
    server: Server;
    findAll(message: string, client: Socket): WsResponse<string>;
    handleConnection(socket: Socket): void;
    handleDisconnect(socket: Socket): void;
}
