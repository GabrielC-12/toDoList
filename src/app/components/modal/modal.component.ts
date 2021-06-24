import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  checkPwd(): boolean {
    var pwd = (<HTMLInputElement>document.getElementById("pass")).value;
    var passCorrect = (pwd === "TrabalheNaSaipos")
    return passCorrect;
  }

}
