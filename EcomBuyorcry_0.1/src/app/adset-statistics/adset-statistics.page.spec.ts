import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AdsetStatisticsPage } from './adset-statistics.page';

describe('AdsetStatisticsPage', () => {
  let component: AdsetStatisticsPage;
  let fixture: ComponentFixture<AdsetStatisticsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdsetStatisticsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AdsetStatisticsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
