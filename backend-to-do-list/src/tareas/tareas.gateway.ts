import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class TareasGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  afterInit(server: Server) {
    console.log('Socket.io inicializado');
  }

  handleConnection(client: Socket) {
    console.log(`Cliente conectado: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Cliente desconectado: ${client.id}`);
  }

  emitirNuevaTarea(tarea: any) {
    this.server.emit('tareaCreada', tarea);
  }

  emitirTareaActualizada(tarea: any) {
    this.server.emit('tareaActualizada', tarea);
  }

  emitirTareaEliminada(id: number) {
    this.server.emit('tareaEliminada', { id });
  }
}
