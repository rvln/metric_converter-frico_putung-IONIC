import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { Tab2Page } from './tab2.page';

describe('Tab2Page', () => {
  let component: Tab2Page;
  let fixture: ComponentFixture<Tab2Page>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Tab2Page],
      imports: [IonicModule.forRoot(), FormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(Tab2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should convert meters to kilometers', () => {
    component.amount = 1000;
    component.fromUnit = 'meter';
    component.toUnit = 'kilometer';
    component.convert();
    expect(Number(component.result)).toBeCloseTo(1, 4); // Compare with 4 decimal places
  });

  it('should convert grams to kilograms', () => {
    component.amount = 5000;
    component.fromUnit = 'gram';
    component.toUnit = 'kilogram';
    component.convert();
    expect(Number(component.result)).toBeCloseTo(5, 4); // Compare with 4 decimal places
  });

  it('should convert seconds to minutes', () => {
    component.amount = 120;
    component.fromUnit = 'second';
    component.toUnit = 'minute';
    component.convert();
    expect(Number(component.result)).toBeCloseTo(2, 4); // Compare with 4 decimal places
  });

  // Add more tests as needed
});
