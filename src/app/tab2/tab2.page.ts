import { Component } from '@angular/core';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  amount: number = 0;
  fromUnit: string = '';
  toUnit: string = '';
  result: string = '0.00'; // Initialize result as a string for formatting
  selectedCategory: string = 'length';

  // Define types for unit categories
  private unitCategories: Record<string, { units: Record<string, number | ((value: number) => number)> }> = {
    length: {
      units: {
        meter: 1,
        kilometer: 1000,
        centimeter: 0.01,
        millimeter: 0.001
      }
    },
    mass: {
      units: {
        gram: 1,
        kilogram: 1000,
        milligram: 0.001,
        pound: 453.592
      }
    },
    time: {
      units: {
        second: 1,
        minute: 60,
        hour: 3600
      }
    },
    electricCurrent: {
      units: {
        ampere: 1
      }
    },
    temperature: {
      units: {
        kelvin: (value: number) => value,
        celsius: (value: number) => value + 273.15,
        fahrenheit: (value: number) => (value * 9 / 5) + 32 // Correct formula here
      }
    },
    luminosity: {
      units: {
        candela: 1
      }
    },
    amountOfSubstance: {
      units: {
        mole: 1
      }
    }
  };

  // Method to update units based on selected category
  updateUnits() {
    this.fromUnit = '';
    this.toUnit = '';
    this.result = '0.00'; // Reset result when updating units
  }

  convert() {
    const category = this.selectedCategory;
    const unitCategory = this.unitCategories[category];
    const fromFactor = unitCategory?.units[this.fromUnit];
    const toFactor = unitCategory?.units[this.toUnit];

    if (fromFactor && toFactor) {
      let convertedValue: number;

      if (category === 'temperature') {
        // Handle temperature conversion separately
        const tempInKelvin = typeof fromFactor === 'function' ? fromFactor(this.amount) : this.amount * (fromFactor as number);
        convertedValue = typeof toFactor === 'function' ? (toFactor as (value: number) => number)(tempInKelvin) : tempInKelvin / (toFactor as number);
      } else {
        convertedValue = (this.amount * (fromFactor as number)) / (toFactor as number);
      }

      this.result = convertedValue.toFixed(2);
    } else {
      this.result = '0.00';
    }
  }

  // Get units for the selected category
  getUnits(): string[] {
    return Object.keys(this.unitCategories[this.selectedCategory]?.units || {});
  }
}
