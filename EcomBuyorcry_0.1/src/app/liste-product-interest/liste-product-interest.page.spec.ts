import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListeProductInterestPage } from './liste-product-interest.page';

describe('ListeProductInterestPage', () => {
  let component: ListeProductInterestPage;
  let fixture: ComponentFixture<ListeProductInterestPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListeProductInterestPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ListeProductInterestPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
