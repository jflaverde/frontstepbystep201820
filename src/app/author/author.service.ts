import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/catch';

import { Author } from './author';
import { Book } from '../book/book';

import { environment } from '../../environments/environment';
const API_URL = environment.apiURL;
const authors = '/authors';
const books = '/books';

/**
* The service provider for everything related to authors
*/
@Injectable()
export class AuthorService {
    
    /**
    * Constructor of the service
    * @param http The HttpClient - This is necessary in order to perform requests
    */
    constructor(private http: HttpClient) { }
    
    /**
    * Returns the Observable object containing the list of authors retrieved from the API
    * @returns The list of authors in real time
    */
    getAuthors(): Observable<Author[]> {
        return this.http.get<Author[]>(API_URL + authors).catch(err => this.handleError(err));
    }
    
    /**
    * Returns the Observable object with the details of an author retrieved from the API
    * @returns The author details
    */
    getAuthor(authorId): Observable<Author> {
        return this.http.get<Author>(API_URL + authors + '/' + authorId).catch(err => this.handleError(err));
    }
    
    /**
    * Returns the Observable object with the books of an author retrieved from the API
    * @returns The author's books
    */
    getBooksOfAuthor(authorId): Observable<Book[]> {
        return this.http.get<Book[]>(API_URL + authors + '/' + authorId + books).catch(err => this.handleError(err));
    }
    
    /**
    * The method which handles the errors generated by the requests
    * @param error The error which the API REST returned
    */
    private handleError(error: any) { 
        return throwError(error.error.errorMessage);
    }
}
