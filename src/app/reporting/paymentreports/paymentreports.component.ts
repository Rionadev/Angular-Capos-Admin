import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CustomerService } from 'app/api/salesledger/api.service';

@Component({
    selector: 'app-paymentreports',
    templateUrl: './paymentreports.component.html',
    styleUrls: ['./paymentreports.component.scss']
})
export class PaymentreportsComponent implements OnInit {
    isModalOpen = false;
    transactions: any;
    selectedDateFrom: string = '';
    selectedDateTo: string = '';
    // startDate: string = this.getFormattedDate(new Date(Date.now() - 20 * 24 * 60 * 60 * 1000)); // 20 days ago
    // endDate: string = this.getFormattedDate(new Date()); // Today
    sotre_credit_amount = 0;
    cash_conceal_amount = 0;
    cash_amount = 0;
    credit_amount = 0;
    debit_amount = 0;
    refund_amount = 0;
    voided_amount = 0;

    total_sotre_credit_amount = 0;
    total_cash_conceal_amount = 0;
    total_cash_amount = 0;
    total_credit_amount = 0;
    total_debit_amount = 0;
    total_refund_amount = 0;
    total_voided_amount = 0;


    filteredTransactions: any;
    constructor(private customerService: CustomerService) { }

    setDateFromTo() {
        const today = new Date();
        const sevenDaysAgo = new Date(today);
        const oneDayAfter = new Date(today);

        sevenDaysAgo.setDate(today.getDate() - 1000); // Subtract 7 days
        oneDayAfter.setDate(today.getDate() + 1); // Subtract 7 days


        this.selectedDateFrom = sevenDaysAgo.toISOString().split('T')[0]; // Set the start date to 7 days ago
        this.selectedDateTo = oneDayAfter.toISOString().split('T')[0]; // Set the end date to today
    }
    init_rowtotal() {
        this.sotre_credit_amount = 0;
        this.cash_conceal_amount = 0;
        this.cash_amount = 0;
        this.credit_amount = 0;
        this.debit_amount = 0;
        this.refund_amount = 0;
        this.voided_amount = 0;

    }
    init_totalsum() {

        this.total_sotre_credit_amount = 0;
        this.total_cash_conceal_amount = 0;
        this.total_cash_amount = 0;
        this.total_credit_amount = 0;
        this.total_debit_amount = 0;
        this.total_refund_amount = 0;
        this.total_voided_amount = 0;
    }
    ngOnInit(): void {
        this.init_rowtotal();
        this.init_totalsum();
        this.setDateFromTo();
        this.fetchSearchItems();

    }
    fetchSearchItems() {
        this.init_rowtotal();
        this.init_totalsum();
        const params = {
            from: this.selectedDateFrom,
            to: this.selectedDateTo,
        };
        this.transactions = {};

        this.customerService.fetchPaymentHistory(params).subscribe(
            (res) => {

                let calc_total = {};
                this.filteredTransactions = res;
                if (Object.keys(res).length > 0) {
                    Object.entries(res).forEach(([key, value]: [key: any, value: any]) => {
                        calc_total[key] = {};
                        calc_total[key].sotre_credit_amount =
                            this.calc_store_credit('store_credit', value, key);
                        calc_total[key].cash_conceal_amount =
                            this.calc_store_credit('cash_concealed_total', value, key);
                        calc_total[key].cash_amount =
                            this.calc_store_credit('cash', value, key);

                        calc_total[key].credit_amount =
                            this.calc_store_credit('credit', value, key);


                        calc_total[key].debit_amount =
                            this.calc_store_credit('debit', value, key);

                        calc_total[key].refund_amount =
                            this.calc_store_credit('refunds', value, key);
                        calc_total[key].voided_amount =
                            this.calc_store_credit('voided', value, key);
                        calc_total[key].total_amount =
                            this.calc_store_credit('total', value, key);
                    });
                }
                this.filteredTransactions = calc_total;
                this.transactions = res;
                // console.log(this.transactions);
            },
            (error) => {
                console.error('Error fetching customer data:', error);
                // Handle the error as needed
            }
        );
    }
    close() {
        this.isModalOpen = false;
    }
    sel_row: any;
    showRow(date: any, rowdata) {
        this.sel_row = {
            date: date,
            sum: this.filteredTransactions[date],
            data: this.transactions[date]
        };

        console.log(this.sel_row);
        this.isModalOpen = true;

    }
    calc_store_credit(type: any, row: any, key: any) {

        let sum = 0;
        switch (type) {
            case 'store_credit':
                if (Object.keys(row?.openclose).length > 0) {
                    Object.entries(row.openclose).forEach(([key, value]: [key: any, value: any]) => {
                        sum += value?.open_value | 0;
                    });
                }
                this.sotre_credit_amount = sum;
                // this.filteredTransactions[key] =
                // {
                //     ...this.filteredTransactions[key],
                //     sotre_credit_amount: sum
                // };

                return sum == 0 ? '' : sum;
                break;
            case 'cash_concealed_total':
                if (Object.keys(row?.sales).length > 0) {
                    Object.entries(row.sales).forEach(([key, value]: [key: any, value: any]) => {
                        if (value.payment_status == 'cash') {
                            sum += value.total - value.total_paid;
                        }
                    });
                }
                this.cash_conceal_amount = sum;
                return sum == 0 ? '' : sum;

                break;
            case 'cash':
                if (Object.keys(row?.cash).length > 0) {
                    Object.entries(row.cash).forEach(([key, value]: [key: any, value: any]) => {
                        sum += value.transaction;
                    });
                }
                this.cash_amount = sum;
                // this.filteredTransactions[key] =
                // {
                //     ...this.filteredTransactions[key],
                //     cash_amount: sum
                // };

                return sum == 0 ? '' : sum;

                break;
            case 'credit':
                if (Object.keys(row?.sales).length > 0) {
                    Object.entries(row.sales).forEach(([key, value]: [key: any, value: any]) => {
                        if (value.payments.length > 0) {
                            value.payments.forEach(element => {
                                if (element.type == 'credit') {
                                    sum += element.amount;
                                }
                            });

                        }
                    });
                }
                this.credit_amount = sum;
                // this.filteredTransactions[key] =
                // {
                //     ...this.filteredTransactions[key],
                //     credit_amount: sum
                // };

                return sum == 0 ? '' : sum;


                break;
            case 'debit':
                if (Object.keys(row?.sales).length > 0) {
                    Object.entries(row.sales).forEach(([key, value]: [key: any, value: any]) => {
                        if (value.payments.length > 0) {
                            value.payments.forEach(element => {
                                if (element.type == 'debit') {
                                    sum += element.amount;
                                }
                            });

                        }
                    });
                }
                this.debit_amount = sum;
                // this.filteredTransactions[key] =
                // {
                //     ...this.filteredTransactions[key],
                //     debit_amount: sum
                // };


                return sum == 0 ? '' : sum;

                break;
            case 'refunds':
                if (Object.keys(row?.returns).length > 0) {
                    Object.entries(row.returns).forEach(([key, value]: [key: any, value: any]) => {
                        sum += value.total;
                    });
                }
                this.refund_amount = sum;
                // this.filteredTransactions[key] =
                // {
                //     ...this.filteredTransactions[key],
                //     refund_amount: sum
                // };
                return sum == 0 ? '' : sum;


                break;
            case 'voided':
                if (Object.keys(row?.voided).length > 0) {
                    Object.entries(row.voided).forEach(([key, value]: [key: any, value: any]) => {
                        sum += value.total;
                    });

                }
                this.voided_amount = sum;
                // this.filteredTransactions[key] =
                // {
                //     ...this.filteredTransactions[key],
                //     voided_amount: sum
                // };


                return sum == 0 ? '' : sum;

                break;
            case 'total':
                //calc total
                this.total_sotre_credit_amount += this.sotre_credit_amount;
                this.total_cash_conceal_amount += this.cash_conceal_amount;
                this.total_cash_amount += this.cash_amount;
                this.total_credit_amount += this.credit_amount;
                this.total_debit_amount += this.debit_amount;
                this.total_refund_amount += this.refund_amount;
                this.total_voided_amount += this.voided_amount;
                //calc row
                const total_sum = this.sotre_credit_amount +
                    this.cash_conceal_amount +
                    this.cash_amount +
                    this.credit_amount +
                    this.debit_amount +
                    this.refund_amount +
                    this.voided_amount;
                this.init_rowtotal();

                // this.filteredTransactions[key] =
                // {
                //     ...this.filteredTransactions[key],
                //     total_sum: total_sum
                // };

                return total_sum == 0 ? '' : total_sum;
                break;
            default:
                break;

        }
    }

    initToday() {
        this.setDateFromTo();
        this.fetchSearchItems();

    }


    getFormattedDate(date: Date): string {
        const d = new Date(date);
        return d.toISOString().split('T')[0]; // Format to YYYY-MM-DD
    }
}