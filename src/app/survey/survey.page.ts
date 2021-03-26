import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController, NavController } from '@ionic/angular';
import { IonSlides} from '@ionic/angular';
import { GeneralService } from '../api/general.service';
import { CongratulationsModalPage } from '../congratulations-modal/congratulations-modal.page';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.page.html',
  styleUrls: ['./survey.page.scss'],
})
export class SurveyPage implements OnInit {

  @ViewChild('slider')  slides: IonSlides;

  constructor(private navCtrl: NavController, private genService:GeneralService, private route:ActivatedRoute, private modalCtrl:ModalController) { }
  poll_id:any;
  poll:any;
  total_questions=0;
  active_slide=1;
  done_status=true;
  next_status=true;
  
  ngOnInit() {
    this.poll_id = this.route.snapshot.paramMap.get('id');
    this.poll = this.genService.getPollDetail(this.poll_id);
    //console.log('inner poll',this.poll);
    this.generateQuestions();
  }

  slideTrigger(){
    this.slides.getActiveIndex().then((a)=>{
      this.active_slide=(a+1);
    })
    this.checkAnswers();
  }

  
  async congratulationsModal(res) {
      let that = this;
      const modal = await this.modalCtrl.create({
        component: CongratulationsModalPage,
        cssClass: 'congratulations-modal-css',
        showBackdrop: true,
        swipeToClose: true,
        backdropDismiss: false,
        componentProps: { 'prize': {
          content:'Anket bilgileri başarıyla gönderildi. Teşekkürler.',
          wanted:false,
          main_title:'TEŞEKKÜRLER'
        } }
      });
      await modal.present();
      const { data } = await modal.onWillDismiss();
      if(data.dismissed==true){
        this.navCtrl.navigateRoot('tabs/tab1/rosette-detail/'+res.rosette_id);
      }
    }

  submitPoll(){
    this.genService.sendPoll(this.poll).subscribe((res)=>{
      //console.log('we have a result',res);
      if(res.avatar && res.avatar!=''){
        this.navCtrl.navigateRoot('character/'+res.avatar);
      }
      else if(res.rosette_id && res.rosette_id>0){
        this.congratulationsModal(res);
      }
    });
  }

  generateQuestions(){
    let that = this;
    this.total_questions=this.poll.questions.length;
    this.poll.answers=[];
    this.poll.questions.forEach(q => {
      if(q.type=='text' || q.type=='textarea'){
        this.poll.answers.push({q:q.id,val:''});
      }
      else{
        let ans=[];
        q.answers.forEach(i=>{
          ans.push({id:i.id,point:i.points,value:false});
        })
        console.log('ans set',ans);
        this.poll.answers.push({q:q.id,val:ans});
      }
    });
    if(this.slides){
      this.slides.lockSwipeToNext(true);
    }
    setTimeout(function(){
      that.slides.lockSwipeToNext(true);
    },500);
  }

  checkAnswers(){
    //console.log('checking answers',this.poll.answers);
    this.slides.lockSwipeToNext(true);
    this.slides.getActiveIndex().then((a)=>{
      if(this.poll.answers[a]){
        if( (this.poll.questions[a].type=='radio' || this.poll.questions[a].type=='text' || this.poll.questions[a].type=='textarea') && this.poll.answers[a].val!=''){
          this.next_status=false;
        }
        else if(this.poll.questions[a].type=='checkbox')(
          this.poll.answers[a].val.forEach(ans=>{
            if(ans.value){
              this.next_status=false;
            }
          })
        )        
      }
      else{
        this.next_status=true;
      }
    })
  }

  goBack(){
    this.navCtrl.back();
  }

  nextSlide(){
    this.slides.lockSwipeToNext(false);
    this.slides.slideNext();
    this.slides.lockSwipeToNext(true);
    this.next_status=true;
    
  }
}
