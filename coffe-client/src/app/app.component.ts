import { Component } from '@angular/core';
import { MessagingService } from './_services/messaging.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from './_services/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'coffe-client';
  message;

  constructor(
    private afAuth: AngularFireAuth,
    private authService: AuthService,
    private messagingService: MessagingService,
    private afs: AngularFirestore) {
      afs.firestore.settings({
        timestampsInSnapshots: true,
      });
     }

  ngOnInit() {
    this.authService.login().then(userCredentials => {
      this.messagingService._userCredentials = userCredentials;
      const userId = userCredentials.user.uid;
      this.messagingService.requestPermission(userId)
      this.messagingService.receiveMessage()
      this.message = this.messagingService.currentMessage
    })
  }
}
