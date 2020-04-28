import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AdInterestSearchListeProductInterestsCategoryPage } from './ad-interest-search-liste-product-interests-category.page';

describe('AdInterestSearchListeProductInterestsCategoryPage', () => {
  let component: AdInterestSearchListeProductInterestsCategoryPage;
  let fixture: ComponentFixture<AdInterestSearchListeProductInterestsCategoryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdInterestSearchListeProductInterestsCategoryPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AdInterestSearchListeProductInterestsCategoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
