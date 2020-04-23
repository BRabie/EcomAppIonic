import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListeProductPage } from './liste-product.page';

describe('ListeProductPage', () => {
  let component: ListeProductPage;
  let fixture: ComponentFixture<ListeProductPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListeProductPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ListeProductPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
