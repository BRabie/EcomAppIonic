import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CreateAdSetPage } from './create-ad-set.page';

describe('CreateAdSetPage', () => {
  let component: CreateAdSetPage;
  let fixture: ComponentFixture<CreateAdSetPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateAdSetPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateAdSetPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
