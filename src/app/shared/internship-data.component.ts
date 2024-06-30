import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Internship } from "./internship.model";

@Injectable({providedIn:"root"})
export class InternshipDataService{
    
    internshipSubject = new Subject<Internship[]>();

    internships: Internship[] = [
        new Internship("Dec 24", "waiting", "amazon", "swe"),
        new Internship("Dec 26", "waitingg", "amazong", "sweg")
    ]

    onDelete(index: number){
        this.internships.splice(index, 1);
        this.internshipSubject.next(this.internships);
    }
}