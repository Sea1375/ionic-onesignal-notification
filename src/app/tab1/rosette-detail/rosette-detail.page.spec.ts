import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RosetteDetailPage } from './rosette-detail.page';

describe('RosetteDetailPage', () => {
  let component: RosetteDetailPage;
  let fixture: ComponentFixture<RosetteDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RosetteDetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RosetteDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
