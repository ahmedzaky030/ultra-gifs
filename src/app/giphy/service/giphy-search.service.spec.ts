import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from 'src/environments/environment';
import { Gifs, Tags } from 'testing/mock-data';
import { API_URL } from '../config/api-url';
import { SearchFilter, GifModel, Term } from '../models';

import { GiphySearchService } from './giphy-search.service';

describe('GiphySearchService', () => {
  let service: GiphySearchService;
  let controller: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[
        HttpClientTestingModule
      ],
      providers:[GiphySearchService]
    });
    service = TestBed.inject(GiphySearchService);
    controller = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should searchGifs call search endpoint', () => {
    const filter : SearchFilter = {q: 'comedy', offset: 0, limit: 9};
    let actualGifs : GifModel[] | undefined;
    const expectedUrl = `${environment.baseUrl + API_URL.search}?api_key=${ environment.API_KEY}&q=${filter.q}&offset=${filter.offset}&limit=${filter.limit}` ;

    service.getGifs(filter).subscribe(
      (response) => {
        actualGifs = response.data;
      }
    );

    const request = controller.expectOne(expectedUrl);
    request.flush({ data: Gifs, meta: {}, pagination: {}})
    expect(actualGifs).toEqual(Gifs)
  })

  it('should searchSuggestions call suggestion endpoint', () => {
    let actualTags : Term[] | undefined;
    let searchValue = 'funny';
    const expectedUrl = `${environment.baseUrl + API_URL.tags}/${searchValue}?api_key=${ environment.API_KEY}` ;

    service.getSearchSuggestions(searchValue).subscribe(
      (response) => {
        actualTags = response.data;
      }
    );

    const request = controller.expectOne(expectedUrl);
    request.flush({ data: Tags, meta: {}})
    expect(actualTags).toEqual(Tags)
  })
});
