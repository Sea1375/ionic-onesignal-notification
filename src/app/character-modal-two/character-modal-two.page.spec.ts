import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CharacterModalTwoPage } from './character-modal-two.page';

describe('CharacterModalTwoPage', () => {
  let component: CharacterModalTwoPage;
  let fixture: ComponentFixture<CharacterModalTwoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CharacterModalTwoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CharacterModalTwoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
