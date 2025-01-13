import { Component, OnInit } from '@angular/core';
import { RolesService } from '../../api/roles/roles.service';
import { ToastService } from '../../component/toast/toast.service';

export interface TableRow {
  _id: string;
  name: string;
  permissions: string[];
  private_web_address: string;
  updated_at: string;
  _v: number;
}

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})

export class RolesComponent implements OnInit {

  data: TableRow[] = [];

  isAddRoleContentVisible: boolean = false; // Initially hidden for add or editing.
  isEditableRow: boolean = false;
  isDeleteModal: boolean = false;
  currentRow: TableRow = this.resetRow();
  currentDeleteName: string = '';

  // for checkboxes in adding content
  checkbox_show_product_costs: boolean = false;
  checkbox_print_labels: boolean = false;
  checkbox_apply_discounts: boolean = false;
  checkbox_create_on_account_sales: boolean = false;
  checkbox_issue_store_credit: boolean = false;
  checkbox_perform_cash: boolean = false;
  checkbox_make_sales: boolean = false;
  checkbox_perform_sale: boolean = false;
  checkbox_void_sales: boolean = false;
  checkbox_close_registers: boolean = false;
  checkbox_export_customer: boolean = false;
  checkbox_remove_customer: boolean = false;
  checkbox_add_customer_groups: boolean = false;
  checkbox_add_customers: boolean = false;
  checkbox_add_customer: boolean = false;
  checkbox_perform_supplier: boolean = false;
  checkbox_create_products: boolean = false;
  checkbox_perform_inventory: boolean = false;
  checkbox_perform_stock: boolean = false;
  checkbox_create_price_books: boolean = false;
  checkbox_create_product_type: boolean = false;
  checkbox_create_supplier: boolean = false;
  checkbox_create_brand: boolean = false;
  checkbox_create_product_attribute: boolean = false;
  checkbox_view_sales: boolean = false;
  checkbox_view_reporting: boolean = false;
  checkbox_only_own_sales: boolean = false;
  checkbox_all_sales_mode: boolean = false;
  checkbox_access_ecommerce: boolean = false;
  checkbox_manage_role: boolean = false;
  checkbox_manage_outlet: boolean = false;
  checkbox_add_cashier: boolean = false;
  checkbox_add_manager: boolean = false;
  checkbox_enable_add_ons: boolean = false;
  checkbox_manage_payment_type: boolean = false;
  checkbox_manage_tax: boolean = false;
  checkbox_manage_loyalty: boolean = false;
  checkbox_manage_hardware: boolean = false;
  checkbox_manage_keys: boolean = false;
  checkbox_refund: boolean = false;

  role_name: string = '';
  permissions: string[] = [];

  constructor(
    private rolesService: RolesService, 
    private toastService: ToastService
  ) { }

  toggleAddRoleContent(): void {
    this.role_name = '';
    this.isEditableRow = false;
    this.isAddRoleContentVisible = !this.isAddRoleContentVisible; // Toggle the visibility
  }

  ngOnInit(): void {
    this.onGetRoles();
  }

  saveRow() {
    this.currentRow = this.resetRow();
    this.isAddRoleContentVisible = false;
  }

