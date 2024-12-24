import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { QuoteService, Quote } from '../quote.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-quote-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './quote-form.component.html',
  styleUrls: ['./quote-form.component.css']
})
export class QuoteFormComponent implements OnInit {
  quote: Quote = { id: 0, text: '', author: '' };
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
      const id = this.route.snapshot.params['id'];
      if (id) {
        this.isEditMode = true;
        this.quoteService.getQuote(+id).subscribe((quote) => {
          this.quote = quote;
        });
      }
    }
  }

  onSubmit() {
    if (this.quote.text.trim() && this.quote.author.trim()) {
      if (this.isEditMode) {
        this.quoteService.updateQuote(this.quote).subscribe(() => {
          this.router.navigate(['/quote-list']);
        });
      } else {
        this.quoteService.addQuote(this.quote).subscribe(() => {
          this.router.navigate(['/quote-list']);
        });
      }
    } else {
      alert('All fields are required.');
    }
  }
}
