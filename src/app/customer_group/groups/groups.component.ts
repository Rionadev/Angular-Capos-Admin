import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { CustomerService } from 'app/api/salesledger/api.service';


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
    point_rates: [{
      payment: 'Cash',
      rate: 0
    },
    {
      payment: 'Credit Card',
      rate: 0
    },
    {
      payment: 'Visa',
      rate: 0
    },
    {
      payment: 'Master',
      rate: 0
    },
    {
      payment: 'Amex',
      rate: 0
    },
    {
      payment: 'Discover',
      rate: 0
    },
    {
      payment: 'Diners',
      rate: 0
    },
    {
      payment: 'Jcb',
      rate: 0
    },
    {
      payment: 'Debit',
      rate: 0
    }, {
      payment: 'Gift',
      rate: 0
    }, {
      payment: 'Debit',
      rate: 0
    }, {
      payment: 'Rewards',
      rate: 0
    }, {
      payment: 'Others',
      rate: 0
    }, {
      payment: 'Other2',
      rate: 0
    }, {
      payment: 'FoodStamp',
      rate: 0
    }, {
      payment: 'Check',
      rate: 0
    }, {
      payment: 'EBT Cash',
      rate: 0
    }, {
      payment: 'ChargeAccount',
      rate: 0
    },]
  };
  selPointRates: any =
    {
      id: '',
      name: '',
      limit: 0,
      point_rates: [{
        payment: 'Cash',
        rate: 0
      },
      {
        payment: 'Credit Card',
        rate: 0
      },
      {
        payment: 'Visa',
        rate: 0
      },
      {
        payment: 'Master',
        rate: 0
      },
      {
        payment: 'Amex',
        rate: 0
      },
      {
        payment: 'Discover',
        rate: 0
      },
      {
        payment: 'Diners',
        rate: 0
      },
      {
        payment: 'Jcb',
        rate: 0
      },
      {
        payment: 'Debit',
        rate: 0
      }, {
        payment: 'Gift',
        rate: 0
      }, {
        payment: 'Debit',
        rate: 0
      }, {
        payment: 'Rewards',
        rate: 0
      }, {
        payment: 'Others',
        rate: 0
      }, {
        payment: 'Other2',
        rate: 0
      }, {
        payment: 'FoodStamp',
        rate: 0
      }, {
        payment: 'Check',
        rate: 0
      }, {
        payment: 'EBT Cash',
        rate: 0
      }, {
        payment: 'ChargeAccount',
        rate: 0
      },]
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
        // console.log(res.payments)
        if (res?.payments) {
          if (Object.keys(res.payments).length > 0) {
            console.log(res.payments);
            let paymentlist = [];
            // Your logic here for when paymentsratelist has keys
            res.payments.forEach(element => {
              paymentlist.push({
                payment: element,
                rate: 0
              });
            });
            this.selPointRates['point_rates'] = paymentlist;
            this.newPointRates['point_rates'] = paymentlist;
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
              point_rates: element.point_rates,
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

    // Initialize variables for average rate and payment type
    let averageRate = 0;
    let paymentType = '';

    // Check if point rates exist
    if (!pointRate.point_rates || pointRate.point_rates.length === 0) {
      console.error('No point rates available to calculate average.');
      return; // Exit if no rates
    }

    // Convert point rates to an array of objects
    const pointRatesArray = pointRate.point_rates.map(rate => ({
      payment: rate.payment,
      rate: Number(rate.rate) || 0 // Ensure rate is a number
    }));

    // Calculate the average rate
    const totalRate = pointRatesArray.reduce((sum, { rate }) => sum + rate, 0);
    averageRate = totalRate / pointRatesArray.length;

    // Prepare parameters for the service call
    const params = {
      name: pointRate.name,
      point_rates: pointRatesArray, // Use the array directly
      limit: pointRate.limit,
    };

    console.log('Average Rate:', averageRate);
    console.log('Parameters:', params);

    // Call the service to save the data
    if (pointRate.id) {
      const paramsWithId = { ...params, _id: pointRate.id };
      this.customerService.updateGroup(paramsWithId).subscribe(
        (res) => {
          this.fetchSearchItems(); // Fetch updated items
          this.isEdit = false; // Reset edit state
        },
        (error) => {
          console.error('Error updating customer data:', error);
          // Handle the error as needed
        }
      );
    } else {
      this.customerService.createGroup(params).subscribe(
        (res) => {
          this.fetchSearchItems(); // Fetch updated items
          this.isEdit = false; // Reset edit state
        },
        (error) => {
          console.error('Error creating customer data:', error);
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

  calculateAverage(rates: any[]): string {
    if (!rates || rates.length === 0) return '';

    // Calculate the total rate
    const totalRate = rates.reduce((sum, item) => sum + item.rate, 0);

    // Calculate the number of entries
    const numberOfEntries = rates.length;

    // Calculate the average
    const averageRate = totalRate / numberOfEntries;

    // Return the average rate formatted to two decimal places
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