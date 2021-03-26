import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CharacterModalOnePage } from './character-modal-one.page';

describe('CharacterModalOnePage', () => {
  let component: CharacterModalOnePage;
  let fixture: ComponentFixture<CharacterModalOnePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CharacterModalOnePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CharacterModalOnePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
