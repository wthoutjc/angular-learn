import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, GiphyAPIResponse } from '../interfaces/gifs';

const SERVICE_URL = 'https://api.giphy.com/v1/gifs';

@Injectable({
  providedIn: 'root',
})
export class GifsService {
  public gifList: Gif[] = [];

  private _tagsHistory: string[] = [];
  private apiKey: string = 'gzR0uue7r94zkjTkyhXN6V9JspPS9SCm';

  constructor(private readonly http: HttpClient) {
    this.loadFromLocalStorage();

    const lastTag = this._tagsHistory[0];
    if (lastTag) {
      this.searchTag(lastTag);
    }
  }

  get tagsHistory(): string[] {
    return [...this._tagsHistory];
  }

  private sortHistory(tag: string) {
    tag = tag.trim().toLowerCase();
    if (this._tagsHistory.includes(tag)) {
      this._tagsHistory = this._tagsHistory.filter((t) => t !== tag);
    }

    this._tagsHistory.unshift(tag);
    this._tagsHistory = this._tagsHistory.slice(0, 10);

    this.saveToLocalStorage();
  }

  searchTag(tag: string) {
    if (!tag.trim().length) return;
    this.sortHistory(tag);

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('q', tag)
      .set('limit', '10');

    this.http
      .get<GiphyAPIResponse>(`${SERVICE_URL}/search`, { params })
      .subscribe((response) => {
        this.gifList = response.data;
      });
  }

  saveToLocalStorage() {
    localStorage.setItem('tagsHistory', JSON.stringify(this._tagsHistory));
  }

  loadFromLocalStorage() {
    const tagsHistory = localStorage.getItem('tagsHistory');
    if (tagsHistory) {
      this._tagsHistory = JSON.parse(tagsHistory);
    }
  }
}
