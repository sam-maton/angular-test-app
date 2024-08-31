import { Component, inject } from '@angular/core';
import { HousingLocationComponent } from '../housing-location/housing-location.component';
import { HousingLocation } from '../housinglocation';
import { CommonModule } from '@angular/common';
import { HousingService } from '../housing.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HousingLocationComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  housingService: HousingService = inject(HousingService);
  constructor() {
    this.housingService.getAllHousingLocations().then((locations) => {
      this.housingLocationList = locations;
      this.filteredList = locations;
    });
  }
  housingLocationList: HousingLocation[] = [];
  filteredList: HousingLocation[] = [];

  filterResults(text: string) {
    if (!text) {
      this.filteredList = this.housingLocationList;
      return;
    }

    this.filteredList = this.housingLocationList.filter((housingLocation) =>
      housingLocation?.city.toLowerCase().includes(text.toLowerCase())
    );
  }
}
