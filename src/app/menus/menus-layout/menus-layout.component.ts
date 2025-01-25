import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../api/products/api.service';
import { ProducttypesService } from '../../api/producttypes/producttypes.service';
import { BrandsService } from '../../api/brands/brands.service';
import { SuppliersService } from '../../api/suppliers/suppliers.service';
import { OutletsService } from '../../api/outlets/outlets.service';
import { TaxesService } from '../../api/taxes/taxes.service';
import { AttributesService } from '../../api/attributes/attributes.service';
import { TagsService } from '../../api/tags/tags.service';
import { ToastService } from '../../component/toast/toast.service';

@Component({
  selector: 'app-menus-layout',
  templateUrl: './menus-layout.component.html',
  styleUrls: ['./menus-layout.component.scss']
})
export class MenusLayoutComponent implements OnInit {

  data: any[] = [];

  // For Select component
  types: { name: string; value: string }[] = [];
  brands: { name: string; value: string }[] = [];
  suppliers: { name: string; value: string }[] = [];
  outlets: { name: string; value: string }[] = [];
  taxes: { name: string; value: string }[] = [];

  isProductContentVisible: boolean = false; // Initially hidden for add or editing.
  isImportContentVisible: boolean = false; // Initially hidden for add or editing.
  currentRow: any = this.resetRow();
  selectedItemId: number | null = null; // Variable to track which row is expanded

  cities: string[] = ['Search', 'Search 1', 'Search 2', 'Search 3'];
  selectedCity: string = 'Search'; // Default selected value

  // Pagination
  totalItems: number = 100; // Total number of items
  /* allItems: number[] = Array.from({ length: 100 }, (_, i) => i + 1); // Example data
  paginatedItems: number[] = []; */
  countPerPage: number = 10; // Default items per page
  currentPage: number = 1;

  // Delete
  currentDeleteID: string = '';
  isDeleteModal: boolean = false;

  // Search
  keyword: string = '';
  searchTypes: { name: string; value: string }[] = [{ name: "All Types", value: '' }];
  searchBrands: { name: string; value: string }[] = [{ name: "All Brands", value: '' }];
  searchSuppliers: { name: string; value: string }[] = [{ name: "All Suppliers", value: '' }];
  searchAttributes: { name: string; value: string }[] = [{ name: "All Attributes", value: '' }];
  searchTags: { name: string; value: string }[] = [{ name: "All Tags", value: '' }];
  searchStatus: { name: string; value: boolean }[] = [{ name: "All Status", value: null }, { name: "Active", value: true }, { name: "Inactive", value: false }];

  type: string = '';
  brand: string = '';
  supplier: string = '';
  attribute: string = '';
  tag: string = '';
  status: boolean = null;

  // Variants
  currentVariants: any[] = [];
  currentVariantRow: any = this.resetVariantRow();
  searchAttributesForVariants: { name: string; value: string }[] = [];
  currentDeleteVariant: string = '';

  // VariantProducts
  currentVariantProducts: any[] = [];
  currentVariantProductRow: any = this.resetVariantProductRow();
  currentDeleteVariantProduct: string = '';

  constructor(
    private productsService: ProductsService,
    private productTypesService: ProducttypesService,
    private brandsService: BrandsService,
    private suppliersService: SuppliersService,
    private outletsService: OutletsService,
    private taxesService: TaxesService,
    private attributesService: AttributesService,
    private tagsService: TagsService,
    private toastService: ToastService,
  ) { }

  ngOnInit(): void {
    // No dataService to subscribe to; rows are managed directly.
    this.paginateItems(1); // Initialize pagination
    this.onGetTypes();
    this.onGetBrands();
    this.onGetSuppliers();
    this.onGetOutlets();
    this.onGetTaxes();
    this.onGetAttribues();
    this.onGetTags();
  }

