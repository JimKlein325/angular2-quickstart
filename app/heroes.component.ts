import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Hero } from './hero';
import { HeroService } from './hero.service';

@Component({
    selector: 'my-heroes',
    providers: [HeroService],
    template: `
      <ul class="heroes">
        <li *ngFor="let hero of heroes"
        [class.selected]="hero === selectedHero"
        (click)="onSelect(hero)">
          <span class="badge">{{hero.id}}</span> {{hero.name}}
        </li><button class="delete"
  (click)="delete(hero); $event.stopPropagation()">x</button>

      </ul>
      <div *ngIf="selectedHero">
        <h2>
          {{selectedHero.name | uppercase}} is my hero
        </h2>
        <button (click)="gotoDetail()">View Details</button>
      </div>
      <div>
        <label>Hero name:</label> <input #heroName />
        <button (click)="add(heroName.value); heroName.value=''">
          Add
        </button>
      </div>
    `
})
export class HeroesComponent implements OnInit {
  title = 'Tour of Heroes';
  selectedHero: Hero;
  heroes : Hero[];

  constructor(private heroService: HeroService, private router: Router) {  }

  ngOnInit(): void {
    this.getHeroes();
  }
  getHeroes(): void {
    this.heroService.getHeroes().then(heroes => this.heroes = heroes);
  }
  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }
  gotoDetail(): void {
    this.router.navigate(['/detail', this.selectedHero.id]);
  }
  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroService.create(name)
      .then(hero => {
        this.heroes.push(hero);
        this.selectedHero = null;
      });
    }
    delete(hero: Hero): void {
      this.heroService
          .delete(hero.id)
          .then(() => {
            this.heroes = this.heroes.filter(h => h !== hero);
            if (this.selectedHero === hero) { this.selectedHero = null; }
          });
    }

}
