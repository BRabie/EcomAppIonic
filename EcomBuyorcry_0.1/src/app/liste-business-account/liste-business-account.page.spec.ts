import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListeBusinessAccountPage } from './liste-business-account.page';

describe('ListeBusinessAccountPage', () => {
  let component: ListeBusinessAccountPage;
  let fixture: ComponentFixture<ListeBusinessAccountPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListeBusinessAccountPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ListeBusinessAccountPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
