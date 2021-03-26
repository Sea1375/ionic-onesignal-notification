import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SucceedModalPage } from './succeed-modal.page';

describe('SucceedModalPage', () => {
  let component: SucceedModalPage;
  let fixture: ComponentFixture<SucceedModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SucceedModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SucceedModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
