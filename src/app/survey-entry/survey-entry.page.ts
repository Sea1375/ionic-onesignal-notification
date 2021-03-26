import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { GeneralService } from '../api/general.service';

@Component({
  selector: 'app-survey-entry',
  templateUrl: './survey-entry.page.html',
  styleUrls: ['./survey-entry.page.scss'],
})
export class SurveyEntryPage implements OnInit {

  constructor(private navCtrl: NavController, private route:ActivatedRoute, private genService:GeneralService) { }
  poll_id:any;
  poll:any;
  contents={
    start_survey_title:''
  }
  ngOnInit() {
    this.poll_id = this.route.snapshot.paramMap.get('id');
    this.genService.getPolls().subscribe(()=>{
      this.poll=this.genService.getPollDetail(this.poll_id);
      //console.log('the poll',this.poll);
    })
    this.genService.getContents().subscribe(()=>{
      //console.log('got contents');
      this.contents.start_survey_title=this.genService.fastContent('start-survey-title');
    });
  }

  goSurvey(){
    this.navCtrl.navigateForward('survey/'+this.poll_id);
  }

  goBack(){
    this.navCtrl.back();
  }
}
