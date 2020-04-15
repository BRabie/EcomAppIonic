import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AdInterestSearchPage } from './ad-interest-search.page';

describe('AdInterestSearchPage', () => {
  let component: AdInterestSearchPage;
  let fixture: ComponentFixture<AdInterestSearchPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdInterestSearchPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AdInterestSearchPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
