import { Component, OnInit, Inject } from '@angular/core';
import { CustomerService } from 'app/api/salesledger/api.service';

@Component({
  selector: 'app-inventoryreports',
  templateUrl: './inventoryreports.component.html',
  styleUrls: ['./inventoryreports.component.scss']
})
export class InventoryreportsComponent implements OnInit {
  isShowdetailflag: boolean = false;
  // Pagination

  totalItems: number = 100; // Total number of items
  countPerPage: number = 10; // Default items per page
  currentPage: number = 1;
  sel_row: any;
  constructor(
    private customerService: CustomerService,
    @Inject('APP_CONFIG') private config: any,
  ) { }

  ngOnInit(): void {
    this.fetchSearchItems();
  }
  onBackdropClick() {
    this.isShowdetailflag = false;
  }

  arr_productIDs: any;

  searchTerm: string = '';

  products: any;

  filteredProducts: any;

  searchProducts() {
    // this.filteredProducts = this.products.filter((item: any) => {
    //   const productMatch = item.name.toLowerCase().includes(this.searchTerm.toLowerCase());
    //   const outletMatch = item.outlet?.name.toLowerCase().includes(this.searchTerm.toLowerCase());
    //   return productMatch || outletMatch;
    // });
  }
  soldProducts: any;
  fetchSoldProdcuts(product_ids: any) {
    // console.log(product_ids);
    this.customerService.getSoldProducts(product_ids).subscribe(
      (res) => {
        this.soldProducts = [];
        res.forEach(element => {
          if (element.products.length > 0) {
            element.products.forEach(el => {
              if (!this.soldProducts[el.product_id._id]) {
                this.soldProducts[el.product_id._id] = {
                  product_name: el.product_name,
                  qty: 0,
                  price: 0,
                  cost: 0,
                  products: []
                }
              }

              if (el.voided != 'false') {
                // console.log('-------------', el.product_id.supply_price,
                //   el.product_id.retail_price, 'qty:', el.qty,
                // );
                console.log(`cost= ${el.product_id.supply_price}*${el.qty}`);
                console.log(`price= ${el.product_id.retail_price}*${el.qty}`);

                this.soldProducts[el.product_id._id].qty += el.qty;
                this.soldProducts[el.product_id._id].price += el.qty * el.product_id.supply_price || 0;
                this.soldProducts[el.product_id._id].cost += el.qty * el.product_id.retail_price || 0;
                this.soldProducts[el.product_id._id].products.push(
                  {
                    product: el,
                    sold_date: element.created_at,
                    price: el.product_id.retail_price * el.qty || 0,
                    cost: el.product_id.supply_price * el.qty || 0,
                    qty: el.qty,
                    supply_price: el.product_id.supply_price || 0,
                    retail_price: el.product_id.retail_price || 0,

                  });
              }
            });

          }
        });
        console.log(this.soldProducts);
      },
      (error) => {
        console.error('Error fetching customer data:', error);
        // Handle the error as needed
      }
    );
  }
  fetchSearchItems() {
    let params: any = {
      range: 'all-factor',
      page: this.currentPage - 1,
      size: this.countPerPage,
      // tracking_inv: true,
    };
    // Add keyword to params if searchTerm is not empty
    if (this.searchTerm) {
      params.keyword = this.searchTerm;
    }
    this.customerService.fetchProducts(params).subscribe(
      (res) => {
        this.arr_productIDs = [];
        this.totalItems = res?.totalElements || 100;
        res.data.forEach(element => {
          this.arr_productIDs.push(element._id);
        });
        this.fetchSoldProdcuts(this.arr_productIDs);
        this.products = res.data;
        this.filteredProducts = [...this.products];

      },
      (error) => {
        console.error('Error fetching customer data:', error);
        // Handle the error as needed
      }
    );
  }

  onPageChanged(page: number) {
    this.paginateItems(page);
  }

  onCountPerPageChanged(count: number) {
    if (this.countPerPage != count) {
      this.countPerPage = count; // Update count per page
      this.paginateItems(1);
    }
  }
  paginateItems(page: number) {
    this.currentPage = page;
    /* const startIndex = (page - 1) * this.countPerPage; // Default items per page
    const endIndex = startIndex + this.countPerPage; */
    //this.paginatedItems = this.allItems.slice(startIndex, endIndex);
    this.onGetData();
  }
  onGetData() {
    const page = (this.currentPage - 1).toString();
    const size = (this.countPerPage).toString();
    console.log(this.countPerPage);
    console.log(this.currentPage);
    this.fetchSearchItems();

  }


  getPlain(): string {
    return this.filteredProducts.map(item =>
      `<tr>
        <td>${item.name}</td>
        <td>${item?.outlet?.name || ''}</td>
        <td>${Number(item.inventory - (this.soldProducts && this.soldProducts[item._id]?.qty || 0)).toFixed(0)}</td>
        <td>$${Number(item.supply_price || 0).toFixed(2)}</td>
        <td>$${Number(item.inventory - (this.soldProducts && this.soldProducts[item._id]?.qty || 0) * item.supply_price).toFixed(2)}</td>
        <td>${Number(item.reorder_point || 0).toFixed(0)}</td>
        <td>$${Number(item.reorder_point * item.supply_price).toFixed(2)}</td>
      </tr>`
    ).join('');
  }
  selRow(item: any) {
    this.isShowdetailflag = true;
    this.sel_row = item;
    console.log('selected row', item);
    console.log('sold items', this.soldProducts[item._id]);

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
                        <strong>Inventory Report</strong>
                    </div>
                <div class="date">
                <p>PWA: ${this.config.private_web_address}</p>
                </div>
                <div>
                    <table>
                        <tr>
                            <th>Product</th>
                            <th>Outlet</th>
                            <th>Current Stock</th>
                            <th>Item Value</th>
                            <th>Stock Value</th>
                            <th>Reorder Point</th>
                            <th>Reorder Amount</th>
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
    return this.filteredProducts.map(item =>
      `${item.name},${item?.outlet?.name || ''},${Number(item.inventory - (this.soldProducts && this.soldProducts[item._id]?.qty || 0)).toFixed(0)},$${Number(item.supply_price || 0).toFixed(2)},$${Number(item.inventory - (this.soldProducts && this.soldProducts[item._id]?.qty || 0) * item.supply_price).toFixed(2)},${Number(item.reorder_point || 0).toFixed(0)},$${Number(item.reorder_point * item.supply_price).toFixed(2)}\n`
    ).join('');
  }

  exportContent() {
    const header = 'product, outlet, current stock, item value, stock value, reorder point, reorder amount\n';
    const rows = this.getCSVPlain();
    const content = header + rows;

    const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);

    link.setAttribute('href', url);
    link.setAttribute('download', 'inventory_report.csv');
    link.style.visibility = 'hidden';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}