  editRow(row: TableRow) {
    this.isEditableRow = true;
    this.currentRow = { ...row }; // Clone the row to avoid direct edits
    this.isAddRoleContentVisible = true;

    //console.log("Edit Row Permissions", row.permissions);
    this.role_name = row.name;
    this.onDeselectAll();

    if (row.permissions.includes('show_product_costs'))
      this.checkbox_show_product_costs = true;

    if (row.permissions.includes('print_labels'))
      this.checkbox_print_labels = true;

    if (row.permissions.includes('apply_discounts'))
      this.checkbox_apply_discounts = true;

    if (row.permissions.includes('create_on_account_sales'))
      this.checkbox_create_on_account_sales = true;

    if (row.permissions.includes('issue_store_credit'))
      this.checkbox_issue_store_credit = true;

    if (row.permissions.includes('perform_cash'))
      this.checkbox_perform_cash = true;

    if (row.permissions.includes('make_sales'))
      this.checkbox_make_sales = true;

    if (row.permissions.includes('perform_sale'))
      this.checkbox_perform_sale = true;

    if (row.permissions.includes('void_sales'))
      this.checkbox_void_sales = true;

    if (row.permissions.includes('close_registers'))
      this.checkbox_close_registers = true;

    if (row.permissions.includes('export_customer'))
      this.checkbox_export_customer = true;

    if (row.permissions.includes('remove_customer'))
      this.checkbox_remove_customer = true;

    if (row.permissions.includes('add_customer_groups'))
      this.checkbox_add_customer_groups = true;

    if (row.permissions.includes('add_customers'))
      this.checkbox_add_customers = true;

    if (row.permissions.includes('add_customer'))
      this.checkbox_add_customer = true;

    if (row.permissions.includes('perform_supplier'))
      this.checkbox_perform_supplier = true;

    if (row.permissions.includes('create_products'))
      this.checkbox_create_products = true;

    if (row.permissions.includes('perform_inventory'))
      this.checkbox_perform_inventory = true;

    if (row.permissions.includes('perform_stock'))
      this.checkbox_perform_stock = true;

    if (row.permissions.includes('create_price_books'))
      this.checkbox_create_price_books = true;

    if (row.permissions.includes('create_product_type'))
      this.checkbox_create_product_type = true;

    if (row.permissions.includes('create_supplier'))
      this.checkbox_create_supplier = true;

    if (row.permissions.includes('create_brand'))
      this.checkbox_create_brand = true;

    if (row.permissions.includes('create_product_attribute'))
      this.checkbox_create_product_attribute = true;

    if (row.permissions.includes('view_sales'))
      this.checkbox_view_sales = true;

    if (row.permissions.includes('view_reporting'))
      this.checkbox_view_reporting = true;

    if (row.permissions.includes('only_own_sales'))
      this.checkbox_only_own_sales = true;

    if (row.permissions.includes('all_sales_mode'))
      this.checkbox_all_sales_mode = true;

    if (row.permissions.includes('access_ecommerce'))
      this.checkbox_access_ecommerce = true;

    if (row.permissions.includes('manage_role'))
      this.checkbox_manage_role = true;

    if (row.permissions.includes('manage_outlet'))
      this.checkbox_manage_outlet = true;

    if (row.permissions.includes('add_cashier'))
      this.checkbox_add_cashier = true;

    if (row.permissions.includes('add_manager'))
      this.checkbox_add_manager = true;

    if (row.permissions.includes('enable_add_ons'))
      this.checkbox_enable_add_ons = true;

    if (row.permissions.includes('manage_payment_type'))
      this.checkbox_manage_payment_type = true;

    if (row.permissions.includes('manage_tax'))
      this.checkbox_manage_tax = true;

    if (row.permissions.includes('manage_loyalty'))
      this.checkbox_manage_loyalty = true;

    if (row.permissions.includes('manage_hardware'))
      this.checkbox_manage_hardware = true;

    if (row.permissions.includes('manage_keys'))
      this.checkbox_manage_keys = true;

    if (row.permissions.includes('refund'))
      this.checkbox_refund = true;

  }

  showDeleteModal(name: string) {
    this.currentDeleteName = name;
    this.isDeleteModal = true;
  }

  closeDeleteModal() {
    this.isDeleteModal = false;
  }

