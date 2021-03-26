import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ChanceDetailPage } from './chance-detail.page';

describe('ChanceDetailPage', () => {
  let component: ChanceDetailPage;
  let fixture: ComponentFixture<ChanceDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChanceDetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ChanceDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
