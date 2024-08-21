import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { InternshipDataService } from '../shared/internship-data.component';
import { Internship } from '../shared/internship.model';

@Component({
  selector: 'app-internship-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './internship-form.component.html',
  styleUrls: ['./internship-form.component.css']
})
export class InternshipFormComponent implements OnInit {
  
  internshipForm: FormGroup;
  editMode = false;
  internship: Internship;
  paramId: string;

  constructor(private internshipDataService: InternshipDataService, private router: Router, private activatedRoute: ActivatedRoute, private authService: AuthService){}

  ngOnInit(): void {

    this.activatedRoute.paramMap.subscribe(paramMap => {
      if (paramMap.has('id')){
        this.editMode = true;
        this.paramId = paramMap.get('id')!;
        this.internship = this.internshipDataService.getInternshipEntry(this.paramId);
      }
      else{
        this.editMode = false;
      }
    })

    this.internshipForm = new FormGroup({
      "date": new FormControl(this.editMode ? this.internship.date : null, [Validators.required]),
      "status": new FormControl(this.editMode ? this.internship.status : null, [Validators.required]),
      "company": new FormControl(this.editMode ? this.internship.company : null, [Validators.required]),
      "role": new FormControl(this.editMode ? this.internship.role : null, [Validators.required]),
      "notes": new FormControl(this.editMode ? this.internship.notes : null, [Validators.required]),
    })
  }

  onSubmit(){

    if (!this.authService.getToken()) {
      //console.log('hi2');
      this.router.navigateByUrl('/login');
      return;
    }

    const userId = this.authService.getToken();

    if (!userId) {
      console.error('User ID is not available');
      return;
    }

    //console.log(this.internshipForm)
    const newInternship = new Internship('', this.internshipForm.value.date, this.internshipForm.value.status, this.internshipForm.value.company, this.internshipForm.value.role, this.internshipForm.value.notes, userId);
    
    if(this.editMode){
      newInternship._id = this.paramId;
      newInternship.user = userId;
      this.internshipDataService.onUpdateInternship(this.paramId, newInternship)
    }
    else{
      newInternship.user = userId;
      this.internshipDataService.onAddInternship(newInternship);
    }
    this.router.navigateByUrl("/dashboard");
  }

  cancelForm(){
    this.router.navigateByUrl("/dashboard");
  }
}
