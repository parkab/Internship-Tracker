import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Internship } from "./internship.model";

@Injectable({providedIn:"root"})
export class InternshipDataService{
    [x: string]: any;
    
    internshipSubject = new Subject<Internship[]>();

    internships: Internship[] = [
        new Internship("No internships yet!", "Waiting", "Try adding a new one", "from the bar above!", "note1")
    ]

    onDelete(index: number){
        this.internships.splice(index, 1);
        this.internshipSubject.next(this.internships);
    }

    onAddInternship(internship: Internship){
        this.internships.push(internship);
        this.internshipSubject.next(this.internships);
    }

    getInternshipEntry(index: number){
        return {...this.internships[index]};
    }

    onUpdateInternship(paramId: number, internship: Internship){
        this.internships[paramId] = internship;
        this.internshipSubject.next(this.internships);
    }
}