import { Component, OnInit } from '@angular/core';
import { Hero } from './hero';
import { HeroService } from './hero.service';
import { Router } from '@angular/router';

@Component({
  selector: 'my-dashboard',
  template: `
  <h3>Top Heroes</h3>
    <div class="grid grid-pad">
    <div *ngFor="let hero of heroes" (click)="gotoDetail(hero)" class="col-1-4">
      <div class="module hero">
        <h4>{{hero.name}}</h4>
      </div>
    </div>
    </div>
  <hero-search></hero-search>
  `
})
export class DashboardComponent {
  heroes: Hero[] = [];

  constructor(private heroService: HeroService, private router: Router) { }

  ngOnInit(): void {
    this.heroService.getCatFact().subscribe(data => console.log(data));
    this.heroService.getHeroes()
      .then(heroes => this.heroes = heroes.slice(1, 5));
  }

  gotoDetail(hero: Hero): void {
    let link = ['/detail', hero.id];
    this.router.navigate(link);
  }
}
