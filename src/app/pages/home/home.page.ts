import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, PopoverController } from '@ionic/angular';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  @ViewChild('new_chat') modal:ModalController ;
 @ViewChild('popover') popover:PopoverController;
  
 constructor(private router:Router ) { 
  this.modal = new ModalController();
  this.popover = new PopoverController();
  
 }

  segment='chats';
  open_new_chat=false;
  users=[
    {
      id:1,
      name:'chaymae',
      photo:'https://i.pravatar.cc/325'
    }
  ];

  chatRooms=[
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
  getChat(item:any){
    this.router.navigate(['home','chats',item?.id]);
  }
}
