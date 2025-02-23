import { Injectable } from '@angular/core';
// import * as signalR from '@aspnet/signalr';
import * as signalR from '@microsoft/signalr';

@Injectable({ providedIn: 'root' })
export class SignalrService {
  constructor() {}

  hubConnection!: signalR.HubConnection;

  startConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('http://localhost:5039/SignalR', {
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets,
      })
      .withAutomaticReconnect()
      .build();

    this.hubConnection
      .start()
      .then(() => {
        console.log('Hub Connection Started!');
      })
      .catch((err: any) =>
        console.log('Error while starting connection: ' + err)
      );
  };

  askServer(event: Event) {
    event.preventDefault();
    this.hubConnection
      .invoke('AskServer', 'hey')
      .catch((err) => console.error(err));
  }

  askServerListener() {
    this.hubConnection.on('askServerResponse', (someText) => {
      console.log(someText);
    });
  }
}
