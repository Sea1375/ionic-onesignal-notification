import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { KvkkModalPage } from './kvkk-modal.page';

describe('KvkkModalPage', () => {
  let component: KvkkModalPage;
  let fixture: ComponentFixture<KvkkModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KvkkModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(KvkkModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