  /* this.toastService.showToast('This is a success message!', 'success', 3000);
    this.toastService.showToast('This is a info message!', 'info', 3000);
    this.toastService.showToast('This is a warning message!', 'warning', 3000);
    this.toastService.showToast('This is a error message!', 'error', 3000); */

  onAddVariant() {
    if (!this.currentVariantRow.attribute || this.currentVariantRow.value.length == 0)
    {
      this.toastService.showToast('Please check out!', 'warning', 3000);
      return;
    }
    
    if(this.existVariantInVariantsTable(this.currentVariantRow.attribute))
    {
      // Update existing row
      const index = this.currentVariants.findIndex((row) => row.attribute === this.currentVariantRow.attribute);
      if (index !== -1) {
        this.currentVariants[index] = { ...this.currentVariantRow }; // Update row
      }
    }
    else
      this.currentVariants.push(this.currentVariantRow);  

    this.currentVariantRow = this.resetVariantRow();
  }

  showVariantDeleteModal(variant: string) {
    this.currentDeleteVariant = variant;
    this.isDeleteModal = true;
  }

  onDeleteVariant()
  {
    this.currentVariants = this.currentVariants.filter((row) => row.attribute !== this.currentDeleteVariant); // Remove row by id */
    this.currentDeleteVariant = '';
    //this.isContentVisible = false;
  }

  onEditVariant(row)
  {
    /* this.rows = this.rows.filter((row) => row.id !== id); // Remove row by id */
    //this.isContentVisible = false;
    this.currentVariantRow = { ...row };
  }

  resetVariantRow():any
  {
    return {
      attribute: '',
      value: [],
    }
  }

  getNameByAttributeID(id) {
    const foundVariant = this.searchAttributes.find(obj => obj.value === id);
    return foundVariant ? foundVariant.name : null;
  }

  existVariantInVariantsTable(id)
  {
    const foundVariant = this.currentVariants.find(obj => obj.attribute == id);
    return foundVariant ? true : false;
  }

  // For Variant Products
  onAddVariantProduct() {
    if (!this.currentVariantProductRow.name)
    {
      this.toastService.showToast('Please check out!', 'warning', 3000);
      return;
    }
    
    if(this.existVariantInVariantProductsTable(this.currentVariantProductRow.name))
    {
      // Update existing row
      const index = this.currentVariantProducts.findIndex((row) => row.name === this.currentVariantProductRow.name);
      if (index !== -1) {
        this.currentVariantProducts[index] = { ...this.currentVariantProductRow }; // Update row
      }
    }
    else
      this.currentVariantProducts.push(this.currentVariantProductRow);  

    this.currentVariantProductRow = this.resetVariantProductRow();
  }

  showVariantProductDeleteModal(name: string) {
    this.currentDeleteVariantProduct = name;
    this.isDeleteModal = true;
  }

  onDeleteVariantProduct()
  {
    this.currentVariantProducts = this.currentVariantProducts.filter((row) => row.name !== this.currentDeleteVariantProduct); // Remove row by id */
    this.currentDeleteVariantProduct = '';
    //this.isContentVisible = false;
  }

  onEditVariantProduct(row)
  {
    /* this.rows = this.rows.filter((row) => row.id !== id); // Remove row by id */
    //this.isContentVisible = false;
    this.currentVariantProductRow = { ...row };
  }

  existVariantInVariantProductsTable(name)
  {
    const foundVariant = this.currentVariantProducts.find(obj => obj.name == name);
    return foundVariant ? true : false;
  }

  resetVariantProductRow():any
  {
    return {
      name: '',
      enabled: false,
    }
  }

  onGetAttribues() {
    this.attributesService.read({}).subscribe({
      next: (data) => {
        console.log('onGetData', data);
        data.forEach(item => {
          this.searchAttributes.push({ name: item.name, value: item._id });
          this.searchAttributesForVariants.push({ name: item.name, value: item._id });
        });
      },
      error: (err) => {
        console.error('Error fetching attributes:', err);
      },
    });
  }

