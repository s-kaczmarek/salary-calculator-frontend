import { Component } from '@angular/core';
import { Http, URLSearchParams} from '@angular/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {

  title = 'app';
  amount: number = 0;
  calculations: CalculationsResult = {type:"nie wysłano", value: 0 };
  baseUrl: string = "http://localhost:4200/api/calculateNettSalaryInPLN";
  countries: Country[] = [
    { "id": 1, "name": "PL" },
    { "id": 2, "name": "UK" },
    { "id": 3, "name": "DE" }
  ];
  selectedCountry: Country = this.countries[0];

  constructor(private http: Http){};

  onSelect(countryId) { 
      this.selectedCountry = null;
      for (var i = 0; i < this.countries.length; i++)
      {
        if (this.countries[i].id == countryId) {
          this.selectedCountry = this.countries[i];
        }
      }
  };

  sendToServer() : void {
    let data = new URLSearchParams();
    data.append('country', this.selectedCountry.name);
    data.append('amount', this.amount.toString());
    var x: number = 100;

    this.http.get(this.baseUrl + "/" + data.get('country') + "/" + data.get('amount')).subscribe(result => {
          this.calculations = result.json() as CalculationsResult;
      }, error => console.error(error));
  };
}

export class CalculationsResult{
  type: string;
  value: number;
}

export class Country {
  id: number;
  name: string;
}

