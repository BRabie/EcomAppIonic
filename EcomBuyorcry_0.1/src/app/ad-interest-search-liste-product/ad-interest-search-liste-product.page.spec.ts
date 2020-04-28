import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AdInterestSearchListeProductPage } from './ad-interest-search-liste-product.page';

describe('AdInterestSearchListeProductPage', () => {
  let component: AdInterestSearchListeProductPage;
  let fixture: ComponentFixture<AdInterestSearchListeProductPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdInterestSearchListeProductPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AdInterestSearchListeProductPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
