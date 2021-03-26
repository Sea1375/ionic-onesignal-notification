import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { GeneralService } from '../api/general.service';

@Component({
  selector: 'app-invite-friend',
  templateUrl: './invite-friend.page.html',
  styleUrls: ['./invite-friend.page.scss'],
})
export class InviteFriendPage implements OnInit {
  count;
  desc;
  step_id=0;
  constructor(private modalCtrl:ModalController,private gen_service:GeneralService, private alertCtrl:AlertController) { }
  lines=[];
  old_invites:any;
  main_button_class='';
  ngOnInit() {
    for(var i=0;i<parseInt(this.count);i++){
      this.lines.push({phone:''});
    }
    if(this.step_id>0){
      this.gen_service.getInvites(this.step_id).subscribe((list)=>{
        this.old_invites=list;
      });
    }
  }

  addMore(){
    this.lines.push({phone:''});
  }

  removePhone(i){
    this.lines.splice(i,1);
  }

  checkList(){
    let sendable=1;
    this.lines.forEach((line)=>{
      if(line.phone==''){sendable=0;}
    })
    if(sendable==1){ this.main_button_class='active'; }
    else{ this.main_button_class=''; }
    return sendable;
  }

  sendInvites(){
    let sendable=this.checkList(),main=this;
    if(sendable==1){
      this.gen_service.sendInvites(this.lines,this.step_id).subscribe((res)=>{
        if(res.status=='success'){
          this.presentAlert('Teşekkürler','Davetin başarıyla gönderildi. Arkadaşların üye olduğunda görevi tamamlamış olacaksın.',function(){
            main.modalCtrl.dismiss({ 'started': true });
          });
        }
        else{
          this.presentAlert('Dikkat',res.msg,null);
        }
      })
    }
  }

  async presentAlert(title,msg,action) {
    const alert = await this.alertCtrl.create({
      header: title,
      message: msg,
      buttons: [
        {
          text:'Tamam',
          handler: (blah) => {
            if(action){
              action();
            }
          }
        }
      ]
    });
    await alert.present();
  }

  cancel(){
    this.modalCtrl.dismiss({ 'started': false });
  }

}
