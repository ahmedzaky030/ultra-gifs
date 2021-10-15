import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, observable } from 'rxjs';
import { MockGiphySearchService } from 'testing/MockGiphySearch.service';
import { ApiResponse } from '../../models/api-response.model';
import { SearchFilter } from '../../models/filter.model';
import { GifModel } from '../../models/gif.model';
import { GiphySearchService } from '../../service/giphy-search.service';

import { GiphyListComponent } from './giphy-list.component';

describe('GiphyListComponent', () => {
  let component: GiphyListComponent;
  let fixture: ComponentFixture<GiphyListComponent>;
  let service: GiphySearchService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GiphyListComponent ],
      providers: [
        { provide: GiphySearchService, useClass: MockGiphySearchService }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GiphyListComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(GiphySearchService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call giphy search with empty value', () => {
    // arrange
    const searchValue = component.searchFormControl.value;
    const filter: SearchFilter = { offset: component.pagination.offset, limit: component.pagination.count, q: searchValue };
    const searchGifsSpy = spyOn(component, 'searchGifs' ).and.callThrough();
    const getSuggestionsSpy = spyOn(component, 'getSearchSuggestions').and.callThrough();
    const serviceGetGifsSpy = spyOn(service, 'getGifs');
    
    // act
    component.getGifsAndSuggestions(searchValue);
    fixture.detectChanges();

    // assert
    expect(searchGifsSpy).toHaveBeenCalledWith(searchValue);
    expect(getSuggestionsSpy).toHaveBeenCalledWith(searchValue);
    expect(serviceGetGifsSpy).toHaveBeenCalledWith(filter);
  })

  it('should not call giphy tag suggestions with empty value', () => {
    // arrange
    const searchValue = component.searchFormControl.value;
    const getSuggestionsSpy = spyOn(component, 'getSearchSuggestions').and.callThrough();
    const serviceGetSuggestionsSpy = spyOn(service, 'getSearchSuggestions');
    
    // act
    component.getGifsAndSuggestions(searchValue);
    fixture.detectChanges();
    // assert
    expect(getSuggestionsSpy).toHaveBeenCalledWith(searchValue);
    expect(searchValue).toBeNull();
    expect(serviceGetSuggestionsSpy).not.toHaveBeenCalled();
  })

  it('should call giphy search  and  giphy tag suggestions with predefined value', () => {
    // arrange
    const searchValue = 'comedy';
    const filter: SearchFilter = { offset: component.pagination.offset, limit: component.pagination.count, q: searchValue };
    
    const searchGifsSpy = spyOn(component, 'searchGifs' ).and.callThrough();
    const getSuggestionsSpy = spyOn(component, 'getSearchSuggestions').and.callThrough();
    const serviceGetGifsSpy = spyOn(service, 'getGifs');
    const serviceGetSuggestionsSpy = spyOn(service, 'getSearchSuggestions');
    
    // act
    component.getGifsAndSuggestions(searchValue);

    // assert
    expect(searchGifsSpy).toHaveBeenCalledWith(searchValue);
    expect(getSuggestionsSpy).toHaveBeenCalledWith(searchValue);
    expect(serviceGetGifsSpy).toHaveBeenCalledWith(filter);
    expect(serviceGetSuggestionsSpy).toHaveBeenCalledWith(searchValue);
  })

  it('should call getGifsAndSuggestions when enter value', async() => {
    // arrange
    const searchValue = 'comedy';
    const getGifsAndSuggestionsSpy = spyOn(component, 'getGifsAndSuggestions');

    // act 
    component.searchFormControl.patchValue(searchValue);
    fixture.detectChanges();

    // assert
    fixture.whenStable().then(() => {
      expect(getGifsAndSuggestionsSpy).toHaveBeenCalledWith(searchValue);
    });
    expect().nothing();
  })

  it('should fill search form control when click on tag ', () => {
    // arrange
    const selectedTag = { name:' comedy'};
    component.selectedTags = [];

    // act
    component.searchByTag(selectedTag);
    fixture.detectChanges();

    // assert
    expect(component.selectedTags).toEqual([selectedTag]);
    expect(component.searchFormControl.value).toEqual(selectedTag.name);
  })

  it('should  remove tag from selected Tag and search form control', () => {
    // arrange 
    const removedTag = { name: 'comedy'};
    component.selectedTags = [
       { name: 'funny'}, { name:'sports'}
    ];
    component.selectedTags.unshift(removedTag);

    // act 
    component.removeSelectedTag(removedTag);
    fixture.detectChanges();
    // assert
    console.log(component.selectedTags);
    expect(component.selectedTags).toEqual([{ name: 'funny'},{ name:'sports'}]);
    expect(component.searchFormControl.value).toEqual('funny,sports');
  })

  it('should change search filter when page changed', async() => {
    // arrange
    const targetPage = 2;
    const searchValue = component.searchFormControl.value;
    const filter: SearchFilter = { offset: component.pagination.offset, limit: component.pagination.count, q: searchValue };
    const searchGifsSpy = spyOn(component, 'searchGifs' ).and.returnValue(new Observable<ApiResponse<GifModel>>());
    const serviceGetGifsSpy = spyOn(service, 'getGifs');

    // act
    component.onPageChanged(targetPage);
    fixture.detectChanges();

    // assert
    fixture.whenStable().then(() => {
      expect(component.pagination).toEqual({...component.pagination, offset: targetPage - 1});
      expect(searchGifsSpy).toHaveBeenCalled();
      expect(serviceGetGifsSpy).toHaveBeenCalledWith({...filter, offset:targetPage - 1});
    });
    expect().nothing();
  })

  it('should reset pagination when enter form value', async() => {
    // arrange
    const searchValue = 'funny'
    const filter: SearchFilter = { offset: 2, limit: component.pagination.count, q: searchValue };
    const searchGifsSpy = spyOn(component, 'searchGifs' ).and.returnValue(new Observable<ApiResponse<GifModel>>());
    const serviceGetGifsSpy = spyOn(service, 'getGifs').and.callThrough();

    // act
    component.searchFormControl.patchValue('funny');
    fixture.detectChanges();

    // assert
    fixture.whenStable().then(() => {
      expect(component.pagination).toEqual({...component.pagination, offset: 0});
      expect(searchGifsSpy).toHaveBeenCalled();
      expect(serviceGetGifsSpy).toHaveBeenCalledWith({...filter, offset:0});
    })
    expect().nothing();
  })
});
