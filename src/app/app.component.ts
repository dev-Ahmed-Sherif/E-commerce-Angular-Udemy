import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { SignalrService } from './services/signalr.service';

@Component({
  selector: 'app-root',
  imports: [NavBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Front E-Commerce Store';
  event: Event = new Event('click');
  /**
   *
   */
  constructor(public signalrService: SignalrService) {}
  ngOnInit(): void {
    // TODO: Implement OnInit
    this.signalrService.startConnection();
    setTimeout(() => {
      this.signalrService.askServerListener();
      this.signalrService.askServer(this.event);
    }, 2000);
  }
  ngOnDestroy() {
    // TODO: Implement OnDestroy
    this.signalrService.hubConnection.off('askServerResponse');
  }
}
