import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListeCampagnePage } from './liste-campagne.page';

describe('ListeCampagnePage', () => {
  let component: ListeCampagnePage;
  let fixture: ComponentFixture<ListeCampagnePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListeCampagnePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ListeCampagnePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
