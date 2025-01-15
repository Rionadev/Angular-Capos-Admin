import { Component, OnInit } from '@angular/core';
import { StoresService } from '../../api/stores/stores.service';
import { BlogsService } from '../../api/blogs/blogs.service';
import { FaqsService } from '../../api/faqs/faqs.service';
import { AboutpagesService } from '../../api/aboutpages/aboutpages.service';

import { ToastService } from '../../component/toast/toast.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})

export class PagesComponent implements OnInit {

  activeTab: string = 'blog'; // Default active tab
  isAddBlogContentVisible: boolean = false; // Initially hidden for add or editing.
  isAddFaqContentVisible: boolean = false; // Initially hidden for add or editing.
  isAddMemberContentVisible: boolean = false; // Initially hidden for add or editing.


  isDeleteModal: boolean = false;
  currentDeleteID: string = '';

  storesData: any = {
    active_widget: {
      about_us: false,
      faq: false,
      blog: false
    },
  };

  blogsData: any[] = [];
  currentBlogRow: any = this.resetBlogRow();

  faqsData: any[] = [];
  currentFaqRow: any = this.resetFaqRow();

  aboutsData: any = this.resetAboutRow();
  currentMemberRow: any = this.resetMemberRow();
  members: any[] = [];

  constructor(
    private storesService: StoresService,
    private toastService: ToastService,
    private blogsService: BlogsService,
    private faqsService: FaqsService,
    private aboutsService: AboutpagesService,
  ) { }

  ngOnInit(): void {
    this.onGetStoresData();
    this.onGetBlogsData();
    this.onGetFaqsData();
    this.onGetAboutsData();
  }

  onGetBlogsData() {
    this.blogsService.read({
    }).subscribe({
      next: (data) => {
        console.log('blogsData', data);
        this.blogsData = data;
      },
      error: (err) => {
        console.error('Error fetching blogs:', err);
      },
    });
  }

  onGetFaqsData() {
    this.faqsService.read({
    }).subscribe({
      next: (data) => {
        console.log('faqsData', data);
        this.faqsData = data;
      },
      error: (err) => {
        console.error('Error fetching faqs:', err);
      },
    });
  }

  onGetAboutsData() {
    this.aboutsService.read({
    }).subscribe({
      next: (data) => {
        console.log('aboutsData', data);
        if(data != null)
        {
          this.aboutsData = data;
          if (data?.team_members != null)
            this.members = this.onAddIdItem(data?.team_members);
        }
      },
      error: (err) => {
        console.error('Error fetching abouts:', err);
      },
    });
  }

  onGetStoresData() {
    this.storesService.read({
    }).subscribe({
      next: (data) => {
        console.log('storesData', data);
        this.storesData = data;
      },
      error: (err) => {
        console.error('Error fetching stores:', err);
      },
    });
  }

  // Save to store db for three active control
  onSave() {
    this.storesData.default_currency = this.storesData.default_currency?._id;
    this.storesData.physical_address.country = this.storesData.physical_address?.country?._id;
    this.storesData.postal_address.country = this.storesData.postal_address?.country?._id;
    this.storesService.update(this.storesData).subscribe({
      next: (data) => {
        console.log(data);
        this.toastService.showToast('Saved Sucessfully!', 'success', 3000);
      },
      error: (err) => {
        console.error('Error fetching roles:', err);
      },
    });
  }

  setActive(tab: string): void {
    this.activeTab = tab;
  }

  toggleAddBlogContent(): void {
    this.isAddBlogContentVisible = !this.isAddBlogContentVisible; // Toggle the visibility
  }

  toggleAddFAQContent(): void {
    this.isAddFaqContentVisible = !this.isAddFaqContentVisible; // Toggle the visibility
  }

  toggleAddMemberContent(): void {
    this.isAddMemberContentVisible = !this.isAddMemberContentVisible; // Toggle the visibility
  }

  // For Blog Tab
  onBlogSave() {
    if (this.currentBlogRow._id) {
      this.currentBlogRow.user = this.currentBlogRow.user?._id;
      this.blogsService.update(this.currentBlogRow).subscribe({
        next: (data) => {
          console.log('blogsData', data);
          this.onGetBlogsData();
        },
        error: (err) => {
          console.error('Error fetching blogs:', err);
        },
      });
    } else {
      this.blogsService.create(this.currentBlogRow).subscribe({
        next: (data) => {
          console.log('blogsData', data);
          this.onGetBlogsData();
        },
        error: (err) => {
          console.error('Error fetching blogs:', err);
        },
      });
      
    }
    //this.toastService.showToast('Saved Successfully!', 'success', 3000);
    this.currentBlogRow = this.resetBlogRow();
    this.isAddBlogContentVisible = false; 
  }

  onEditBlogRow(row: any): void {
    this.currentBlogRow = { ...row }; // Clone the row to avoid direct edits
    this.isAddBlogContentVisible = true;
  }

  onDeleteBlogRow(id: string): void {
    this.blogsService.delete({_id: id}).subscribe({
      next: (data) => {
        console.log('blogsData', data);
        this.onGetBlogsData();
      },
      error: (err) => {
        console.error('Error fetching blogs:', err);
      },
    });
  }

