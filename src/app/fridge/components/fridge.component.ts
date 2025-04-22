import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FridgeItemDTO, UnitDTO, CategoryDTO } from '../models/fridge-item-dto.model';
import { Page } from '../models/page.model';
import { LookupService } from '../lookup/lookup.service';


@Component({
  selector: 'app-root',
  imports: [FormsModule, CommonModule],
  templateUrl: './fridge.component.html',
  styleUrl: './fridge.component.scss',
  standalone: true
})

export class FridgeComponent implements OnInit {

  items: FridgeItemDTO[] = [];
  totalElements = 0;
  totalPages    = 0;
  currentPage   = 0;

  unitOptions : UnitDTO[] = [];
  categoryOptions : CategoryDTO[] = [];
  
  fridgeItem: FridgeItemDTO = { 
    name: '', 
    category: '', 
    quantity: 0,
    unit: '', 
    bestBeforeDate: '', 
    notes: '' 
  };
  
  private apiUrl = 'http://localhost:8080/api/fridge-items';

  constructor(
    private http: HttpClient,
    private lookup: LookupService ) 
    { }

  ngOnInit(): void {
    console.error("Lookup-GetUnits() ! -> " + this.lookup.getUnits().subscribe(units => this.unitOptions = units));
    this.lookup.getUnits().subscribe(units => this.unitOptions = units);
    
    this.lookup.getCategories().subscribe(categories => this.categoryOptions = categories);

    this.loadItems();
  }

  loadItems(page: number = 0, size: number = 10): void {
    this.http.get<Page<FridgeItemDTO>>(`${this.apiUrl}?page=${page}&size=${size}`).subscribe({
      next: page => {
        console.error('DATA from loadItems() => ', page.content)
        this.items = page.content;

        this.totalElements = page.totalElements;
        this.totalPages    = page.totalPages;
        this.currentPage   = page.number;

        console.error('this.items from loadItems() => ', this.items)
      },
      error: err => console.error('Error loading items', err)
    });
  }

  onSubmit(): void {
    if (this.fridgeItem.id) {
  
      this.http.put(`${this.apiUrl}/${this.fridgeItem.id}`, this.fridgeItem).subscribe({
        next: () => {
          this.loadItems();
          this.clearForm();
        },
        error: err => console.error('Error updating item', err)
      });
    } else {
  
      this.http.post(this.apiUrl, this.fridgeItem).subscribe({
        next: () => {
          this.loadItems();
          this.clearForm();
        },
        error: err => console.error('Error creating item', err)
      });
    }
  }
  
  editItem(item: FridgeItemDTO): void {
    this.fridgeItem = { ...item };
  }

  deleteItem(id: string | undefined): void {
    if (!id) {
      return;
    }
    if (confirm('Are you sure you want to delete this item?')) {
      this.http.delete(`${this.apiUrl}/${id}`).subscribe({
        next: () => this.loadItems(),
        error: err => console.error('Error deleting item', err)
      });
    }
  }

  clearForm(): void {
    this.fridgeItem = { name: '', category: '', quantity: 0, bestBeforeDate: '', notes: '' };
  }

  getUnitLabel(name: string): string {
    if (!name) { 
      return ''; 
    }
    const found = this.unitOptions.find(u => u.name === name);
    return found ? found.label : name;
  }

  getCategoryLabel(name: string): string {
    if (!name) { 
      return ''; 
    }
    const found = this.categoryOptions.find(c => c.name === name);
    return found ? found.label : name;
  }

}