import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { QuoteService, Quote } from '../quote.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-quotes',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './quotes.component.html',
  styleUrls: ['./quotes.component.css']
})
export class QuotesComponent implements OnInit {
  quotes: Quote[] = [];
  newQuote: Quote = { id: 0, text: '', author: '' };
  isEditMode = false;

  constructor(
    private quoteService: QuoteService,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
    } else {
      this.loadQuotes();
      const id = this.route.snapshot.params['id'];
      if (id) {
        this.isEditMode = true;
        this.quoteService.getQuote(+id).subscribe((quote) => {
          this.newQuote = quote;
        });
      }
    }
  }

  loadQuotes(): void {
    this.quoteService.getQuotes().subscribe((quotes) => {
      this.quotes = quotes;
    });
  }

  onSubmit() {
    if (this.newQuote.text.trim() && this.newQuote.author.trim()) {
      if (this.isEditMode) {
        this.quoteService.updateQuote(this.newQuote).subscribe(() => {
          this.loadQuotes(); // Reload quotes after update
          this.router.navigate(['/quotes']);
        });
      } else {
        this.quoteService.addQuote(this.newQuote).subscribe((newQuote) => {
          this.quotes.push(newQuote); // Add new quote to the list
          this.newQuote = { id: 0, text: '', author: '' }; // Reset form
        });
      }
    } else {
      alert('All fields are required.');
    }
  }

  editQuote(id: number | undefined): void {
    if (id !== undefined) {
      this.router.navigate(['/quotes', id]);
    }
  }

  deleteQuote(id: number | undefined): void {
    if (id !== undefined) {
      this.quoteService.deleteQuote(id).subscribe(() => {
        this.quotes = this.quotes.filter(quote => quote.id !== id);
      });
    }
  }
}
