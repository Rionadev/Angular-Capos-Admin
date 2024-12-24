import { Component, OnInit } from '@angular/core';
interface PointRates {
  cash: number;
  creditCard: number;
  Visa: number;
  Master: number;
  Amex: number;
  Discover: number;
  Diners: number;
  Jcb: number;
  Dbit: number;
  Gift: number;
  Rewards: number;
  Others: number;
  Other2: number;
  FoodStamp: number;
  Check: number;
  EBT_Cash: number;
  ChargeAccount: number;
}

interface PointRate {
  name: string;
  limit: number;
  rates: PointRates;
  isEditing?: boolean; // Optional property to track editing state
}
@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  pointRates: PointRate[] = [
    {
      name: 'Example Rate 1',
      limit: 100,
      rates: {
        cash: 10,
        creditCard: 20,
        Visa: 15,
        Master: 25,
        Amex: 5,
        Discover: 10,
        Diners: 0,
        Jcb: 0,
        Dbit: 0,
        Gift: 0,
        Rewards: 0,
        Others: 0,
        Other2: 0,
        FoodStamp: 0,
        Check: 0,
        EBT_Cash: 0,
        ChargeAccount: 0,
      },
      isEditing: false
    },
    {
      name: 'Example Rate 2',
      limit: 200,
      rates: {
        cash: 15,
        creditCard: 25,
        Visa: 20,
        Master: 30,
        Amex: 10,
        Discover: 5,
        Diners: 1,
        Jcb: 2,
        Dbit: 3,
        Gift: 4,
        Rewards: 3,
        Others: 1,
        Other2: 0,
        FoodStamp: 0,
        Check: 0,
        EBT_Cash: 0,
        ChargeAccount: 0,
      },
      isEditing: false
    },
    {
      name: 'Example Rate 3',
      limit: 150,
      rates: {
        cash: 5,
        creditCard: 15,
        Visa: 25,
        Master: 10,
        Amex: 5,
        Discover: 10,
        Diners: 0,
        Jcb: 0,
        Dbit: 0,
        Gift: 0,
        Rewards: 0,
        Others: 0,
        Other2: 0,
        FoodStamp: 0,
        Check: 0,
        EBT_Cash: 0,
        ChargeAccount: 0,
      },
      isEditing: false
    },
    {
      name: 'Example Rate 4',
      limit: 300,
      rates: {
        cash: 30,
        creditCard: 40,
        Visa: 35,
        Master: 20,
        Amex: 15,
        Discover: 10,
        Diners: 5,
        Jcb: 0,
        Dbit: 0,
        Gift: 0,
        Rewards: 0,
        Others: 0,
        Other2: 0,
        FoodStamp: 0,
        Check: 0,
        EBT_Cash: 0,
        ChargeAccount: 0,
      },
      isEditing: false
    },
    {
      name: 'Example Rate 5',
      limit: 250,
      rates: {
        cash: 20,
        creditCard: 30,
        Visa: 25,
        Master: 35,
        Amex: 10,
        Discover: 15,
        Diners: 0,
        Jcb: 0,
        Dbit: 0,
        Gift: 0,
        Rewards: 0,
        Others: 0,
        Other2: 0,
        FoodStamp: 0,
        Check: 0,
        EBT_Cash: 0,
        ChargeAccount: 0,
      },
      isEditing: false
    }
    // You can add more PointRates as needed
  ];


  editPointRate(pointRate: PointRate): void {
    pointRate.isEditing = true;
  }

  savePointRate(pointRate: PointRate): void {
    pointRate.isEditing = false;
  }

  cancelEdit(pointRate: PointRate): void {
    pointRate.isEditing = false;
  }

  calculateAverage(rates: PointRates): number {
    const total = Object.values(rates).reduce((acc, rate) => acc + rate, 0);
    const count = Object.keys(rates).length;
    return total / count;
  }

  isAnyEditing(): boolean {
    return this.pointRates.some(rate => rate.isEditing);
  }
}