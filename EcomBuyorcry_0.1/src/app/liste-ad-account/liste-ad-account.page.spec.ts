import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListeAdAccountPage } from './liste-ad-account.page';

describe('ListeAdAccountPage', () => {
  let component: ListeAdAccountPage;
  let fixture: ComponentFixture<ListeAdAccountPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListeAdAccountPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ListeAdAccountPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
