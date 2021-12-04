import { ConsoleLogger } from '@nestjs/common';
import { MessageBody, OnGatewayConnection, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer, WsResponse } from '@nestjs/websockets';
import { of } from 'rxjs';
import { UserVoteDTO } from 'src/models/dto/requests/user-vote.dto';
import { VotingService } from '../voting.service';
import { Socket,Server } from 'socket.io';

@WebSocketGateway()
export class UserVoteGateway implements OnGatewayInit, OnGatewayConnection {
  @WebSocketServer() server;

  public constructor(private votingService:VotingService)  {

  }

  afterInit(server: Server) {
    console.log("App Gateway Initialized");
}


  handleConnection(client: Socket, ...args: any[]){
    console.log(`New client connected...: ${client.id}`);
    client.emit('connected', 'Successfully connected to the server.');
}


  @SubscribeMessage('userVote')
  async handleMessage(@MessageBody() payload: UserVoteDTO) {
    await this.votingService.userVote(payload.hkId,payload.votingOptionId);
    let voting = this.votingService.getVotingByVotingOptionId(payload.votingOptionId);
    return of({
      event: 'voting',
      data: voting
    })
  }  

  @SubscribeMessage('test')
  handleEvent(client: Socket, text: string): WsResponse<unknown> {
    console.log(`socket`)
    const event = 'events';
    return { event: 'test', data: text };
  }

  

}
