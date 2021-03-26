import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { GeneralService } from '../api/general.service';

@Component({
  selector: 'app-character',
  templateUrl: './character.page.html',
  styleUrls: ['./character.page.scss'],
})
export class CharacterPage implements OnInit {

  constructor(private route:ActivatedRoute, private genService: GeneralService, private navCtrl:NavController) { }
  avatar:any;
  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.avatar = this.genService.getAvatarDetail(id);
  }
  confirmChar(){
    this.genService.setAvatar(this.avatar.id).subscribe(()=>{
      this.navCtrl.navigateRoot('tabs');
    });
    
  }
}
