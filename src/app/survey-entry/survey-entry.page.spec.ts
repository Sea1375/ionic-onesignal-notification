import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SurveyEntryPage } from './survey-entry.page';

describe('SurveyEntryPage', () => {
  let component: SurveyEntryPage;
  let fixture: ComponentFixture<SurveyEntryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurveyEntryPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SurveyEntryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
