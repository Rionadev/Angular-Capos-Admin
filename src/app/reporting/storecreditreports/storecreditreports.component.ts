import { Component, OnInit, Inject } from '@angular/core';
import { CustomerService } from 'app/api/salesledger/api.service';

@Component({
  selector: 'app-storecreditreports',
  templateUrl: './storecreditreports.component.html',
  styleUrls: ['./storecreditreports.component.scss']
})
export class StorecreditreportsComponent implements OnInit {

  customers: any = [];
  searchTerm: string = '';
  filteredCustomers: any = [];
  constructor(
    private customerService: CustomerService,
    @Inject('APP_CONFIG') private config: any,
  ) { }

  ngOnInit(): void {
    this.fetchSearchItems();

  }
  fetchSearchItems() {

    this.customerService.fetchCumtomerData().subscribe(
      (res) => {
        this.customers = res;
        this.filteredCustomers = res;
      },
      (error) => {
        console.error('Error fetching customer data:', error);
        // Handle the error as needed
      }
    );
  }


  // Method to search customers based on the search term
  searchCustomers(): void {
    if (this.searchTerm) {
      this.filteredCustomers = this.customers.filter(customer =>
        customer.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        customer.email.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredCustomers = this.customers; // Reset to original customers
    }
  }

  // Method to calculate totals for the specified field
  getTotal(field: any): number {
    if (this.filteredCustomers.length == 0) return;

    return this.filteredCustomers.reduce((sum, customer) => {
      return sum + (customer[field] || 0); // Ensure to handle undefined fields
    }, 0);
  }

  getPlain(): string {
    return this.filteredCustomers.map(row =>
      `<tr><td>${row.name}</td><td>${row.email}</td><td>$${row.total_issued.toFixed(2) || 0}</td><td>$${row.total_redeemed.toFixed(2) || 0}</td><td>$${row.credit.toFixed(2) || 0}</td></tr>`
    ).join('');
  }

  printContent() {
    const plainData = this.getPlain();
    const printWindow = window.open('Z-Report', 'Z-Report', 'height=3508,width=2480');
    /* printWindow?.document.write('<html><head><title>Print</title>');
    printWindow?.document.write('</head><body >');
    printWindow?.document.write(document.getElementById('print-section')?.innerHTML || '');
    printWindow?.document.write('</body></html>'); */
    printWindow.document.write(`
        <html>
            <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.3.1/css/bootstrap.min.css" media="print"/>
            <link href="https://maxcdn.bootstrapcdn.com/font-awesome/latest/css/font-awesome.min.css" rel="stylesheet">
            <link href='https://fonts.googleapis.com/css?family=Roboto:400,700,300' rel='stylesheet' type='text/css'>
            <title>Z-Report</title>
            <style>
                @media print {
                        app-root > * { display: none; }
                        app-root app-print-layout { display: block; }
                    }

                    .header {
                        font-size: 38px; 
                        text-align: center;
                        margin-top: 56px;
                        margin-bottom: 56px;
                        color: tomato;
                        position: relative;
                    }

                    .date {
                        font-size: 18px;
                        line-height: 0.5;
                        margin-bottom: 56px;
                        color: green;
                    }
                    
                    table, td, th {
                        padding: 6px 8px;
                    }
                    
                    tr:nth-child(even){background-color: #f2f2f2}

                    th {
                      background-color: #666699;
                      color: white;
                    }

                    tr {
                        border-bottom: 1px solid #666699;
                    }
                    
                    table {
                        width: 100%;
                        border-collapse: collapse;
                        text-align: left;
                        font-size: 18px;
                    }
                    
                    .image {
                        position: absolute;
                        right: 0px;
                        top: -56px;
                        
                    }

                    .footer {
                        position: fixed;
                        font-size: 18px;
                        bottom: 0px;
                    }

                    .footer div{
                        width: 100%;
                        text-align: center;
                    }
            </style>
            <body onload="window.print()">
                <div class="header">
                  <div class="image">
                          <img src="https://caposgt.com/assets/image/interface/home/logo.png" width="175" height="50"/>
                  </div>
                  <strong>Store Credit Report</strong>
                </div>
                <div class="date">
                  <p>PWA: ${this.config.private_web_address}</p>
                </div>
                <div>
                    <table>
                        <tr>
                            <th>Customer Name</th>
                            <th>Email</th>
                            <th>Total Issued</th>
                            <th>Total Redeemed</th>
                            <th>Balance</th>
                        </tr>
                        <tr>
                            <td><strong>Total</strong></td>
                            <td></td>
                            <td><strong>$${ this.getTotal('total_issued') || 0}</strong></td>
                            <td><strong>$${ this.getTotal('total_redeemed') || 0}</strong></td>
                            <td><strong>$${ this.getTotal('credit') || 0}</strong></td>
                        </tr>
                        ${plainData}
                    </table>
                <div>
                <div class="footer">
                    <div></div>
                <div>
            </body>
        </html>
    `);

    printWindow?.document.close();
    //printWindow?.focus();
    //printWindow?.print();
    //printWindow?.document.close();
    //printWindow?.close();
    setTimeout(function () {
      //printWindow?.print();
      printWindow.close();
    }, 1000);
  }

  getCSVPlain(): string {
    return this.filteredCustomers.map(row =>
      `${row.name},${row.email},$${row.total_issued.toFixed(2) || 0},$${row.total_redeemed.toFixed(2) || 0},$${row.credit.toFixed(2) || 0}\n`
    ).join('');
  }

  exportContent() {
    const header = 'cutomer name, email, total issued, total redeemed ,balance\n';
    const total = `Total,,$${ this.getTotal('total_issued') },$${ this.getTotal('total_redeemed') },$${ this.getTotal('credit') }\n`;
    const rows = this.getCSVPlain();
    const content = header + total + rows;

    const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);

    link.setAttribute('href', url);
    link.setAttribute('download', 'store_credit_report.csv');
    link.style.visibility = 'hidden';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

}
