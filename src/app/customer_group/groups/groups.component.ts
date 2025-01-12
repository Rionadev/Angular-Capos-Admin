import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { CustomerService } from 'app/api/salesledger/api.service';
interface PointRates {
  'Cash': number;
  'Credit Card': number;
  'Visa': number;
  'Master': number;
  'Amex': number;
  'Discover': number;
  'Diners': number;
  'Jcb': number;
  'Debit': number;
  'Gift': number;
  'Rewards': number;
  'Others': number;
  'Other2': number;
  'FoodStamp': number;
  'Check': number;
  'EBT Cash': number;
  'ChargeAccount': number;
};

interface PointRate {
  name: string;
  limit: number;
  point_rates: PointRates;
  isEditing?: boolean; // Optional property to track editing state
}

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit {
  @ViewChild('editDialog') editDialog!: ElementRef;
  constructor(@Inject('APP_CONFIG') private config: any, private customerService: CustomerService) { }
  isEdit = false;
  isDel = false;
  group_data: any;
  ngOnInit(): void {
    this.fetchSearchItems();
  }
  newPointRates: any = {
    name: '',
    limit: 0,
    point_rates: {
      'Cash': 0,
      'Credit Card': 0,
      'Visa': 0,
      'Master': 0,
      'Amex': 0,
      'Discover': 0,
      'Diners': 0,
      'Jcb': 0,
      'Debit': 0,
      'Gift': 0,
      'Rewards': 0,
      'Others': 0,
      'Other2': 0,
      'FoodStamp': 0,
      'Check': 0,
      'EBT Cash': 0,
      'ChargeAccount': 0,
    }
  };
  selPointRates: any =
    {
      id: '',
      name: '',
      limit: 0,
      point_rates: {
        'Cash': 0,
        'Credit Card': 0,
        'Visa': 0,
        'Master': 0,
        'Amex': 0,
        'Discover': 0,
        'Diners': 0,
        'Jcb': 0,
        'Debit': 0,
        'Gift': 0,
        'Rewards': 0,
        'Others': 0,
        'Other2': 0,
        'FoodStamp': 0,
        'Check': 0,
        'EBT Cash': 0,
        'ChargeAccount': 0,
      }
    };

  isEditing = false; // Controls the visibility of the edit modal
  isNoneViewing = true;
  editingPointRate: any; // Holds the point rate being edited
  stringToObject(rate_obj: any) {
    console.log(rate_obj);
    if (rate_obj.length > 0 || rate_obj == null) {
      // console.log(JSON.parse(rate_obj[0].payment));
      if (rate_obj[0].payment == '') {
        return null;
      } else {
        return JSON.parse(rate_obj[0].payment);
      }

    } else {
      return null;
    }
  }

  fetchSearchItems() {
    this.group_data = [];
    this.customerService.fetchPaymentType().subscribe(
      (res) => {
        // console.log(this.selPointRates);
        if (res?.payments) {
          let paymentsratelist = {};
          res.payments.forEach(element => {
            paymentsratelist[element] = 0;
          });
          // console.log(paymentsratelist);
          if (Object.keys(paymentsratelist).length > 0) {
            // Your logic here for when paymentsratelist has keys
            this.selPointRates['point_rates'] = paymentsratelist;
            this.newPointRates['point_rates'] = paymentsratelist;
          }
        }
      },
      (error) => {
        console.error('Error fetching customer data:', error);
        // Handle the error as needed
      }
    );
    this.customerService.fetchGroup().subscribe(
      (res) => {

        res.forEach(element => {
          this.group_data.push(
            {
              limit: element.limit,
              name: element.name,
              id: element._id,
              point_rates: this.stringToObject(element.point_rates),
            }
          )
        });
        console.log(this.group_data);
      },
      (error) => {
        console.error('Error fetching customer data:', error);
        // Handle the error as needed
      }
    );
  }
  createPointRate(): void {
    this.selPointRates = this.newPointRates;
    this.isEdit = true;

  }
  checkPointItems(pointRate: any): boolean {
    let emptyflag = true;
    if (pointRate.name == '' && pointRate.limit == 0) {

    } else {
      emptyflag = false;
    }
    return emptyflag;
  }
  editPointRate(pointRate: any): void {
    this.selPointRates = pointRate;
    this.isEdit = true;
  }

  savePointRate(pointRate: any): void {
    const flag = this.checkPointItems(pointRate);
    // Use flag if needed for additional logic
    if (flag) return;
    // Convert point rates to an array of objects
    let averageRate = 0;
    let paymenttype = '';
    if (pointRate.point_rates == null) {

    } else {
      const pointRatesArray = Object.entries(pointRate?.point_rates).map(([payment, rate]) => ({ payment, rate }));

      // Check if pointRatesArray is empty to avoid division by zero
      if (pointRatesArray === null) {
        console.error('No point rates available to calculate average.');
        return; // Exit if no rates
      }

      // Calculate the average rate
      const totalRate = pointRatesArray.reduce((sum, { rate }) => sum + Number(rate), 0);
      averageRate = totalRate / pointRatesArray.length;
      paymenttype = JSON.stringify(pointRate.point_rates);

    }

    // Prepare parameters for the service call

    const params = {
      name: pointRate.name,
      point_rates: [{
        payment: paymenttype, // Use stringified version if needed
        rate: averageRate
      }],
      limit: pointRate.limit,
    };

    console.log('Average Rate:', params);

    // Call the service to save the data
    if (pointRate.id) {
      const params1 = { ...params, _id: pointRate.id };
      this.customerService.updateGroup(params1).subscribe(
        (res) => {
          // Fetch updated items and reset edit state
          this.fetchSearchItems();
          this.isEdit = false;
        },
        (error) => {
          console.error('Error fetching customer data:', error);
          // Handle the error as needed
        }
      );
    } else {
      this.customerService.createGroup(params).subscribe(
        (res) => {
          // Fetch updated items and reset edit state
          this.fetchSearchItems();
          this.isEdit = false;
        },
        (error) => {
          console.error('Error fetching customer data:', error);
          // Handle the error as needed
        }
      );
    }

  }


  cancelEdit(pointRate: any): void {
    this.isEdit = false;
  }

  deletePointRate(pointRate: any) {
    console.log(pointRate.id)
    this.customerService.deleteGroup({
      _id: pointRate.id
    }).subscribe(
      (res) => {
        // Fetch updated items and reset edit state
        this.fetchSearchItems();
        this.isEdit = false;
        this.isDel = false;

      },
      (error) => {
        console.error('Error fetching customer data:', error);
        // Handle the error as needed
      }
    );
  }

  calculateAverage(rates: any) {
    if (rates == null) return '';
    let tsum = 0;
    // const totalRate = Object.values(rates).reduce((sum: number, rate: number) => sum + rate, 0);
    // Convert object values to an array and calculate total
    const totalRate = Object.values(rates).reduce((sum: number, item: number) => {
      tsum += item * 1;
      return sum * 1 + item * 1; // Accumulate the sum
    }, 0);

    // // // Calculate the number of entries
    const numberOfEntries: number = Object.keys(rates).length;

    // // // Calculate the average
    const averageRate: number = tsum / numberOfEntries;
    return averageRate.toFixed(2);
  }

  closeDialog() {
    // Logic to close the dialog
    this.isEdit = false;

  }
  delconfirm(pointdata: any) {
    this.selPointRates = pointdata;
    this.isDel = true;
  }

  cancelDel() {
    this.isDel = false;
  }

}