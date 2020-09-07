import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor() { }

  requestPermision() {
    if (window.Notification && Notification.permission !== "granted") {
      Notification.requestPermission(function (status) {
        if (Notification.permission !== status) {
          alert("Notifications " + status + " !");
        }
      });
    }
  }

  createNotification(imageUrl, title, body, url) {
    if (window.Notification && Notification.permission === "granted") {
      // Using an interval cause some browsers (including Firefox) are blocking notifications if there are too much in a certain time.
        // Thanks to the tag, we should only see the "Hi! 9" notification 
        var n = new Notification(title, 
                {
                  icon: imageUrl,
                  body: body  
                });
        n.onclick = function(event) {
          event.preventDefault(); // prevent the browser from focusing the Notification's tab
          window.open(url, '_blank');
        }
      }
  }
}
