import { Component, OnInit } from '@angular/core';
import { PoliciesService } from '../../api/policies/policies.service';

@Component({
  selector: 'app-policy',
  templateUrl: './policy.component.html',
  styleUrls: ['./policy.component.scss']
})
export class PolicyComponent implements OnInit {

  activeTab: string = 'modules'; // Default active tab

  // Modules
  checkbox_box_barcode: boolean = false;
  checkbox_buying_barcode: boolean = false;
  checkbox_same_code: boolean = false;
  checkbox_pdcode_pdbarcode: boolean = false;
  checkbox_size_of_upc: boolean = false;
  checkbox_10_digit_barcode: boolean = false;
  checkbox_price_included: boolean = false;
  checkbox_first_5_digit: boolean = false;
  checkbox_sale_price_used: boolean = false;
  checkbox_automatic_customer_id: boolean = false;
  checkbox_customer_info: boolean = false;
  checkbox_open_drawer: boolean = false;
  checkbox_cash_drawer: boolean = false;
  checkbox_quick_open: boolean = false;
  checkbox_debit_over: boolean = false;
  checkbox_cashier_pwd_prompt: boolean = false;
  checkbox_cashier_pwd_always: boolean = false;
  checkbox_discount_pwd_prompt: boolean = false;
  checkbox_sales_helper: boolean = false;
  checkbox_kg_instead: boolean = false;
  checkbox_weight_handled: boolean = false;
  checkbox_24_hour_service: boolean = false;
  checkbox_last_item: boolean = false;
  checkbox_alt_tab: boolean = false;
  checkbox_barcode_auto: boolean = false;
  checkbox_ar_account: boolean = false;
  checkbox_tran_summary: boolean = false;
  checkbox_pdcode_manual: boolean = false;
  checkbox_product_info: boolean = false;
  checkbox_canada_penny: boolean = false;
  checkbox_event_marketing: boolean = false;
  checkbox_barcode_not_used: boolean = false;

  //Prints
  checkbox_receipt_printed: boolean = false;
  checkbox_store_copy: boolean = false;
  checkbox_print_barcode: boolean = false;
  checkbox_techtrex: boolean = false;
  checkbox_description: boolean = false;
  checkbox_store_logo: boolean = false;
  checkbox_dont_print_customer: boolean = false;
  checkbox_small_size_printer: boolean = false;
  checkbox_invoice_printing: boolean = false;
  checkbox_dont_print_second: boolean = false;
  checkbox_dont_display: boolean = false;
  checkbox_print_product: boolean = false;
  checkbox_email_receipt: boolean = false;
  checkbox_print_bill: boolean = false;
  checkbox_print_cost: boolean = false;
  checkbox_price_not_print: boolean = false;
  checkbox_name2_printed: boolean = false;
  checkbox_vendor_code: boolean = false;

  //Batch
  checkbox_auto_batch_close: boolean = false;
  checkbox_email_inventory: boolean = false;
  checkbox_batch_report: boolean = false;
  checkbox_batch_all_category: boolean = false;
  checkbox_batch_category: boolean = false;
  checkbox_products_under: boolean = false;
  checkbox_summary_for_payment: boolean = false;
  checkbox_payment_summary: boolean = false;
  checkbox_cigarette_summary: boolean = false;
  checkbox_not_revenue: boolean = false;
  checkbox_sales_person: boolean = false;
  checkbox_kpos: boolean = false;
  checkbox_cashier_report: boolean = false;
  checkbox_cashier_closing: boolean = false;
  checkbox_canceled_products: boolean = false;
  checkbox_cannot_close_cashier: boolean = false;

  //Others
  scale_weight_unit: string = 'kg';
  units: string[] = ['kg', 'lb'];

  charge_limit: number = 0;
  margin_rate: number = 0;

  checkbox_foreign_currency_used: boolean = false;
  checkbox_vendor_margin_rate_used: boolean = false;

  checkbox_no_tax_on_whole_sale: boolean = false;
  checkbox_pd_age: boolean = false;
  checkbox_keyboard: boolean = false;
  checkbox_zero_item: boolean = false;
  checkbox_pd_button: boolean = false;
  checkbox_same_line: boolean = false;
  checkbox_pickup: boolean = false;
  checkbox_product_image: boolean = false;
  checkbox_no_tax_infor: boolean = false;
  checkbox_display_in_red: boolean = false;
  checkbox_display_other: boolean = false;

