import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
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

  constructor(private internshipDataService: InternshipDataService) {}

  ngOnInit(): void {
    this.internshipSubscription = this.internshipDataService.internshipSubject.subscribe(internships => {
      this.internships = internships;
    });
    this.internships = this.internshipDataService.internships;
  }
  
  ngOnDestroy(): void {
    this.internshipSubscription.unsubscribe();
  }

  onDelete(index: number){
    console.log(index);
    this.internshipDataService.onDelete(index);
  }
}