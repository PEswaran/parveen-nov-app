import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { map } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  articles: any[] = [];

  constructor(private articleService: ApiService) {}

  ngOnInit(): void {
    const keywords = ['nasdaq'];

    // Calling the GET method on component initialization
    this.articleService
      .getStockData('everything?q=stock')
      .pipe(
        // Extract the articles from the response
        map((response) => response.articles), // Adjust this based on your response structure
        // Filter out articles with a source name of '[Removed]'
        map((articles) =>
          articles.filter((article) => article.source.name !== '[Removed]')
        ),
        // Filter articles by keywords in any of their property values
        map((articles) =>
          articles.filter((article) =>
            keywords.some((keyword) =>
              Object.values(article).some(
                (value) => typeof value === 'string' && value.includes(keyword)
              )
            )
          )
        )
      )
      .subscribe((filteredArticles) => {
        this.articles = filteredArticles;
      });

  }

}
