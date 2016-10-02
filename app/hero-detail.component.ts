import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';

import { HeroService } from './hero.service';
import { Hero } from './hero';
import { Router } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'my-hero-detail',
  providers: [HeroService],
  template: `
    <div *ngIf="hero">
      <h2>{{hero.name}} details!</h2>
      <div>
        <label>id: </label>{{hero.id}}
      </div>
      <div>
        <label>name: </label>
        <input [(ngModel)]="hero.name" placeholder="name"/>
      </div>
      <button (click)="save()">Save</button>

      <button (click)="goBack()">Back</button>
    </div>
    `
})
export class HeroDetailComponent implements OnInit {
  hero: Hero;
  constructor(
    private heroService: HeroService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      let id = +params['id'];
      this.heroService.getHero(id)
       .subscribe(
         data => { this.hero = data},
         err => { console.log("error in get Hero: " + err) },
         () => console.log("done with get Hero")
       )
    });
  }

      //  this.heroService.getHero(id)
      //  .subscribe(
      //    data => { this.hero = data},
      //    err => { console.log("error in get Hero: " + err) },
      //    () => console.log("done with get Hero")
      //  })
    //  });

    // console.log("onInit hero detail");
    // this.heroService.getHero();
    // .subscribe(
    //   data => { this.hero = data},
    //   err => { console.log("error in get Hero: " + err) },
    //   () => console.log("done with get Hero")
    // );

   // this.route.params.forEach((params: Params) => {
    //   let id = +params['id'];
    //   this.heroService.getHero(id)
    //     .then(hero => this.hero = hero);
    //});

//   save(): void {
//   this.heroService.update(this.hero)
//     .then(() => this.goBack());
// }
//
//   goBack(): void {
//     this.location.back();
//   }
}
