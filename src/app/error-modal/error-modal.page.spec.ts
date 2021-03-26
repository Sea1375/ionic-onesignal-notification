import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ErrorModalPage } from './error-modal.page';

describe('ErrorModalPage', () => {
  let component: ErrorModalPage;
  let fixture: ComponentFixture<ErrorModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ErrorModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ErrorModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
