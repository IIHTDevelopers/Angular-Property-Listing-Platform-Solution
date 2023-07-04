import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Property } from '../model/property';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {
  apiUrl = 'http://127.0.0.1:8081/propertylist/properties';

  constructor(private http: HttpClient) { }

  getAllProperties(): Observable<Property[]> {
    return this.http.get<Property[]>(this.apiUrl);
  }

  getPropertyById(id: number): Observable<Property> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Property>(url);
  }

  createProperty(property: Property): Observable<Property> {
    return this.http.post<Property>(this.apiUrl, property);
  }

  updateProperty(property: Property): Observable<Property> {
    const url = `${this.apiUrl}/${property.id}`;
    return this.http.put<Property>(url, property);
  }

  deleteProperty(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }

  searchProperties(queryParams: any): Observable<Property[]> {
    let params = new HttpParams();

    if (queryParams.name) {
      params = params.set('name', queryParams.name);
    }

    if (queryParams.price) {
      params = params.set('price', queryParams.price);
    }

    if (queryParams.category) {
      params = params.set('category', queryParams.category);
    }
    return this.http.get<Property[]>(`${this.apiUrl}/search`, { params });
  }

  // searchByName(name: string): Observable<Property[]> {
  //   const url = `${this.apiUrl}/search/name/${name}`;
  //   return this.http.get<Property[]>(url);
  // }

  // searchByPrice(price: number): Observable<Property[]> {
  //   const url = `${this.apiUrl}/search/price/${price}`;
  //   return this.http.get<Property[]>(url);
  // }
  // searchByCategory(category: string): Observable<Property[]> {
  //   const url = `${this.apiUrl}/search/category/${category}`;
  //   return this.http.get<Property[]>(url);
  // }

}
