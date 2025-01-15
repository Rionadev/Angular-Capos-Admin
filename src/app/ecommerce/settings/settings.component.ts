import { Component, OnInit } from '@angular/core';
import { StoresService } from '../../api/stores/stores.service';
import { ToastService } from '../../component/toast/toast.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  activeTab: string = 'modules'; // Default to the 'Modules' tab
  isAddSliderContentVisible: boolean = false; // Initially hidden for add or editing.
  isAddBannerContentVisible: boolean = false; // Initially hidden for add or editing.
  isAddServiceContentVisible: boolean = false;

  data: any = {
    active: false,
    short_description: '',
    store_pickup: false,
    theme_color: '#000000',
    paypal: {
      active: false,
      secret: '',
      client_id: '',
    },
    stripe: {
      active: false,
      secret_key: '',
      public_key: '',
    },
    active_widget: {
      sliders: false,
      banners: false,
      services: false,
    },
    sliders: [/* {
      image: {type:String, default: ''},
      title: {type: String, default: ''},
      subtitle: {type: String, default: ''},
      button: {type: String, default: ''},
      href: {type: String, default: ''}
    } */],
    banners: [/* {
      image: {type:String, default: ''},
      title: {type: String, default: ''},
      subtitle: {type: String, default: ''},
      button: {type: String, default: ''},
      href: {type: String, default: ''}
    } */],
    click_collect: false,
  };

  sliders: any[] = [];
  currentSliderRow: any = this.resetSliderRow();

  banners: any[] = [];
  currentBannerRow: any = this.resetSliderRow();;

  services: any[] = [];
  currentServiceRow: any = this.resetServiceRow();;

  // Varialble for delete
  isDeleteModal: boolean = false;
  currentDeleteID: number = 0;

  constructor(
    private storesService: StoresService,
    private toastService: ToastService,
  ) { }

  ngOnInit(): void {
    this.onGetData();
  }

  onGetData() {
    this.storesService.read({
    }).subscribe({
      next: (data) => {
        console.log('storesData', data);
        this.data = data;
        this.sliders = this.onAddIdItem(this.data.sliders);
        this.banners = this.onAddIdItem(this.data.banners);
        this.services = this.onAddIdItem(this.data.services);
      },
      error: (err) => {
        console.error('Error fetching stores:', err);
      },
    });
  }

  setActiveTab(tab: string): void {
    this.activeTab = tab;
    this.currentSliderRow = this.resetSliderRow();
    this.currentBannerRow = this.resetSliderRow();
    this.currentServiceRow = this.resetServiceRow();
  }

  toggleAddSliderContent(): void {
    this.isAddSliderContentVisible = !this.isAddSliderContentVisible; // Toggle the visibility
  }

  onSave() {
    this.data.sliders = this.onRemoveIdItem(this.sliders);
    this.data.banners = this.onRemoveIdItem(this.banners);
    this.data.services = this.onRemoveIdItem(this.services);
    console.log(this.data);
  }

  onEnableCollect() {
    this.data.click_collect = !this.data.click_collect;
    if (this.data.click_collect)
      this.toastService.showToast('Enabled Successfully!', 'success', 3000);
    else
      this.toastService.showToast('Disenabled Successfully!', 'warning', 3000);
  }
  // For Slider Tab
  onSliderSave() {
    if (this.currentSliderRow.id) {
      // Update existing row
      const index = this.sliders.findIndex((row) => row.id === this.currentSliderRow.id);
      if (index !== -1) {
        this.sliders[index] = { ...this.currentSliderRow }; // Update row
      }
    } else {
      // Add new row
      this.sliders.push({
        ...this.currentSliderRow,
        id: this.generateId(this.sliders),
      });
    }
    this.toastService.showToast('Saved Successfully!', 'success', 3000);
    this.currentSliderRow = this.resetSliderRow();
    this.isAddSliderContentVisible = false; 
  }

  onEditSliderRow(row: any): void {
    this.currentSliderRow = { ...row }; // Clone the row to avoid direct edits
    this.isAddSliderContentVisible = true;
  }

  onDeleteSliderRow(id: number): void {
    this.sliders = this.sliders.filter((row) => row.id !== id); // Remove row by id
  }

  onShowAddSliderContent(): void {
    this.isAddSliderContentVisible = true; // Toggle the visibility
  }

  onHideAddSliderContent(): void {
    this.isAddSliderContentVisible = false; // Toggle the visibility
    this.currentSliderRow = this.resetSliderRow();
  }

  // For Banner Tab
  onBannerSave() {
    if (this.currentBannerRow.id) {
      // Update existing row
      const index = this.banners.findIndex((row) => row.id === this.currentBannerRow.id);
      if (index !== -1) {
        this.banners[index] = { ...this.currentBannerRow }; // Update row
      }
    } else {
      // Add new row
      this.banners.push({
        ...this.currentBannerRow,
        id: this.generateId(this.banners),
      });
    }
    this.toastService.showToast('Saved Successfully!', 'success', 3000);
    this.currentBannerRow = this.resetSliderRow();
    this.isAddBannerContentVisible = false; 
  }

  onEditBannerRow(row: any): void {
    this.currentBannerRow = { ...row }; // Clone the row to avoid direct edits
    this.isAddBannerContentVisible = true;
  }

  onDeleteBannerRow(id: number): void {
    this.banners = this.banners.filter((row) => row.id !== id); // Remove row by id
  }

  onShowAddBannerContent(): void {
    this.isAddBannerContentVisible = true; // Toggle the visibility
  }

  onHideAddBannerContent(): void {
    this.isAddBannerContentVisible = false; // Toggle the visibility
    this.currentBannerRow = this.resetSliderRow();
  }
  
  // For Service Tab
  onServiceSave() {
    if (this.currentServiceRow.id) {
      // Update existing row
      const index = this.services.findIndex((row) => row.id === this.currentServiceRow.id);
      if (index !== -1) {
        this.services[index] = { ...this.currentServiceRow }; // Update row
      }
    } else {
      // Add new row
      this.services.push({
        ...this.currentServiceRow,
        id: this.generateId(this.services),
      });
    }
    this.toastService.showToast('Saved Successfully!', 'success', 3000);
    this.currentServiceRow = this.resetSliderRow();
    this.isAddServiceContentVisible = false; 
  }

  onEditServiceRow(row: any): void {
    this.currentServiceRow = { ...row }; // Clone the row to avoid direct edits
    this.isAddServiceContentVisible = true;
  }

  onDeleteServiceRow(id: number): void {
    this.services = this.services.filter((row) => row.id !== id); // Remove row by id
  }

  onShowAddServiceContent(): void {
    this.isAddServiceContentVisible = true; // Toggle the visibility
  }

  onHideAddServiceContent(): void {
    this.isAddServiceContentVisible = false; // Toggle the visibility
    this.currentServiceRow = this.resetServiceRow();
  }

  // Delete Common Part
  showDeleteModal(id: number) {
    this.currentDeleteID = id;
    this.isDeleteModal = true;
  }

  closeDeleteModal(){
    this.isDeleteModal = false;
  }

  deleteRow() {
    if (this.activeTab == "sliders")
      this.onDeleteSliderRow(this.currentDeleteID);
    else if (this.activeTab == "banners")
      this.onDeleteBannerRow(this.currentDeleteID);
    else if (this.activeTab == "services")
      this.onDeleteServiceRow(this.currentDeleteID);
    this.isDeleteModal = false;
    this.toastService.showToast('Deleted Successfully!', 'success', 3000);
    /* this.rows = this.rows.filter((row) => row.id !== this.currentDeleteID); // Remove row by id
    this.isDeleteModal = false; */
  }

  // Common Part
  resetSliderRow(): any {
    return {
      image: '',
      title: '',
      subtitle: '',
      button: '',
      href: '',
    };
  }

  resetServiceRow(): any {
    return {
      name: '',
      discription: '',
      icon: '',
    };
  }

  onAddIdItem(array: any[]): any[] {
    // Add `id` to each item
    return array = array.map((item, index) => ({
      ...item,
      id: index + 1, // Add an id based on index
    }));
  }

  onRemoveIdItem(array: any[]): any[] {
    // Add `id` to each item
    return array = array.map(({ id, ...rest }) => rest);
  }

  private generateId(array: any[]): number {
    return Math.max(...array.map((r) => r.id), 0) + 1;
  }

  /* this.toastService.showToast('This is a success message!', 'success', 3000);
    this.toastService.showToast('This is a info message!', 'info', 3000);
    this.toastService.showToast('This is a warning message!', 'warning', 3000);
    this.toastService.showToast('This is a error message!', 'error', 3000); */
}
