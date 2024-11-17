import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

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
  private defaultQuery = 'top-headlines?country=us'

  constructor(private http: HttpClient) {}

  // Example GET request
  getData(): Observable<ApiResponse> {
    const apiUrl =
    environment.apiBaseUrl +  this.defaultQuery + environment.apiKey;
    return this.http.get<ApiResponse>(`${apiUrl}`);
  }

  getStockData(stockQueryString: string): Observable<ApiResponse> {
    const apiUrl =
    environment.apiBaseUrl +  stockQueryString + environment.apiKey;

    return this.http.get<ApiResponse>(`${apiUrl}`);
  }
}
