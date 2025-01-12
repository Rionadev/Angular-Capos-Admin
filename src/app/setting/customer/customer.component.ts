import { Component, OnInit } from '@angular/core';
import { StoresService } from '../../api/stores/stores.service';
import { GroupsService } from '../../api/groups/groups.service';

export interface StoreData {
  social_link?: any;
  physical_address?: any;
  postal_address?: any;
  paypal?: any;
  stripe?: any;
  plan?: any;
  preferences?: any;
  active_widget?: any;
  domain_name?: string;
  profile_image?: string;
  logo?: string;
  default_tax?: string;
  user_switch_security?: number;
  active?: boolean;
  store_pickup?: boolean;
  short_description?: string;
  fcm_token?: string;
  uber_store_id?: string;
  theme_color?: string;
  customer_point_gift?: any;
  gift_rate?: number;
  dealer_rate?: number;
  _id?: string;
  private_web_address?: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  default_currency?: any;
  sliders?: any;
  banners?: any;
  services?: any;
  created_at?: string;
  __v?: number;
  click_collect?: boolean;
  phone?: string;
  sequence_number?: number;
  store_name?: string;
  template?: string;
  website?: string;
}

export interface GroupData {
  limit: number;
  _id: string;
  private_web_address: string;
  name: string;
  point_rates: any[];
  created_at: string;
  updated_at: string;
  __v: number;
}

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {

  // Form variable
  checkbox_point_used: boolean = false;
  checkbox_complex_point_used: boolean = false;
  checkbox_special_items_excluded_on_point: boolean = false;
  checkbox_on_issuing_new_card_customer_information_gathering_form_printed: boolean = false;
  checkbox_point_amount_displayed_as_number_instead_of_money_amount: boolean = false;
  checkbox_point_amount_applied_to_subtotal: boolean = false;
  checkbox_point_information_is_not_printed_on_receipt: boolean = false;
  checkbox_only_total_point_printed_on_receipt: boolean = false;
  checkbox_gift_card_usage_history_is_not_printed_on_receipt: boolean = false;
  checkbox_point_amount_displayed_on_Sale_window: boolean = false;
  checkbox_gift_bonus_added: boolean = false;
  checkbox_auto_custid_used: boolean = false;
  checkbox_dr_used: boolean = false;
  checkbox_customer_card_9_digits: boolean = false;
  checkbox_phone_number_can_not_used_as_card_number: boolean = false;
  checkbox_dealer_point_used: boolean = false;

  gift_rate: number = 0;
  dealer_rate: number = 0;

  cash: number = 0;
  credit: number = 0;
  debit: number = 0;

  customer_point_gift: string[] = [];

  storeData: StoreData;
  groupData: GroupData;

  constructor(private storesService: StoresService, private groupsService: GroupsService) { }

  ngOnInit(): void {
    this.onGetStores();
    this.onGetGroups();
  }

  onGetStores() {
    this.storesService.read({}).subscribe({
      next: (data) => {
        console.log('onGetStores', data);
        this.storeData = data;
        if (data.customer_point_gift.length > 0) {
          if (data.customer_point_gift.includes('point_used'))
            this.checkbox_point_used = true;
          if (data.customer_point_gift.includes('complex_point_used'))
            this.checkbox_complex_point_used = true;
          if (data.customer_point_gift.includes('special_items_excluded_on_point'))
            this.checkbox_special_items_excluded_on_point = true;
          if (data.customer_point_gift.includes('on_issuing_new_card_customer_information_gathering_form_printed'))
            this.checkbox_on_issuing_new_card_customer_information_gathering_form_printed = true;
          if (data.customer_point_gift.includes('point_amount_displayed_as_number_instead_of_money_amount'))
            this.checkbox_point_amount_displayed_as_number_instead_of_money_amount = true;
          if (data.customer_point_gift.includes('point_amount_applied_to_subtotal'))
            this.checkbox_point_amount_applied_to_subtotal = true;
          if (data.customer_point_gift.includes('point_information_is_not_printed_on_receipt'))
            this.checkbox_point_information_is_not_printed_on_receipt = true;
          if (data.customer_point_gift.includes('only_total_point_printed_on_receipt'))
            this.checkbox_only_total_point_printed_on_receipt = true;
          if (data.customer_point_gift.includes('gift_card_usage_history_is_not_printed_on_receipt'))
            this.checkbox_gift_card_usage_history_is_not_printed_on_receipt = true;
          if (data.customer_point_gift.includes('point_amount_displayed_on_Sale_window'))
            this.checkbox_point_amount_displayed_on_Sale_window = true;
          if (data.customer_point_gift.includes('gift_bonus_added'))
            this.checkbox_gift_bonus_added = true;
          if (data.customer_point_gift.includes('auto_custid_used'))
            this.checkbox_auto_custid_used = true;
          if (data.customer_point_gift.includes('dr_used'))
            this.checkbox_dr_used = true;
          if (data.customer_point_gift.includes('customer_card_9_digits'))
            this.checkbox_customer_card_9_digits = true;
          if (data.customer_point_gift.includes('phone_number_can_not_used_as_card_number'))
            this.checkbox_phone_number_can_not_used_as_card_number = true;
          if (data.customer_point_gift.includes('dealer_point_used'))
            this.checkbox_dealer_point_used = true;

          this.gift_rate = data.gift_rate;
          this.dealer_rate = data.dealer_rate;
        }
      },
      error: (err) => {
        console.error('Error fetching stores:', err);
      },
    });
  }

  onGetGroups() {
    this.groupsService.read({}).subscribe({
      next: (data) => {
        console.log('onGetGroups', data[0]);
        if (typeof data[0] != 'undefined') {
          this.groupData = data[0];
          if (data[0].point_rates.length > 0) {
            data.point_rates?.forEach(rate => {
              if (rate.payment == 'cash')
                this.cash = rate.rate;
              else if (rate.payment == 'credit')
                this.credit = rate.rate;
              else if (rate.payment == 'debit')
                this.debit = rate.rate;
              //console.log(`Rate: ${rate.rate}, Payment: ${rate.payment}, ID: ${rate._id}`);
            });
          }
        }
      },
      error: (err) => {
        console.error('Error fetching stores:', err);
      },
    });
  }

  onSave() {
    /* this.storeData.default_currency = this.storeData.default_currency._id; */
    /*     this.storeData.default_currency = this.storeData.default_currency._id;
        this.storeData.physical_address = this.storeData.physical_address._id;
        this.storeData.postal_address = this.storeData.postal_address._id; */

    if (this.storeData != null) {
      this.customer_point_gift = [];

      this.checkAndAddPermission(this.checkbox_point_used, "point_used");
      this.checkAndAddPermission(this.checkbox_point_used && this.checkbox_complex_point_used, "complex_point_used");

      this.checkAndAddPermission(this.checkbox_special_items_excluded_on_point, "special_items_excluded_on_point");
      this.checkAndAddPermission(this.checkbox_on_issuing_new_card_customer_information_gathering_form_printed, "on_issuing_new_card_customer_information_gathering_form_printed");
      this.checkAndAddPermission(this.checkbox_point_amount_displayed_as_number_instead_of_money_amount, "point_amount_displayed_as_number_instead_of_money_amount");
      this.checkAndAddPermission(this.checkbox_point_amount_applied_to_subtotal, "point_amount_applied_to_subtotal");
      this.checkAndAddPermission(this.checkbox_point_information_is_not_printed_on_receipt, "point_information_is_not_printed_on_receipt");
      this.checkAndAddPermission(this.checkbox_only_total_point_printed_on_receipt, "only_total_point_printed_on_receipt");
      this.checkAndAddPermission(this.checkbox_gift_card_usage_history_is_not_printed_on_receipt, "gift_card_usage_history_is_not_printed_on_receipt");
      this.checkAndAddPermission(this.checkbox_point_amount_displayed_on_Sale_window, "point_amount_displayed_on_Sale_window");
      this.checkAndAddPermission(this.checkbox_gift_bonus_added, "gift_bonus_added");
      this.checkAndAddPermission(this.checkbox_auto_custid_used, "auto_custid_used");
      this.checkAndAddPermission(this.checkbox_dr_used, "dr_used");
      this.checkAndAddPermission(this.checkbox_customer_card_9_digits, "customer_card_9_digits");
      this.checkAndAddPermission(this.checkbox_phone_number_can_not_used_as_card_number, "phone_number_can_not_used_as_card_number");
      this.checkAndAddPermission(this.checkbox_dealer_point_used, "dealer_point_used");

      this.storeData.customer_point_gift = this.customer_point_gift;
      this.storeData.gift_rate = this.checkbox_gift_bonus_added ? this.gift_rate : 0;
      this.storeData.dealer_rate = this.checkbox_dealer_point_used ? this.dealer_rate : 0;
      /* this.storeData.default_currency = this.storeData.default_currency._id;
      this.storeData.physical_address.country = this.storeData.physical_address.country._id;
      this.storeData.postal_address.country = this.storeData.postal_address.country._id; */
      this.storeData.default_currency = this.storeData.default_currency?._id;
      this.storeData.physical_address.country = this.storeData.physical_address.country?._id;
      this.storeData.postal_address.country = this.storeData.postal_address.country?._id;

      console.log("storeData", this.storeData);
      this.storesService.update(this.storeData).subscribe({
        next: (data) => {
          console.log(data);
        },
        error: (err) => {
          console.error('Error fetching stores:', err);
        },
      });
    }


    if (this.groupData != null) {

      this.groupData.point_rates = [
        {
          rate: this.cash,
          payment: "cash"
        },
        {
          rate: this.credit,
          payment: "credit"
        },
        {
          rate: this.debit,
          payment: "debit"
        }
      ];

      console.log("groupData", this.groupData);

      this.groupsService.update(this.groupData).subscribe({
        next: (data) => {
          console.log(data);
        },
        error: (err) => {
          console.error('Error fetching groups:', err);
        },
      });
    }
  }

  // Function to check and add permissions based on checkbox states
  checkAndAddPermission(checkbox: boolean, permission: string) {
    if (checkbox) {
      this.customer_point_gift.push(permission);
    }
  }

}
