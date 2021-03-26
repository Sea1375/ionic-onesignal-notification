import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MySharePage } from './my-share.page';

describe('MySharePage', () => {
  let component: MySharePage;
  let fixture: ComponentFixture<MySharePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MySharePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MySharePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