  onGetTags() {
    this.tagsService.read({}).subscribe({
      next: (data) => {
        console.log('onGetData', data);
        data.forEach(item => {
          this.searchTags.push({ name: item.name, value: item._id });
        });
      },
      error: (err) => {
        console.error('Error fetching tags:', err);
      },
    });
  }

  onGetOutlets() {
    this.outletsService.read({}).subscribe({
      next: (data) => {
        console.log('onGetData', data);
        data.forEach(item => {
          this.outlets.push({ name: item.name, value: item._id });
        });
      },
      error: (err) => {
        console.error('Error fetching outlets:', err);
      },
    });
  }

  onGetTaxes() {
    this.taxesService.read({}).subscribe({
      next: (data) => {
        console.log('onGetData', data);
        data.forEach(item => {
          this.taxes.push({ name: item.name, value: item._id });
        });
      },
      error: (err) => {
        console.error('Error fetching taxes:', err);
      },
    });
  }

  onCreateNewSupplier(newOption: { name: string; value: string }) {
    console.log('New option added:', newOption);
    this.suppliersService.create(newOption).subscribe({
      next: (data) => {
        console.log('onGetData', data);
        this.suppliers.push({ name: data.result.name, value: data.result._id });
        this.currentRow.supplier = data.result._id;
      },
      error: (err) => {
        console.error('Error fetching suppliers:', err);
      },
    });
  }

  onGetSuppliers() {
    this.suppliersService.read({}).subscribe({
      next: (data) => {
        console.log('onGetData', data);
        data.forEach(item => {
          this.suppliers.push({ name: item.name, value: item._id });
          this.searchSuppliers.push({ name: item.name, value: item._id });
        });
      },
      error: (err) => {
        console.error('Error fetching suppliers:', err);
      },
    });
  }

  onGetTypes() {
    this.productTypesService.read({}).subscribe({
      next: (data) => {
        console.log('onGetData', data);
        data.forEach(item => {
          this.types.push({ name: item.name, value: item._id });
          this.searchTypes.push({ name: item.name, value: item._id });
        });
      },
      error: (err) => {
        console.error('Error fetching types:', err);
      },
    });
  }

  onGetBrands() {
    this.brandsService.read({}).subscribe({
      next: (data) => {
        console.log('onGetData', data);
        data.forEach(item => {
          this.brands.push({ name: item.name, value: item._id });
          this.searchBrands.push({ name: item.name, value: item._id });
        });
      },
      error: (err) => {
        console.error('Error fetching brands:', err);
      },
    });
  }

  onGetData() {
    const page = (this.currentPage - 1).toString();
    const size = (this.countPerPage).toString();
    this.productsService.read({ range: 'all-factor', page: page, size: size }).subscribe({
      next: (data) => {
        console.log('onGetData', data);
        this.data = data?.data;
        this.totalItems = data?.totalElements;
        //
      },
      error: (err) => {
        console.error('Error fetching stores:', err);
      },
    });
  }

  getDate(dateTimeString: string): string {
    // Split the string by 'T' and return the first part (date)
    return dateTimeString.split("T")[0];
  }

  // Change events for supply price, markup, retail price

  onSupplyPriceChange(event: KeyboardEvent) {
    if (['Enter', 'Tab'].includes(event.key)) {
      event.preventDefault(); // Prevent only for specific keys
      console.log(`${event.key} key action prevented`);
    }
    if (this.currentRow.supply_price == '') this.currentRow.supply_price = 0;
    if (this.currentRow.markup == '') this.currentRow.markup = 0;
    this.currentRow.retail_price = this.currentRow.supply_price * (this.currentRow.markup / 100 + 1);
    this.onReorderAmount();
  }

  onReorderAmount() {
    this.currentRow.reorder_amount = this.currentRow.supply_price * this.currentRow.reorder_point;
  }

