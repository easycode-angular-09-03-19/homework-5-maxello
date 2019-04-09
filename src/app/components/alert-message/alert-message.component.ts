import { Component, OnInit } from '@angular/core';
import { Alert, AlertState } from '../../interfaces/Alert';
import { AlertMessageService } from "../../services/alert-message.service";

@Component({
  selector: 'app-alert-message',
  templateUrl: './alert-message.component.html',
  styleUrls: ['./alert-message.component.css']
})
export class AlertMessageComponent implements OnInit {
  messageData: Alert = {
    message: "",
    isSuccess: false
  };

  alertState: AlertState = {
    isShow: false
  }

  constructor(
    private alertMessageService: AlertMessageService
  ) { }

  private showAlert(data: Alert) {
    let timeout: ReturnType<typeof setTimeout>;
    clearTimeout(timeout);
    this.alertState.isShow = true;
    
    this.messageData = {
      message: data.message,
      isSuccess: data.isSuccess
    };

    timeout = setTimeout(() => {
      this.alertState.isShow = false;
      this.messageData.message = "";
    }, 2000);
  }

  ngOnInit() {
    this.alertMessageService.alertShowEventObservableSubject.subscribe((data: Alert) => {
      if(data.message){
        this.showAlert(data);
      }
    });
  }
}
