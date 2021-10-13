import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SearchFilter, TagFilter } from '../models/filter.model';
import { environment } from 'src/environments/environment';
import { API_URL } from '../config/api-url';
import { ApiResponse } from '../models/api-response.model';
import { GifModel } from '../models/gif.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { Term } from '../models/term.model';
@Injectable({
  providedIn: 'root'
})
export class GiphySearchService {

  constructor(private _http: HttpClient) { }

  getGifs(search: SearchFilter): Observable<ApiResponse<GifModel>>{
    const url = `${environment.baseUrl}${API_URL.search}?api_key=${environment.API_KEY}`;
    const params =  new HttpParams({fromObject:(search as any)});
    return this._http.get(url, {params}).pipe(map(v => v as ApiResponse<GifModel>))
  }

  getSearchSuggestions(term: string): Observable<ApiResponse<Term>> {
    const url = `${environment.baseUrl}${API_URL.tags}/${term}?api_key=${environment.API_KEY}`
    return this._http.get(url).pipe(map(v => v as ApiResponse<Term>))
  }
}
