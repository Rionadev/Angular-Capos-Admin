import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'app/api/salesledger/api.service';

@Component({
  selector: 'app-inventoryreports',
  templateUrl: './inventoryreports.component.html',
  styleUrls: ['./inventoryreports.component.scss']
})
export class InventoryreportsComponent implements OnInit {

  // Pagination

  totalItems: number = 100; // Total number of items
  countPerPage: number = 10; // Default items per page
  currentPage: number = 1;

  constructor(private customerService: CustomerService) { }

  ngOnInit(): void {
    this.fetchSearchItems();
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
              if (!this.soldProducts[el.product_id]) {
                this.soldProducts[el.product_id] = {
                  product_name: el.product_name,
                  qty: 0,
                  price: el.price,
                }
              }

              if (el.voided != 'false') {
                this.soldProducts[el.product_id].qty += el.qty;
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
    };
    // Add keyword to params if searchTerm is not empty
    if (this.searchTerm) {
      params.keyword = this.searchTerm;
    }
    this.customerService.fetchProducts(params).subscribe(
      (res) => {
        this.arr_productIDs = [];
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
}