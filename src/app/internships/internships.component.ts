import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { InternshipDataService } from '../shared/internship-data.component';
import { Internship } from '../shared/internship.model';

@Component({
  //selector: 'app-internships',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './internships.component.html',
  styleUrls: ['./internships.component.css']
})
export class InternshipsComponent implements OnInit, OnDestroy{

  internships: Internship[];

  internshipSubscription = new Subscription();

  constructor(private internshipDataService: InternshipDataService, private router: Router) {}

  ngOnInit(): void {

    this.internshipSubscription = this.internshipDataService.internshipSubject.subscribe(internships => {
      this.internships = internships;
    });

    this.internshipDataService.getInternshipEntries();
    //this.internships = this.internshipDataService.internships;
  }
  
  ngOnDestroy(): void {
    this.internshipSubscription.unsubscribe();
  }

  onDelete(index: string){
    //console.log(index);
    this.internshipDataService.onDelete(index);
  }

  onEdit(index: string){
    this.router.navigate(["edit", index]);
  }

  getInternshipEntry(index: number){
    return {...this.internships[index]};
  }
}