  deleteRow() {
    this.data = this.data.filter((row) => row.name !== this.currentDeleteName);
    this.rolesService.delete({name: this.currentDeleteName}).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (err) => {
        console.error('Error fetching roles:', err);
      },
    });
    this.isDeleteModal = false;
    /* this.rows = this.rows.filter((row) => row.id !== this.currentDeleteID); // Remove row by id
    this.isDeleteModal = false; */
  }

  cancelEdit() {
    this.currentRow = this.resetRow();
    this.isAddRoleContentVisible = false;
  }

  private resetRow(): TableRow {
    return {
      _id: '',
      name: '',
      permissions: [],
      private_web_address: '',
      updated_at: '',
      _v: 0
    };
  }

  onSelectAll() {
    this.checkbox_show_product_costs = true;
    this.checkbox_print_labels = true;
    this.checkbox_apply_discounts = true;
    this.checkbox_create_on_account_sales = true;
    this.checkbox_issue_store_credit = true;
    this.checkbox_perform_cash = true;
    this.checkbox_make_sales = true;
    this.checkbox_perform_sale = true;
    this.checkbox_void_sales = true;
    this.checkbox_close_registers = true;
    this.checkbox_export_customer = true;
    this.checkbox_remove_customer = true;
    this.checkbox_add_customer_groups = true;
    this.checkbox_add_customers = true;
    this.checkbox_add_customer = true;
    this.checkbox_perform_supplier = true;
    this.checkbox_create_products = true;
    this.checkbox_perform_inventory = true;
    this.checkbox_perform_stock = true;
    this.checkbox_create_price_books = true;
    this.checkbox_create_product_type = true;
    this.checkbox_create_supplier = true;
    this.checkbox_create_brand = true;
    this.checkbox_create_product_attribute = true;
    this.checkbox_view_sales = true;
    this.checkbox_view_reporting = true;
    this.checkbox_only_own_sales = true;
    this.checkbox_all_sales_mode = true;
    this.checkbox_access_ecommerce = true;
    this.checkbox_manage_role = true;
    this.checkbox_manage_outlet = true;
    this.checkbox_add_cashier = true;
    this.checkbox_add_manager = true;
    this.checkbox_enable_add_ons = true;
    this.checkbox_manage_payment_type = true;
    this.checkbox_manage_tax = true;
    this.checkbox_manage_loyalty = true;
    this.checkbox_manage_hardware = true;
    this.checkbox_manage_keys = true;
    this.checkbox_refund = true;
  }

  onSaveRole() {

    if (this.role_name.trim() == "")
      return;
    this.permissions = [];

    /* if(this.checkbox_show_product_costs == true)
      this.permissions.push("show_product_costs"); */
    this.checkAndAddPermission(this.checkbox_show_product_costs, "show_product_costs");
    this.checkAndAddPermission(this.checkbox_print_labels, "print_labels");
    this.checkAndAddPermission(this.checkbox_apply_discounts, "apply_discounts");
    this.checkAndAddPermission(this.checkbox_create_on_account_sales, "create_on_account_sales");
    this.checkAndAddPermission(this.checkbox_issue_store_credit, "issue_store_credit");
    this.checkAndAddPermission(this.checkbox_perform_cash, "perform_cash");
    this.checkAndAddPermission(this.checkbox_make_sales, "make_sales");
    this.checkAndAddPermission(this.checkbox_perform_sale, "perform_sale");
    this.checkAndAddPermission(this.checkbox_void_sales, "void_sales");
    this.checkAndAddPermission(this.checkbox_close_registers, "close_registers");
    this.checkAndAddPermission(this.checkbox_export_customer, "export_customer");
    this.checkAndAddPermission(this.checkbox_remove_customer, "remove_customer");
    this.checkAndAddPermission(this.checkbox_add_customer_groups, "add_customer_groups");
    this.checkAndAddPermission(this.checkbox_add_customers, "add_customers");
    this.checkAndAddPermission(this.checkbox_add_customer, "add_customer");
    this.checkAndAddPermission(this.checkbox_perform_supplier, "perform_supplier");
    this.checkAndAddPermission(this.checkbox_create_products, "create_products");
    this.checkAndAddPermission(this.checkbox_perform_inventory, "perform_inventory");
    this.checkAndAddPermission(this.checkbox_perform_stock, "perform_stock");
    this.checkAndAddPermission(this.checkbox_create_price_books, "create_price_books");
    this.checkAndAddPermission(this.checkbox_create_product_type, "create_product_type");
    this.checkAndAddPermission(this.checkbox_create_supplier, "create_supplier");
    this.checkAndAddPermission(this.checkbox_create_brand, "create_brand");
    this.checkAndAddPermission(this.checkbox_create_product_attribute, "create_product_attribute");
    this.checkAndAddPermission(this.checkbox_view_sales, "view_sales");
    this.checkAndAddPermission(this.checkbox_view_reporting, "view_reporting");
    this.checkAndAddPermission(this.checkbox_only_own_sales, "only_own_sales");
    this.checkAndAddPermission(this.checkbox_all_sales_mode, "all_sales_mode");
    this.checkAndAddPermission(this.checkbox_access_ecommerce, "access_ecommerce");
    this.checkAndAddPermission(this.checkbox_manage_role, "manage_role");
    this.checkAndAddPermission(this.checkbox_manage_outlet, "manage_outlet");
    this.checkAndAddPermission(this.checkbox_add_cashier, "add_cashier");
    this.checkAndAddPermission(this.checkbox_add_manager, "add_manager");
    this.checkAndAddPermission(this.checkbox_enable_add_ons, "enable_add_ons");
    this.checkAndAddPermission(this.checkbox_manage_payment_type, "manage_payment_type");
    this.checkAndAddPermission(this.checkbox_manage_tax, "manage_tax");
    this.checkAndAddPermission(this.checkbox_manage_loyalty, "manage_loyalty");
    this.checkAndAddPermission(this.checkbox_manage_hardware, "manage_hardware");
    this.checkAndAddPermission(this.checkbox_manage_keys, "manage_keys");
    this.checkAndAddPermission(this.checkbox_refund, "refund");

    if(!this.isEditableRow) {
      const params = {
        name: this.role_name,
        permissions: this.permissions,
      };
  
      this.rolesService.create(params).subscribe({
        next: (data) => {
          console.log(data);
          this.isAddRoleContentVisible = false;
          this.toastService.showToast('Saved Sucessfully!', 'success', 3000);
          this.onGetRoles();
        },
        error: (err) => {
          console.error('Error fetching roles:', err);
        },
      });
    }
    else{
      this.currentRow.name = this.role_name;
      this.currentRow.permissions = this.permissions;
      this.rolesService.update(this.currentRow).subscribe({
        next: (data) => {
          console.log(data);
          this.isAddRoleContentVisible = false;
          this.toastService.showToast('Saved Sucessfully!', 'success', 3000);
          this.onGetRoles();
        },
        error: (err) => {
          console.error('Error fetching roles:', err);
        },
      });
    }
    
  }

  onGetRoles() {
    this.rolesService.read({}).subscribe({
      next: (data) => {
        console.log(data);
        this.data = data;
      },
      error: (err) => {
        console.error('Error fetching roles:', err);
      },
    });
  }

  // Function to check and add permissions based on checkbox states
  checkAndAddPermission(checkbox: boolean, permission: string) {
    if (checkbox) {
      this.permissions.push(permission);
    }
  }

  onDeselectAll() {
    this.checkbox_show_product_costs = false;
    this.checkbox_print_labels = false;
    this.checkbox_apply_discounts = false;
    this.checkbox_create_on_account_sales = false;
    this.checkbox_issue_store_credit = false;
    this.checkbox_perform_cash = false;
    this.checkbox_make_sales = false;
    this.checkbox_perform_sale = false;
    this.checkbox_void_sales = false;
    this.checkbox_close_registers = false;
    this.checkbox_export_customer = false;
    this.checkbox_remove_customer = false;
    this.checkbox_add_customer_groups = false;
    this.checkbox_add_customers = false;
    this.checkbox_add_customer = false;
    this.checkbox_perform_supplier = false;
    this.checkbox_create_products = false;
    this.checkbox_perform_inventory = false;
    this.checkbox_perform_stock = false;
    this.checkbox_create_price_books = false;
    this.checkbox_create_product_type = false;
    this.checkbox_create_supplier = false;
    this.checkbox_create_brand = false;
    this.checkbox_create_product_attribute = false;
    this.checkbox_view_sales = false;
    this.checkbox_view_reporting = false;
    this.checkbox_only_own_sales = false;
    this.checkbox_all_sales_mode = false;
    this.checkbox_access_ecommerce = false;
    this.checkbox_manage_role = false;
    this.checkbox_manage_outlet = false;
    this.checkbox_add_cashier = false;
    this.checkbox_add_manager = false;
    this.checkbox_enable_add_ons = false;
    this.checkbox_manage_payment_type = false;
    this.checkbox_manage_tax = false;
    this.checkbox_manage_loyalty = false;
    this.checkbox_manage_hardware = false;
    this.checkbox_manage_keys = false;
    this.checkbox_refund = false;
  }
}

