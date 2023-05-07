import { Component, OnInit, ViewChild } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ModalController, PopoverController } from '@ionic/angular';
import { Observable, take } from 'rxjs';
import { ChatService } from 'src/app/services/chat/chat.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  @ViewChild('new_chat') modal:ModalController ;
 @ViewChild('popover') popover:PopoverController;
  
 constructor(private router:Router,
  private chatService:ChatService ) { 
  this.modal = new ModalController();
  this.popover = new PopoverController();
  
 }

  segment='chats';
  open_new_chat=false;
  users!: Observable<any[]>;
  chatRooms!: Observable<any[]>;
  // users=[
  //   {
  //     id:1,
  //     name:'chaymae',
  //     photo:'https://i.pravatar.cc/325'
  //   }
  // ];

  // chatRooms=[
  //   {
  //     id:1,
  //     name:'chaymae',
  //     photo:'https://i.pravatar.cc/325'
  //   }
  // ];
  ngOnInit() {
    this.getRooms();
  }

   getRooms(){
    this.chatService.getChatRooms();
    this.chatRooms=this.chatService.chatRooms;
    console.log('chatrooms:',this.chatRooms);
   }




  /**
   * logout
   */
  public logout() {
    this.popover.dismiss();
    this.chatService.auth.logout();
    this.router.navigateByUrl('/login');
  }
  public onSegmentChanged(event: any) {
    this.segment=event.detail.value;
  }
  public onWillDismiss(event: any) {
    
  }
  public newChat() {
    this.open_new_chat=true;
    if (!this.users) this.getUsers();

  }
  
  getUsers(){

    this.chatService.getUsers();
    this.users=this.chatService.users;
  }  


  public cancel() {
    this.open_new_chat=false;
  }

  async startChat(item:any){
  try{
    // this.global.showLoader();
    //create chatroom
    const room=await this.chatService.createChatRoom(item?.uid);
    console.log('room',room);
    this.cancel();
    const navData:NavigationExtras={
      queryParams:{
        name:item?.name
      }
    };
    this.router.navigate(['/','home','chats',room?.id],navData);
    // this.global.hideLoader();
  }catch(e){
    console.log(e);
    // this.global.hideLoader();
  }
  }

  getChat(item:any){
   (item?.user).pipe(
    take(1)
    ).subscribe((user_data:any)=>{
      console.log('data:',user_data);
      const navData:NavigationExtras={
        queryParams:{
          name:user_data?.name
        }
      };
     this.router.navigate(['/','home','chats',item?.id],navData);

    });
   
  }

  getUser(user:any){
    return user
  }

}
