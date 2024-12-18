import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BookService, Book } from '../book.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-book-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.css']
})
export class BookFormComponent implements OnInit {
  book: Book = { id: 0, title: '', author: '', publishDate: '' };
  isEditMode = false;

  constructor(
    private bookService: BookService,
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
        this.bookService.getBook(+id).subscribe((book) => {
          this.book = book;
          this.book.publishDate = this.formatDate(book.publishDate);
        });
      }
    }
  }

  formatDate(dateString: string): string {
    return dateString.split('T')[0];
  }

  onSubmit() {
    if (this.book.title.trim() && this.book.author.trim() && this.book.publishDate.trim()) {
      if (this.isEditMode) {
        this.bookService.updateBook(this.book).subscribe(() => {
          this.router.navigate(['/book-list']);
        });
      } else {
        this.bookService.addBook(this.book).subscribe(() => {
          this.router.navigate(['/book-list']);
        });
      }
    } else {
      alert('All fields are required.');
    }
  }
}