  //System
  sender_google_email: string = '';
  sender_pwd: string = '';
  smtp_server: string = '';

  checkbox_ecommerce: boolean = false;
  checkbox_cancel_void: boolean = false;
  checkbox_cashier_side: boolean = false;
  checkbox_franchise: boolean = false;
  checkbox_multiple: boolean = false;
  checkbox_hq: boolean = false;
  checkbox_data_collection: boolean = false;
  checkbox_data_collection_email: boolean = false;
  checkbox_each_store: boolean = false;
  checkbox_only_hq: boolean = false;
  checkbox_direct_sql: boolean = false;
  checkbox_customer_db: boolean = false;
  checkbox_daily_inventory: boolean = false;
  checkbox_inventory_used: boolean = false;
  checkbox_pi_based: boolean = false;
  checkbox_different_price: boolean = false;
  checkbox_restaurant_style: boolean = false;
  checkbox_fast_batch: boolean = false;
  checkbox_email_point: boolean = false;
  checkbox_grocery_style: boolean = false;
  checkbox_send_email: boolean = false;
  checkbox_paid_sms: boolean = false;
  checkbox_email_sms: boolean = false;
  checkbox_smart_phone: boolean = false;

  // Employee
  selectedWeekly: number = 1;
  selectedBiWeekly: number = 1;
  week: { name: string; value: number }[] = [
    { name: 'Sunday', value: 1 },
    { name: 'Monday', value: 2 },
    { name: 'Tuesday', value: 3 },
    { name: 'Wednesday', value: 4 },
    { name: 'Thursday', value: 5 },
    { name: 'Friday', value: 6 },
    { name: 'Saturday', value: 7 },
  ];
  selectedMonthly: number = 1;
  days: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];

  selectedStart: string = 'weekly';

  checkbox_auto_start_day: boolean = false;
  checkbox_round_up: boolean = false;
  checkbox_not_print: boolean = false;

  // Display and Save
  data: any;
  modules: string[] = [];
  prints: string[] = [];
  batch_cashier_closing: string[] = [];
  others_settings: string[] = [];
  system_settings: string[] = [];

  constructor(private policiesService: PoliciesService) { }

  ngOnInit(): void {
    this.onGetData();
  }

  onGetData() {
    this.policiesService.read({}).subscribe({
      next: (data) => {
        console.log('onGetData', data);
        this.data = data;
        this.onSetModules();
        this.onSetPrint();
        this.onSetBatch();
        this.onSetOthers();
        this.onSetSystem();
        this.onSetEmployee();
      },
      error: (err) => {
        console.error('Error fetching stores:', err);
      },
    });
  }

  onSetModules() {
    if (this.data.modules.length > 0) {
      if (this.data.modules.includes('box_barcode')) this.checkbox_box_barcode = true;
      if (this.data.modules.includes('buying_barcode')) this.checkbox_buying_barcode = true;
      if (this.data.modules.includes('same_code')) this.checkbox_same_code = true;
      if (this.data.modules.includes('pdcode_pdbarcode')) this.checkbox_pdcode_pdbarcode = true;
      if (this.data.modules.includes('size_of_upc')) this.checkbox_size_of_upc = true;
      if (this.data.modules.includes('0_digit_barcode')) this.checkbox_10_digit_barcode = true;
      if (this.data.modules.includes('price_included')) this.checkbox_price_included = true;
      if (this.data.modules.includes('first_5_digit')) this.checkbox_first_5_digit = true;
      if (this.data.modules.includes('sale_price_used')) this.checkbox_sale_price_used = true;
      if (this.data.modules.includes('automatic_customer_id')) this.checkbox_automatic_customer_id = true;
      if (this.data.modules.includes('customer_info')) this.checkbox_customer_info = true;
      if (this.data.modules.includes('open_drawer')) this.checkbox_open_drawer = true;
      if (this.data.modules.includes('cash_drawer')) this.checkbox_cash_drawer = true;
      if (this.data.modules.includes('quick_open')) this.checkbox_quick_open = true;
      if (this.data.modules.includes('debit_over')) this.checkbox_debit_over = true;
      if (this.data.modules.includes('cashier_pwd_prompt')) this.checkbox_cashier_pwd_prompt = true;
      if (this.data.modules.includes('cashier_pwd_always')) this.checkbox_cashier_pwd_always = true;
      if (this.data.modules.includes('discount_pwd_prompt')) this.checkbox_discount_pwd_prompt = true;
      if (this.data.modules.includes('sales_helper')) this.checkbox_sales_helper = true;
      if (this.data.modules.includes('kg_instead')) this.checkbox_kg_instead = true;
      if (this.data.modules.includes('weight_handled')) this.checkbox_weight_handled = true;
      if (this.data.modules.includes('24_hour_service')) this.checkbox_24_hour_service = true;
      if (this.data.modules.includes('last_item')) this.checkbox_last_item = true;
      if (this.data.modules.includes('alt_tab')) this.checkbox_alt_tab = true;
      if (this.data.modules.includes('barcode_auto')) this.checkbox_barcode_auto = true;
      if (this.data.modules.includes('ar_account')) this.checkbox_ar_account = true;
      if (this.data.modules.includes('tran_summary')) this.checkbox_tran_summary = true;
      if (this.data.modules.includes('pdcode_manual')) this.checkbox_pdcode_manual = true;
      if (this.data.modules.includes('product_info')) this.checkbox_product_info = true;
      if (this.data.modules.includes('canada_penny')) this.checkbox_canada_penny = true;
      if (this.data.modules.includes('event_marketing')) this.checkbox_event_marketing = true;
      if (this.data.modules.includes('barcode_not_used')) this.checkbox_barcode_not_used = true;
    }
  }

  onSetPrint() {
    if (this.data.prints.length > 0) {
      if (this.data.prints.includes('receipt_printed'))
        this.checkbox_receipt_printed = true;
  
      if (this.data.prints.includes('store_copy'))
        this.checkbox_store_copy = true;
  
      if (this.data.prints.includes('print_barcode'))
        this.checkbox_print_barcode = true;
  
      if (this.data.prints.includes('techtrex'))
        this.checkbox_techtrex = true;
  
      if (this.data.prints.includes('description'))
        this.checkbox_description = true;
  
      if (this.data.prints.includes('store_logo'))
        this.checkbox_store_logo = true;
  
      if (this.data.prints.includes('dont_print_customer'))
        this.checkbox_dont_print_customer = true;
  
      if (this.data.prints.includes('small_size_printer'))
        this.checkbox_small_size_printer = true;
  
      if (this.data.prints.includes('invoice_printing'))
        this.checkbox_invoice_printing = true;
  
      if (this.data.prints.includes('dont_print_second'))
        this.checkbox_dont_print_second = true;
  
      if (this.data.prints.includes('dont_display'))
        this.checkbox_dont_display = true;
  
      if (this.data.prints.includes('print_product'))
        this.checkbox_print_product = true;
  
      if (this.data.prints.includes('email_receipt'))
        this.checkbox_email_receipt = true;
  
      if (this.data.prints.includes('print_bill'))
        this.checkbox_print_bill = true;
  
      if (this.data.prints.includes('print_cost'))
        this.checkbox_print_cost = true;
  
      if (this.data.prints.includes('price_not_print'))
        this.checkbox_price_not_print = true;
  
      if (this.data.prints.includes('name2_printed'))
        this.checkbox_name2_printed = true;
  
      if (this.data.prints.includes('vendor_code'))
        this.checkbox_vendor_code = true;
    }
  }

  onSetBatch() {

    if (this.data.batch_cashier_closing.length > 0){
      if (this.data.batch_cashier_closing.includes('auto_batch_close'))
        this.checkbox_auto_batch_close = true;
  
      if (this.data.batch_cashier_closing.includes('email_inventory'))
        this.checkbox_email_inventory = true;
  
      if (this.data.batch_cashier_closing.includes('batch_report'))
        this.checkbox_batch_report = true;
  
      if (this.data.batch_cashier_closing.includes('batch_all_category'))
        this.checkbox_batch_all_category = true;
  
      if (this.data.batch_cashier_closing.includes('batch_category'))
        this.checkbox_batch_category = true;
  
      if (this.data.batch_cashier_closing.includes('products_under'))
        this.checkbox_products_under = true;
  
      if (this.data.batch_cashier_closing.includes('summary_for_payment'))
        this.checkbox_summary_for_payment = true;
  
      if (this.data.batch_cashier_closing.includes('payment_summary'))
        this.checkbox_payment_summary = true;
  
      if (this.data.batch_cashier_closing.includes('cigarette_summary'))
        this.checkbox_cigarette_summary = true;
  
      if (this.data.batch_cashier_closing.includes('not_revenue'))
        this.checkbox_not_revenue = true;
  
      if (this.data.batch_cashier_closing.includes('sales_person'))
        this.checkbox_sales_person = true;
  
      if (this.data.batch_cashier_closing.includes('kpos'))
        this.checkbox_kpos = true;
  
      if (this.data.batch_cashier_closing.includes('cashier_report'))
        this.checkbox_cashier_report = true;
  
      if (this.data.batch_cashier_closing.includes('cashier_closing'))
        this.checkbox_cashier_closing = true;
  
      if (this.data.batch_cashier_closing.includes('canceled_products'))
        this.checkbox_canceled_products = true;
  
      if (this.data.batch_cashier_closing.includes('cannot_close_cashier'))
        this.checkbox_cannot_close_cashier = true;
    }
  }

  onSetOthers() {
    this.scale_weight_unit = this.data.others.scale_weight_unit;
    this.charge_limit = this.data.others.charge_limit;
    this.margin_rate = this.data.others.margin_rate;

    this.checkbox_foreign_currency_used = this.data.others.foreign_currency_used;
    this.checkbox_vendor_margin_rate_used = this.data.others.vendor_margin_rate_used;

    if (this.data.others.settings.length > 0)
    {
      if (this.data.others.settings.includes('no_tax_on_whole_sale'))
        this.checkbox_no_tax_on_whole_sale = true;
  
      if (this.data.others.settings.includes('pd_age'))
        this.checkbox_pd_age = true;
  
      if (this.data.others.settings.includes('keyboard'))
        this.checkbox_keyboard = true;
  
      if (this.data.others.settings.includes('zero_item'))
        this.checkbox_zero_item = true;
  
      if (this.data.others.settings.includes('pd_button'))
        this.checkbox_pd_button = true;
  
      if (this.data.others.settings.includes('same_line'))
        this.checkbox_same_line = true;
  
      if (this.data.others.settings.includes('pickup'))
        this.checkbox_pickup = true;
  
      if (this.data.others.settings.includes('product_image'))
        this.checkbox_product_image = true;
  
      if (this.data.others.settings.includes('no_tax_infor'))
        this.checkbox_no_tax_infor = true;
  
      if (this.data.others.settings.includes('display_in_red'))
        this.checkbox_display_in_red = true;
  
      if (this.data.others.settings.includes('display_other'))
        this.checkbox_display_other = true;
    }

  }

  onSetSystem() {
    this.sender_google_email = this.data.system.sender_google_email;
    this.sender_pwd = this.data.system.sender_google_email;
    this.smtp_server = this.data.system.sender_google_email;

    if (this.data.system.settings.length > 0) {
      if (this.data.system.settings.includes('ecommerce'))
        this.checkbox_ecommerce = true;
  
      if (this.data.system.settings.includes('cancel_void'))
        this.checkbox_cancel_void = true;
  
      if (this.data.system.settings.includes('cashier_side'))
        this.checkbox_cashier_side = true;
  
      if (this.data.system.settings.includes('franchise'))
        this.checkbox_franchise = true;
  
      if (this.data.system.settings.includes('multiple'))
        this.checkbox_multiple = true;
  
      if (this.data.system.settings.includes('hq'))
        this.checkbox_hq = true;
  
      if (this.data.system.settings.includes('data_collection'))
        this.checkbox_data_collection = true;
  
      if (this.data.system.settings.includes('data_collection_email'))
        this.checkbox_data_collection_email = true;
  
      if (this.data.system.settings.includes('each_store'))
        this.checkbox_each_store = true;
  
      if (this.data.system.settings.includes('only_hq'))
        this.checkbox_only_hq = true;
  
      if (this.data.system.settings.includes('direct_sql'))
        this.checkbox_direct_sql = true;
  
      if (this.data.system.settings.includes('customer_db'))
        this.checkbox_customer_db = true;
  
      if (this.data.system.settings.includes('daily_inventory'))
        this.checkbox_daily_inventory = true;
  
      if (this.data.system.settings.includes('inventory_used'))
        this.checkbox_inventory_used = true;
  
      if (this.data.system.settings.includes('pi_based'))
        this.checkbox_pi_based = true;
  
      if (this.data.system.settings.includes('different_price'))
        this.checkbox_different_price = true;
  
      if (this.data.system.settings.includes('restaurant_style'))
        this.checkbox_restaurant_style = true;
  
      if (this.data.system.settings.includes('fast_batch'))
        this.checkbox_fast_batch = true;
  
      if (this.data.system.settings.includes('email_point'))
        this.checkbox_email_point = true;
  
      if (this.data.system.settings.includes('grocery_style'))
        this.checkbox_grocery_style = true;
  
      if (this.data.system.settings.includes('send_email'))
        this.checkbox_send_email = true;
  
      if (this.data.system.settings.includes('paid_sms'))
        this.checkbox_paid_sms = true;
  
      if (this.data.system.settings.includes('email_sms'))
        this.checkbox_email_sms = true;
  
      if (this.data.system.settings.includes('smart_phone'))
        this.checkbox_smart_phone = true;
    }

  }

  onSetEmployee() {
    this.checkbox_auto_start_day = this.data.employee_timesheet.auto_start_day;
    this.checkbox_round_up = this.data.employee_timesheet.round_up;
    this.checkbox_not_print = this.data.employee_timesheet.not_print;

    this.selectedStart = this.data.employee_timesheet.pay_start_day.mode;
    if (this.data.employee_timesheet.pay_start_day.mode == 'weekly') {
      this.selectedWeekly = this.data.employee_timesheet.pay_start_day.day;
    }
    else if (this.data.employee_timesheet.pay_start_day.mode == 'biweekly') {
      this.selectedBiWeekly = this.data.employee_timesheet.pay_start_day.day;
    }
    else if (this.data.employee_timesheet.pay_start_day.mode == 'monthly') {
      this.selectedMonthly = this.data.employee_timesheet.pay_start_day.day;
    }
  }

  onSave() {
    /* if (checkbox) {
      this.customer_point_gift.push(permission); */
    this.onSaveModules();
    this.onSavePrints();
    this.onSaveBatch();
    this.onSaveOthers();
    this.onSaveSystem();
    this.onSaveEmployee();

    console.log("groupData", this.data);
    this.policiesService.update(this.data).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (err) => {
        console.error('Error fetching groups:', err);
      },
    });

  }

  onSaveModules() {
    this.modules = [];
    if (this.checkbox_box_barcode == true) this.modules.push('box_barcode');
    if (this.checkbox_buying_barcode == true) this.modules.push('buying_barcode');
    if (this.checkbox_same_code == true) this.modules.push('same_code');
    if (this.checkbox_pdcode_pdbarcode == true) this.modules.push('pdcode_pdbarcode');
    if (this.checkbox_size_of_upc == true) this.modules.push('size_of_upc');
    if (this.checkbox_10_digit_barcode == true) this.modules.push('10_digit_barcode');
    if (this.checkbox_price_included == true) this.modules.push('price_included');
    if (this.checkbox_first_5_digit == true) this.modules.push('first_5_digit');
    if (this.checkbox_sale_price_used == true) this.modules.push('sale_price_used');
    if (this.checkbox_automatic_customer_id == true) this.modules.push('automatic_customer_id');
    if (this.checkbox_customer_info == true) this.modules.push('customer_info');
    if (this.checkbox_open_drawer == true) this.modules.push('open_drawer');
    if (this.checkbox_cash_drawer == true) this.modules.push('cash_drawer');
    if (this.checkbox_quick_open == true) this.modules.push('quick_open');
    if (this.checkbox_debit_over == true) this.modules.push('debit_over');
    if (this.checkbox_cashier_pwd_prompt == true) this.modules.push('cashier_pwd_prompt');
    if (this.checkbox_cashier_pwd_always == true) this.modules.push('cashier_pwd_always');
    if (this.checkbox_discount_pwd_prompt == true) this.modules.push('discount_pwd_prompt');
    if (this.checkbox_sales_helper == true) this.modules.push('sales_helper');
    if (this.checkbox_kg_instead == true) this.modules.push('kg_instead');
    if (this.checkbox_weight_handled == true) this.modules.push('weight_handled');
    if (this.checkbox_24_hour_service == true) this.modules.push('24_hour_service');
    if (this.checkbox_last_item == true) this.modules.push('last_item');
    if (this.checkbox_alt_tab == true) this.modules.push('alt_tab');
    if (this.checkbox_barcode_auto == true) this.modules.push('barcode_auto');
    if (this.checkbox_ar_account == true) this.modules.push('ar_account');
    if (this.checkbox_tran_summary == true) this.modules.push('tran_summary');
    if (this.checkbox_pdcode_manual == true) this.modules.push('pdcode_manual');
    if (this.checkbox_product_info == true) this.modules.push('product_info');
    if (this.checkbox_canada_penny == true) this.modules.push('canada_penny');
    if (this.checkbox_event_marketing == true) this.modules.push('event_marketing');
    if (this.checkbox_barcode_not_used == true) this.modules.push('barcode_not_used');
    this.data.modules = this.modules;
  }

  onSavePrints() {
    this.prints = [];
    console.log("onSavePrints");
    if (this.checkbox_receipt_printed == true)
      this.prints.push('receipt_printed');

    if (this.checkbox_store_copy == true)
      this.prints.push('store_copy');

    if (this.checkbox_print_barcode == true)
      this.prints.push('print_barcode');

    if (this.checkbox_techtrex == true)
      this.prints.push('techtrex');

    if (this.checkbox_description == true)
      this.prints.push('description');

    if (this.checkbox_store_logo == true)
      this.prints.push('store_logo');

    if (this.checkbox_dont_print_customer == true)
      this.prints.push('dont_print_customer');

    if (this.checkbox_small_size_printer == true)
      this.prints.push('small_size_printer');

    if (this.checkbox_invoice_printing == true)
      this.prints.push('invoice_printing');

    if (this.checkbox_dont_print_second == true)
      this.prints.push('dont_print_second');

    if (this.checkbox_dont_display == true)
      this.prints.push('dont_display');

    if (this.checkbox_print_product == true)
      this.prints.push('print_product');

    if (this.checkbox_email_receipt == true)
      this.prints.push('email_receipt');

    if (this.checkbox_print_bill == true)
      this.prints.push('print_bill');

    if (this.checkbox_print_cost == true)
      this.prints.push('print_cost');

    if (this.checkbox_price_not_print == true)
      this.prints.push('price_not_print');

    if (this.checkbox_name2_printed == true)
      this.prints.push('name2_printed');

    if (this.checkbox_vendor_code == true)
      this.prints.push('vendor_code');

    this.data.prints = this.prints;
  }

  onSaveBatch() {
    this.batch_cashier_closing = [];

    if (this.checkbox_auto_batch_close == true)
      this.batch_cashier_closing.push('auto_batch_close');

    if (this.checkbox_email_inventory == true)
      this.batch_cashier_closing.push('email_inventory');

    if (this.checkbox_batch_report == true)
      this.batch_cashier_closing.push('batch_report');

    if (this.checkbox_batch_all_category == true)
      this.batch_cashier_closing.push('batch_all_category');

    if (this.checkbox_batch_category == true)
      this.batch_cashier_closing.push('batch_category');

    if (this.checkbox_products_under == true)
      this.batch_cashier_closing.push('products_under');

    if (this.checkbox_summary_for_payment == true)
      this.batch_cashier_closing.push('summary_for_payment');

    if (this.checkbox_payment_summary == true)
      this.batch_cashier_closing.push('payment_summary');

    if (this.checkbox_cigarette_summary == true)
      this.batch_cashier_closing.push('cigarette_summary');

    if (this.checkbox_not_revenue == true)
      this.batch_cashier_closing.push('not_revenue');

    if (this.checkbox_sales_person == true)
      this.batch_cashier_closing.push('sales_person');

    if (this.checkbox_kpos == true)
      this.batch_cashier_closing.push('kpos');

    if (this.checkbox_cashier_report == true)
      this.batch_cashier_closing.push('cashier_report');

    if (this.checkbox_cashier_closing == true)
      this.batch_cashier_closing.push('cashier_closing');

    if (this.checkbox_canceled_products == true)
      this.batch_cashier_closing.push('canceled_products');

    if (this.checkbox_cannot_close_cashier == true)
      this.batch_cashier_closing.push('cannot_close_cashier');

    this.data.batch_cashier_closing = this.batch_cashier_closing;
  }

  onSaveOthers() {
    this.data.others.scale_weight_unit = this.scale_weight_unit;
    this.data.others.charge_limit = this.charge_limit;
    this.data.others.margin_rate = this.margin_rate;

    this.data.others.foreign_currency_used = this.checkbox_foreign_currency_used;
    this.data.others.vendor_margin_rate_used = this.checkbox_vendor_margin_rate_used;

    this.others_settings = [];

    if (this.checkbox_no_tax_on_whole_sale == true)
      this.others_settings.push('no_tax_on_whole_sale');

    if (this.checkbox_pd_age == true)
      this.others_settings.push('pd_age');

    if (this.checkbox_keyboard == true)
      this.others_settings.push('keyboard');

    if (this.checkbox_zero_item == true)
      this.others_settings.push('zero_item');

    if (this.checkbox_pd_button == true)
      this.others_settings.push('pd_button');

    if (this.checkbox_same_line == true)
      this.others_settings.push('same_line');

    if (this.checkbox_pickup == true)
      this.others_settings.push('pickup');

    if (this.checkbox_product_image == true)
      this.others_settings.push('product_image');

    if (this.checkbox_no_tax_infor == true)
      this.others_settings.push('no_tax_infor');

    if (this.checkbox_display_in_red == true)
      this.others_settings.push('display_in_red');

    if (this.checkbox_display_other == true)
      this.others_settings.push('display_other');

    this.data.others.settings = this.others_settings;
  }

  onSaveSystem() {

    if (this.checkbox_send_email == true) {
      this.data.system.sender_google_email = this.sender_google_email;
      this.data.system.sender_google_email = this.sender_pwd;
      this.data.system.sender_google_email = this.smtp_server;
    }

    this.system_settings = [];

    if (this.checkbox_ecommerce == true)
      this.system_settings.push('ecommerce');

    if (this.checkbox_cancel_void == true)
      this.system_settings.push('cancel_void');

    if (this.checkbox_cashier_side == true)
      this.system_settings.push('cashier_side');

    if (this.checkbox_franchise == true)
      this.system_settings.push('franchise');

    if (this.checkbox_multiple == true)
      this.system_settings.push('multiple');

    if (this.checkbox_hq == true)
      this.system_settings.push('hq');

    if (this.checkbox_data_collection == true)
      this.system_settings.push('data_collection');

    if (this.checkbox_data_collection_email == true && this.checkbox_data_collection == true)
      this.system_settings.push('data_collection_email');

    if (this.checkbox_each_store == true)
      this.system_settings.push('each_store');

    if (this.checkbox_only_hq == true)
      this.system_settings.push('only_hq');

    if (this.checkbox_direct_sql == true)
      this.system_settings.push('direct_sql');

    if (this.checkbox_customer_db == true)
      this.system_settings.push('customer_db');

    if (this.checkbox_daily_inventory == true)
      this.system_settings.push('daily_inventory');

    if (this.checkbox_inventory_used == true)
      this.system_settings.push('inventory_used');

    if (this.checkbox_pi_based == true)
      this.system_settings.push('pi_based');

    if (this.checkbox_different_price == true)
      this.system_settings.push('different_price');

    if (this.checkbox_restaurant_style == true)
      this.system_settings.push('restaurant_style');

    if (this.checkbox_fast_batch == true)
      this.system_settings.push('fast_batch');

    if (this.checkbox_email_point == true)
      this.system_settings.push('email_point');

    if (this.checkbox_grocery_style == true)
      this.system_settings.push('grocery_style');

    if (this.checkbox_send_email == true)
      this.system_settings.push('send_email');

    if (this.checkbox_paid_sms == true)
      this.system_settings.push('paid_sms');

    if (this.checkbox_email_sms == true)
      this.system_settings.push('email_sms');

    if (this.checkbox_smart_phone == true)
      this.system_settings.push('smart_phone');

    this.data.system.settings = this.system_settings;
  }

  onSaveEmployee() {
    this.data.employee_timesheet.auto_start_day = this.checkbox_auto_start_day;
    this.data.employee_timesheet.round_up = this.checkbox_round_up;
    this.data.employee_timesheet.not_print = this.checkbox_not_print;

    this.data.employee_timesheet.pay_start_day.mode = this.selectedStart;
    if (this.selectedStart == 'weekly') {
      this.data.employee_timesheet.pay_start_day.day = this.selectedWeekly;
    }
    else if (this.selectedStart == 'biweekly') {
      this.data.employee_timesheet.pay_start_day.day = this.selectedBiWeekly;
    }
    else if (this.selectedStart == 'monthly') {
      this.data.employee_timesheet.pay_start_day.day = this.selectedMonthly;
    }
  }

  setActive(tab: string): void {
    this.activeTab = tab;
  }
}