  onShowAddBlogContent(): void {
    this.isAddBlogContentVisible = true; // Toggle the visibility
  }

  onHideAddBlogContent(): void {
    this.isAddBlogContentVisible = false; // Toggle the visibility
    this.currentBlogRow = this.resetBlogRow();
  }

  resetBlogRow(): any {
    return {
      image: '',
      title: '',
      content: '',
    };
  }

  // For Faq Tab
  onFaqSave() {
    if (this.currentFaqRow._id) {
      this.faqsService.update(this.currentFaqRow).subscribe({
        next: (data) => {
          console.log('faqsData', data);
          this.onGetFaqsData();
        },
        error: (err) => {
          console.error('Error fetching faqs:', err);
        },
      });
    } else {
      this.faqsService.create(this.currentFaqRow).subscribe({
        next: (data) => {
          console.log('faqsData', data);
          this.onGetFaqsData();
        },
        error: (err) => {
          console.error('Error fetching faqs:', err);
        },
      });
      
    }
    //this.toastService.showToast('Saved Successfully!', 'success', 3000);
    this.currentFaqRow = this.resetFaqRow();
    this.isAddFaqContentVisible = false; 
  }

  onEditFaqRow(row: any): void {
    this.currentFaqRow = { ...row }; // Clone the row to avoid direct edits
    this.isAddFaqContentVisible = true;
  }

  onDeleteFaqRow(id: string): void {
    this.faqsService.delete({_id: id}).subscribe({
      next: (data) => {
        console.log('faqsData', data);
        this.onGetFaqsData();
      },
      error: (err) => {
        console.error('Error fetching faqs:', err);
      },
    });
  }

  onShowAddFaqContent(): void {
    this.isAddFaqContentVisible = true; // Toggle the visibility
  }

  onHideAddFaqContent(): void {
    this.isAddFaqContentVisible = false; // Toggle the visibility
    this.currentFaqRow = this.resetFaqRow();
  }

  resetFaqRow(): any {
    return {
      question: '',
      answer: '',
    };
  }

  // About US
  resetAboutRow(): any {
    return {
      title: '',
      description: '',
      image: '',
      image_position: '',
      team_title: '',
      team_description: '',
      team_members: null,
    };
  }
  
  resetMemberRow(): any {
    return {
      photo: '',
      name: '',
      facebook: '',
      twitter: '',
      linkedin: '',
      instagram: '',
      job: '',
    };
  }

  // For Blog Tab
  onAboutsSave() {
    if (this.aboutsData._id) {
      this.aboutsData.team_members = this.onRemoveIdItem(this.members);
      this.aboutsService.update(this.aboutsData).subscribe({
        next: (data) => {
          console.log('aboutsData', data);
          this.toastService.showToast('Saved Sucessfully!', 'success', 3000);
          this.onGetAboutsData();
        },
        error: (err) => {
          console.error('Error fetching abouts:', err);
        },
      });
    } else {
      this.aboutsService.create(this.aboutsData).subscribe({
        next: (data) => {
          console.log('aboutsData', data);
          this.toastService.showToast('Saved Sucessfully!', 'success', 3000);
          this.onGetAboutsData();
        },
        error: (err) => {
          console.error('Error fetching abouts:', err);
        },
      });
    }
  }

  onMemberSave() {
    if (this.currentMemberRow.id) {
      // Update existing row
      const index = this.members.findIndex((row) => row.id === this.currentMemberRow.id);
      if (index !== -1) {
        this.members[index] = { ...this.currentMemberRow }; // Update row
      }
    } else {
      // Add new row
      this.members.push({
        ...this.currentMemberRow,
        id: this.generateId(this.members),
      });
    }
    //this.toastService.showToast('Saved Successfully!', 'success', 3000);
    this.currentMemberRow = this.resetMemberRow();
    this.isAddMemberContentVisible = false; 
  }

  onEditMemberRow(row: any): void {
    this.currentMemberRow = { ...row }; // Clone the row to avoid direct edits
    this.isAddMemberContentVisible = true;
  }

  onDeleteMemberRow(id: number): void {
    this.members = this.members.filter((row) => row.id !== id); // Remove row by id
  }

  onShowAddMemberContent(): void {
    this.isAddMemberContentVisible = true; // Toggle the visibility
  }

  onHideAddMemberContent(): void {
    this.isAddMemberContentVisible = false; // Toggle the visibility
    this.currentMemberRow = this.resetMemberRow();
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
  
  // Common Part for Delete
  showDeleteModal(id: string) {
    this.currentDeleteID = id;
    this.isDeleteModal = true;
  }

  closeDeleteModal() {
    this.isDeleteModal = false;
  }

  deleteRow() {
    if (this.activeTab == "blog")
      this.onDeleteBlogRow(this.currentDeleteID);
    else if (this.activeTab == "faq")
      this.onDeleteFaqRow(this.currentDeleteID);
    else if (this.activeTab == "about")
      this.onDeleteMemberRow(Number(this.currentDeleteID));
    this.isDeleteModal = false;
    this.toastService.showToast('Deleted Successfully!', 'success', 3000);
    /* this.rows = this.rows.filter((row) => row.id !== this.currentDeleteID); // Remove row by id
    this.isDeleteModal = false; */
  }
}
