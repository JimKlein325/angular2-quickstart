import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';


import 'rxjs/add/operator/toPromise';

import { Hero } from './hero';


@Injectable()
export class HeroService {
  private heroesUrl = 'http://heroservice20160929101222.azurewebsites.net/api/values';  // URL to web api

  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) { }

  getCatFact() {
    return this.http.get("http://catfacts-api.appspot.com/api/facts/")
      .map(response => response.json() );
  }
  getHeroes() {
     return this.http.get(this.heroesUrl)
     .map((res:Response) => res.json());

    }
  getHero(id: number) {
    console.log("hero id:" + id);
      return this.http.get(this.heroesUrl + '/' + id)
        .map((res:Response) => res.json());
  }


update(hero: Hero): Promise<Hero> {
  const url = `${this.heroesUrl}/${hero.id}`;
  return this.http
    .put(url, JSON.stringify(hero), {headers: this.headers})
    .toPromise()
    .then(() => hero)
    .catch(this.handleError);
}
create(name: string): Promise<Hero> {
  return this.http
    .post(this.heroesUrl, JSON.stringify({name: name}), {headers: this.headers})
    .toPromise()
    .then(res => res.json().data)
    .catch(this.handleError);
}
delete(id: number): Promise<void> {
  const url = `${this.heroesUrl}/${id}`;
  return this.http.delete(url, {headers: this.headers})
    .toPromise()
    .then(() => null)
    .catch(this.handleError);
}


  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
