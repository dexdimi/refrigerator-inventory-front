import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface FridgeItem {
  id?: string;
  name: string;
  category?: string;
  quantity?: number;
  bestBefore?: string;
  notes?: string;
}

@Component({
  selector: 'app-root',
  imports: [FormsModule, CommonModule],
  templateUrl: './fridge.component.html',
  styleUrl: './fridge.component.scss',
  standalone: true
})

export class FridgeComponent implements OnInit {
  items: FridgeItem[] = [];
  
  fridgeItem: FridgeItem = { name: '', category: '', quantity: 0, bestBefore: '', notes: '' };
  
  private apiUrl = 'http://localhost:8080/api/fridge-items';

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.loadItems();
  }

  loadItems(): void {
    this.http.get<FridgeItem[]>(this.apiUrl).subscribe({
      next: data => {
        this.items = data;
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
  
  editItem(item: FridgeItem): void {
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
    this.fridgeItem = { name: '', category: '', quantity: 0, bestBefore: '', notes: '' };
  }
}