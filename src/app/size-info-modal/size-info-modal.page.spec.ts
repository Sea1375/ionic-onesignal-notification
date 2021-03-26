import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SizeInfoModalPage } from './size-info-modal.page';

describe('SizeInfoModalPage', () => {
  let component: SizeInfoModalPage;
  let fixture: ComponentFixture<SizeInfoModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SizeInfoModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SizeInfoModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