  onMarkUpChange(event: KeyboardEvent) {
    if (['Enter', 'Tab'].includes(event.key)) {
      event.preventDefault(); // Prevent only for specific keys
      console.log(`${event.key} key action prevented`);
    }
    if (this.currentRow.supply_price == '') this.currentRow.supply_price = 0;
    if (this.currentRow.markup == '') this.currentRow.markup = 0;
    this.currentRow.retail_price = this.currentRow.supply_price * (this.currentRow.markup / 100 + 1);
  }

  onRetailPriceChange(event: KeyboardEvent) {
    if (['Enter', 'Tab'].includes(event.key)) {
      event.preventDefault(); // Prevent only for specific keys
      console.log(`${event.key} key action prevented`);
    }
    if (this.currentRow.supply_price == '') this.currentRow.supply_price = 0;
    if (this.currentRow.markup == '') this.currentRow.markup = 0;
    if (this.currentRow.retail_price == '') this.currentRow.markup = 0;
    this.currentRow.markup = (this.currentRow.retail_price / this.currentRow.supply_price * 100 - 100).toFixed(2);
  }

  onGetNewBarCode() {
    this.productsService.getNewBarCode({}).subscribe({
      next: (data) => {
        console.log('onGetData', data);
        this.currentRow.barcode = data?.barcode;
        //
      },
      error: (err) => {
        console.error('Error fetching barcode:', err);
      },
    });
  }

  toggleDetails(itemId: number): void {
    console.log(itemId);
    this.selectedItemId = this.selectedItemId === itemId ? null : itemId; // Toggle selection //this.selectedItemId === itemId ? null : 
  }

  toggleProductContent(): void {
    this.isProductContentVisible = !this.isProductContentVisible; // Toggle the visibility
    this.isImportContentVisible = false;
  }

  onHideAddProductContent(): void {
    this.isProductContentVisible = false;
    this.currentRow = this.resetRow();
  }


  toggleImportContent(): void {
    this.isImportContentVisible = !this.isImportContentVisible; // Toggle the visibility
    this.isProductContentVisible = false;
  }

  saveRow(): void {
    this.currentRow.variants = [...this.currentVariants];
    this.currentRow.variant_products = [...this.currentVariantProducts];

    if (this.currentRow._id) {
      this.productsService.update(this.currentRow).subscribe({
        next: (data) => {
          console.log('saveRow', data);
          this.onGetData();
        },
        error: (err) => {
          console.error('Error fetching product:', err);
        },
      });
    } else {
      this.productsService.create(this.currentRow).subscribe({
        next: (data) => {
          console.log('saveRow', data);
          this.onGetData();
        },
        error: (err) => {
          console.error('Error fetching product:', err);
        },
      });
    }

    this.currentVariants = [];
    this.currentVariantProducts = [];
    this.currentRow = this.resetRow();
    this.isProductContentVisible = false;
  }

  editRow(row: any): void {
    this.currentRow = { ...row }; // Clone the row to avoid direct edits

    this.currentRow.brand = row.brand?._id;
    this.currentRow.type = row.type?._id;
    this.currentRow.supplier = row.supplier?._id;
    this.currentRow.tax = row.tax?._id;

    this.currentVariantProducts = row.variant_products;
    this.currentVariants =  row.variants;

    this.currentDeleteVariant = '';
    this.currentDeleteVariantProduct = '';

    //this.currentRow.outlet = row.outlet?._id;
    console.log("edit", this.currentRow);
    this.isProductContentVisible = true;
  }

  showDeleteModal(id: string) {
    this.currentDeleteID = id;
    this.isDeleteModal = true;
  }

  closeDeleteModal() {
    this.isDeleteModal = false;
    this.currentDeleteVariant = '';
    this.currentDeleteVariantProduct = '';
  }

