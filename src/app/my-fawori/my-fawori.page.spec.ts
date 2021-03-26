import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MyFaworiPage } from './my-fawori.page';

describe('MyFaworiPage', () => {
  let component: MyFaworiPage;
  let fixture: ComponentFixture<MyFaworiPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyFaworiPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MyFaworiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
