import { Inject, UseGuards } from '@nestjs/common'
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets'
import { WsAuthGuard } from 'cardet/auth'
import { User } from 'cardet/database'
import { UsersService } from 'cardet/users'
import { Socket } from 'socket.io'

@UseGuards(WsAuthGuard)
@WebSocketGateway({ namespace: 'api/rooms' })
export class RoomsGateway implements OnGatewayConnection {
  @Inject(UsersService)
  private readonly users_service!: UsersService

  public async handleConnection(socket: Socket) {
    const { user_id } = socket.handshake.query

    if (!user_id) {
      socket.emit('de-authenticate')
      return
    }

    const user = await this.users_service.retrieve(user_id)

    if (!user) {
      socket.emit('de-authenticate')
      return
    }

    socket.join(user.room_id)
    socket.handshake.query.user = user
    socket.emit('init')
  }

  @SubscribeMessage('join-room')
  public async joinRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody()
    data: { room_id: string; user: User },
  ) {
    const { room_id, user } = data
    client.leaveAll()
    client.join(room_id)
    client.to(room_id).broadcast.emit('joined-room', user)
  }

  @SubscribeMessage('leave-room')
  public async leaveRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody()
    data: { room_id: string; user: User },
  ) {
    const { room_id, user } = data
    client.to(room_id).broadcast.emit('left-room', user)
    client.leaveAll()
  }

  @SubscribeMessage('start-game')
  public async startGame(
    @ConnectedSocket() client: Socket,
    @MessageBody()
    data: { room_id: string; user: User },
  ) {
    const { room_id, user } = data
    client.to(room_id).broadcast.emit('started-game', user)
  }

  @SubscribeMessage('end-game')
  public async endGame(
    @ConnectedSocket() client: Socket,
    @MessageBody()
    data: { room_id: string; user: User },
  ) {
    const { room_id, user } = data
    client.to(room_id).broadcast.emit('ended-game', user)
    client.leaveAll()
  }

  @SubscribeMessage('play')
  public async play(
    @ConnectedSocket() client: Socket,
    @MessageBody()
    data: { room_id: string; user: User },
  ) {
    const { room_id, user } = data
    client.to(room_id).broadcast.emit('played', user)
  }
}
