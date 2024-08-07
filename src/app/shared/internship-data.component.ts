import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Internship } from "./internship.model";


@Injectable({providedIn:"root"})
export class InternshipDataService{
    // [x: string]: any;

    public maxId: number;
    
    constructor(private http: HttpClient){}

    internshipSubject = new Subject<Internship[]>();

    internships: Internship[] = [
        //new Internship("No internships yet!", "Waiting", "Try adding a new one", "from the bar above!", "note1")
    ];

    onDelete(index: number){
        // this.internships.splice(index, 1);
        // this.internshipSubject.next(this.internships);
        this.http.delete<{message: string}>('http://localhost:3000/remove-internship/' + index).subscribe((jsonData) => {
            console.log(jsonData.message);
            this.getInternshipEntries();
        })
    }

    onAddInternship(internship: Internship){

        this.http.get<{maxId: number}>('http://localhost:3000/max-id').subscribe((jsonData) => {
            internship.id = jsonData.maxId + 1;

            this.http.post<{message: string}>('http://localhost:3000/add-internship', internship).subscribe((res) => {
                console.log(internship);
                this.getInternshipEntries();
            })
        })

        // this.internships.push(internship);
        // this.internshipSubject.next(this.internships);
    }

    getInternshipEntry(id: number){
        // return {...this.internships[index]};
        const index = this.internships.findIndex((el) =>{
            return el.id == id;
        })
        return this.internships[index];
    }

    getInternshipEntries(){
        this.http.get<{internships: Internship[]}>('http://localhost:3000/internships').subscribe((jsonData) => {
            this.internships = jsonData.internships;
            this.internshipSubject.next(this.internships);
        })
    }

    onUpdateInternship(id: number, internship: Internship){
        // this.internships[paramId] = internship;
        // this.internshipSubject.next(this.internships);
        this.http.put<{message: string}>('http://localhost:3000/update-internship/' + id, internship).subscribe((jsonData) => {
            console.log(jsonData.message);
            this.getInternshipEntries();
        })
    }
}