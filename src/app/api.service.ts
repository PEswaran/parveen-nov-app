import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

interface Source {
  id: string | null;
  name: string;
}

interface Article {
  source: Source;
  author: string | null;
  title: string;
  description: string;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string | null;
}

interface ApiResponse {
  articles: Article[];
}


@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl =
    'https://newsapi.org/v2/top-headlines?country=us&apiKey=1a8421f4ad7b4c63880b80d97cbfceec';

  constructor(private http: HttpClient) {}

  // Example GET request
  getData(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.apiUrl}`);
  }
}
