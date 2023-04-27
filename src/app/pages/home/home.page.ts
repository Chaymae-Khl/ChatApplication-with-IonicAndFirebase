import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor() { }
  segment='chats';
  open_new_chat=false;
  users=[
    {
      id:1,
      name:'chaymae',
      photo:'https://i.pravatar.cc/325'
    }
  ];
  ngOnInit() {
  }
  /**
   * logout
   */
  public logout() {
    
  }
  public onSegmentChanged(event: any) {
    
  }
  public onWillDismiss(event: any) {
    
  }
  public newChat() {
    this.open_new_chat=true;
  }
  public cancel() {
    this.open_new_chat=false;
  }
  startChat(event:any){

  }
}
