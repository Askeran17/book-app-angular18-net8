import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-quotes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './quotes.component.html',
  styleUrls: ['./quotes.component.css']
})
export class QuotesComponent implements OnInit {
  quotes: { id: number, text: string, author: string }[] = [];
  newQuote = { id: 0, text: '', author: '' };
  isEditMode = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
    } else {
      this.loadQuotes();
    }
  }

  addQuote() {
    if (this.newQuote.text.trim() && this.newQuote.author.trim()) {
      if (this.isEditMode) {
        const index = this.quotes.findIndex(quote => quote.id === this.newQuote.id);
        if (index !== -1) {
          this.quotes[index] = { ...this.newQuote };
        }
      } else {
        this.newQuote.id = this.quotes.length ? Math.max(...this.quotes.map(quote => quote.id)) + 1 : 1;
        this.quotes.push({ ...this.newQuote });
      }
      this.newQuote = { id: 0, text: '', author: '' };
      this.isEditMode = false;
      this.saveQuotes();
    } else {
      alert('All fields are required.');
    }
  }

  editQuote(id: number) {
    const quote = this.quotes.find(q => q.id === id);
    if (quote) {
      this.newQuote = { ...quote };
      this.isEditMode = true;
    }
  }

  deleteQuote(id: number) {
    this.quotes = this.quotes.filter(quote => quote.id !== id);
    this.saveQuotes();
  }

  saveQuotes() {
    localStorage.setItem('quotes', JSON.stringify(this.quotes));
  }

  loadQuotes() {
    const savedQuotes = localStorage.getItem('quotes');
    if (savedQuotes) {
      this.quotes = JSON.parse(savedQuotes);
    }
  }
}
