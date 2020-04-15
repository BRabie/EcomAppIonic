import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListeAdSetPage } from './liste-ad-set.page';

describe('ListeAdSetPage', () => {
  let component: ListeAdSetPage;
  let fixture: ComponentFixture<ListeAdSetPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListeAdSetPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ListeAdSetPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
