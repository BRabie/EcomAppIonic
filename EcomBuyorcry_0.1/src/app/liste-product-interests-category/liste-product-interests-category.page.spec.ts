import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListeProductInterestsCategoryPage } from './liste-product-interests-category.page';

describe('ListeProductInterestsCategoryPage', () => {
  let component: ListeProductInterestsCategoryPage;
  let fixture: ComponentFixture<ListeProductInterestsCategoryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListeProductInterestsCategoryPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ListeProductInterestsCategoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
