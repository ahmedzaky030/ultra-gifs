import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { forkJoin, Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { ApiResponse } from '../../models/api-response.model';
import { GifModel } from '../../models/gif.model';
import { Pagination } from '../../models/pagination.model';
import { Term } from '../../models/term.model';
import { GiphySearchService } from '../../service/giphy-search.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Config } from '../../config/constants';

@UntilDestroy()
@Component({
  selector: 'app-giphy-list',
  templateUrl: './giphy-list.component.html',
  styleUrls: ['./giphy-list.component.scss']
})
export class GiphyListComponent implements OnInit {
  page = Config.INITIAL_PAGE_NUMBER;
  totalCount = Config.TOTAL_COUNT;
  pagination: Pagination | undefined = { count: Config.GIFS_PER_PAGE, total_count: Config.GIFS_PER_PAGE*2 , offset: Config.OFFSET };
  items: GifModel[] = [];
  pageSize = Config.GIFS_PER_PAGE;
  tags: Term[] = [];
  selectedTags: Term[] = [];
  searchFormControl: FormControl = new FormControl(Config.INITIAL_SEARCH_TEXT);

  constructor(private giphySearchService: GiphySearchService){}

  ngOnInit(){
    this.getGifs(this.searchFormControl.value).subscribe(res => this.successCallback(res));
    this.onSearchChanged();
  }

  searchGifs(search: string): Observable<ApiResponse<GifModel>> {
    return this.giphySearchService.getGifs({offset: this.pagination?.offset, limit: this.pagination?.count , q:search});
  }

  getSearchSuggestions(term: string) : Observable<ApiResponse<Term>> {
    return term ? this.giphySearchService.getSearchSuggestions(term): of(({data: [], meta: { msg:'', response_id:'', status:404}}) as ApiResponse<Term>);
  }

  getGifs(search: string)  {
    return forkJoin({ gifsResult: this.searchGifs(search), suggestionsResult: this.getSearchSuggestions(search)});
  }

  onSearchChanged(): void {
    this.searchFormControl.valueChanges.pipe(
      debounceTime(1000),
      distinctUntilChanged(),
      untilDestroyed(this),
      switchMap(searchText => {
        searchText = searchText !== '' ? searchText : null; 
        return this.getGifs(searchText)
      })
    ).subscribe(res => this.successCallback(res))
  }

  successCallback(res: {gifsResult: ApiResponse<GifModel>,suggestionsResult: ApiResponse<Term> }){
    const {gifsResult, suggestionsResult} = res;
    this.pagination = gifsResult.pagination;
    this.totalCount = this.pagination?.total_count ? (this.pagination?.total_count > this.totalCount ? this.totalCount : this.pagination?.total_count) : 18;
    this.items = gifsResult.data;
    this.tags = suggestionsResult.data;
  }

  searchByTag(tag: Term){
    this.selectedTags.push(tag);
    const selectedTagNames = this.selectedTags.map(v => v.name).join(',');
    this.searchFormControl.patchValue(selectedTagNames);
  }

  removeSelectedTag(tag: Term){
    this.selectedTags = this.selectedTags.filter(v => v.name !== tag.name);
    const selectedTagNames = this.selectedTags.map(v => v.name).join(',');
    const searchText = selectedTagNames !== '' ? selectedTagNames : null;
    this.searchFormControl.patchValue(searchText);
  }
}