/* {
  "_id": {
    "$oid": "669e5f91dc92873ca9a335d5"
  },
  "permissions": [
    "show_product_costs",
    "print_labels",
    "apply_discounts",
    "create_on_account_sales",
    "issue_store_credit",
    "perform_cash",
    "make_sales",
    "perform_sale",
    "void_sales",
    "close_registers",
    "export_customer",
    "remove_customer",
    "add_customer_groups",
    "add_customers",
    "add_customer",
    "perform_supplier",
    "create_products",
    "perform_inventory",
    "perform_stock",
    "create_price_books",
    "create_product_type",
    "create_supplier",
    "create_brand",
    "create_product_attribute",
    "view_sales",
    "view_reporting",
    "only_own_sales",
    "all_sales_mode",
    "access_ecommerce",
    "manage_role",
    "manage_outlet",
    "add_cashier",
    "add_manager",
    "enable_add_ons",
    "manage_payment_type",
    "manage_tax",
    "manage_loyalty",
    "manage_hardware",
    "manage_keys",
    "cancel_reopen",
    "refund",
    "point_update",
    "open_drawer",
    "batch_cashier",
    "back_office",
    "product_lookup_price_change",
    "issue_free_gift",
    "gift_form",
    "price_prompt",
    "product_info_change_in_po",
    "view_last_transaction"
  ],
  "name": "Admin",
  "private_web_address": "safarirestaurant",
  "updated_at": {
    "$date": "2024-07-22T13:33:05.743Z"
  },
  "__v": 0
}, */

// I can not these checkboxes.
/* "cancel_reopen",
"point_update",
"open_drawer",
"batch_cashier",
"back_office",
"product_lookup_price_change",
"issue_free_gift",
"gift_form",
"price_prompt",
"product_info_change_in_po",
"view_last_transaction" */