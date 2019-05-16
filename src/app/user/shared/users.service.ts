import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Resp } from './users.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

apiurl = ''


  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<Resp>(this.apiurl);
  }

  getbyID(id) {
    return this.http.get(this.apiurl + '/' + id)
  }

  create(post) {
    return this.http.post(this.apiurl, post)
  }

  update(id, post) {
    return this.http.put(this.apiurl + '/' + id, post )
  }

  delete(id) {
    return this.http.delete(this.apiurl + '/' + id)
  }
}
