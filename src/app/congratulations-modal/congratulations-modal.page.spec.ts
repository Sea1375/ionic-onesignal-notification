import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CongratulationsModalPage } from './congratulations-modal.page';

describe('CongratulationsModalPage', () => {
  let component: CongratulationsModalPage;
  let fixture: ComponentFixture<CongratulationsModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CongratulationsModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CongratulationsModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
