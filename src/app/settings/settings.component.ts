import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { map } from 'rxjs';
@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
})
export class SettingsComponent {
  articles: any[] = [];

  constructor(private articleService: ApiService) {}

  ngOnInit(): void {
    // Calling the GET method on component initialization
    this.articleService
      .getData()
      .pipe(
        // Filtering articles by the key in each article's source.name
        map((response) => response.articles), // Adjust this based on your response structure
        map((articles) =>
          articles.filter((article) => article.source.name !== '[Removed]')
        )
      )
      .subscribe((filteredArticles) => {
        this.articles = filteredArticles;
      });
  }
}
