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
  // getCustomers() {
  //     return this.http.get(URL_CUSTOMER)
  //       .map((response: Response) => response.json())
  //       .toPromise()
  //       .catch((err: any) => {
  //         console.log(err); // again, customize me please
  //         return Promise.reject(err);
  //       });
  //   }
  getHeroes() {
     return this.http.get(this.heroesUrl)
     .map((res:Response) => res.json());

    // this.http.get(this.heroesUrl)
    //   .map((res:Response) => res.json())
    //   .subscribe(
    //     data => { this.heroes = data},
    //     err => console.error(err),
    //     () => console.log('done')
    //   );
    }
  // getHeroes(): Promise<Hero[]> {
  //   return this.http.get(this.heroesUrl)
  //               .toPromise()
  //               .then(response =>
  //                 {
  //                   console.log(response);
  //                   response.json().data as Hero[];
  //                 })
  //               .catch(this.handleError);
  //                  }
  // getHero(id: number): Promise<Hero> {
  //   return this.getHeroes()
  //     .then(heroes => heroes.find(hero => hero.id === id));
  // }


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