  deleteRow() {
    /* this.rows = this.rows.filter((row) => row.id !== id); // Remove row by id */
    //this.isContentVisible = false;
    if (this.currentDeleteVariant != '')
      this.onDeleteVariant();
    else if (this.currentDeleteVariantProduct != '')
      this.onDeleteVariantProduct();
    else if (this.currentDeleteID != '')
      this.productsService.delete({ _id: this.currentDeleteID }).subscribe({
        next: (data) => {
          console.log('onGetData', data);
          this.currentPage = 1;
          this.onGetData();
          //
        },
        error: (err) => {
          console.error('Error fetching products:', err);
        },
      });
    /* this.rows = this.rows.filter((row) => row.id !== this.currentDeleteID); // Remove row by id
    this.isDeleteModal = false; */
    this.isDeleteModal = false;
  }

  cancelEdit(): void {
    this.currentRow = this.resetRow();
    this.isProductContentVisible = false;
  }

  private resetRow(): any {
    return {
      tag: [],
      barcode: '',
      feature: { featured: false, new_product: false, on_sale: false, hot_offer: false },
      supply_price: 0,
      markup: 0,
      retail_price: 0,
    };
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

  printBarcode() {
    const printWindow = window.open('Z-Report', 'Z-Report', 'height=800,width=600');
    /* printWindow?.document.write('<html><head><title>Print</title>');3508;2480
    printWindow?.document.write('</head><body >');
    printWindow?.document.write(document.getElementById('print-section')?.innerHTML || '');
    printWindow?.document.write('</body></html>'); */
    printWindow.document.write(`
          <html lang="en">
          <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Barcode Test</title>
              <script src="https://cdnjs.cloudflare.com/ajax/libs/jsbarcode/3.11.0/JsBarcode.all.min.js"></script>
              <style>
                .content {
                  margin-top: 36px;
                  width: 100%;
                  display: flex;
                  justify-content: center;
                }
              </style>
          </head>
          <body onload="window.print()">
              <div class="content"><svg id="barcode"></svg></div>
              <script>
                  JsBarcode("#barcode", "${ this.currentRow.barcode}", {
                      format: "CODE128",
                      width: 2,
                      height: 100,
                      displayValue: true
                  });
              </script>
          </body>
          </html>
        `);

    printWindow?.document.close();
    setTimeout(function () {
      printWindow.close();
    }, 1000);
  }

  changeVariantProducts() {
    this.currentVariantProductRow.reorder_amount = this.currentVariantProductRow.supply_price * this.currentVariantProductRow.reorder_point;
    this.currentVariantProductRow.retail_price = this.currentVariantProductRow.supply_price * this.currentVariantProductRow.markup;
  }

  onClear() {
    this.type = '';
    this.brand = '';
    this.supplier = '';
    this.attribute = '';
    this.tag = '';
    this.keyword = '';
    this.onGetData();
  }

  onSearch() {
    const page = (this.currentPage - 1).toString();
    const size = (this.countPerPage).toString();
    this.productsService.read(
      { 
        range: 'all-factor', 
        page: page, 
        size: size,
        type: this.type,
        brand: this.brand,
        supplier: this.supplier,
        attribute: this.attribute,
        tag: this.tag,
        keyword: this.keyword,
      }
    ).subscribe({
      next: (data) => {
        console.log('onGetData', data);
        this.data = data?.data;
        this.totalItems = data?.totalElements;
        //
      },
      error: (err) => {
        console.error('Error fetching stores:', err);
      },
    });
  }
}

/*
variant_products: [
  {
      name: String,
      sku: String,            
      supplier_code: String,
      supply_price: {type: Number, default: 0},
      retail_price: {type: Number, default: 0},
      enabled: {type: Boolean, default: true},
      inventory: {type: Number, default: 0},
      reorder_point: {type: Number, default: 0},
      reorder_amount: {type: Number, default: 0},
      markup: {type: Number, default: 0},
      image: {type: String, default: ''},
      pair: [Number],
      pair_str: String
  }
],
variants: [
  {
      attribute: {type: mongoose.Schema.Types.ObjectId, ref: 'Attribute', default: null},
      value: [String]
  }
], 
*/