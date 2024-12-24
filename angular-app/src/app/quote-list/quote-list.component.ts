import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Quote, QuoteService } from '../quote.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-quote-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './quote-list.component.html',
  styleUrls: ['./quote-list.component.css']
})
export class QuoteListComponent implements OnInit {
  quotes: Quote[] = [];

  constructor(private quoteService: QuoteService, private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
    } else {
      this.loadQuotes();
    }
  }

  loadQuotes(): void {
    this.quoteService.getQuotes().subscribe((quotes) => {
      this.quotes = quotes;
    });
  }

  navigateToAddQuote(): void {
    this.router.navigate(['/quote-form']);
  }

  editQuote(id: number): void {
    this.router.navigate(['/quote-form', id]);
  }

  deleteQuote(id: number | undefined): void {
    if (id !== undefined) {
      this.quoteService.deleteQuote(id).subscribe(() => {
        this.quotes = this.quotes.filter(quote => quote.id !== id);
      });
    }
  }
}
