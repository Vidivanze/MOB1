import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { StockValidationPage } from './stock-validation.page';

describe('StockValidationPage', () => {
  let component: StockValidationPage;
  let fixture: ComponentFixture<StockValidationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockValidationPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(StockValidationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
