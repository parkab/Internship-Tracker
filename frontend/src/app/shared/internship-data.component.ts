import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map, of, Subject } from "rxjs";
import { AuthService } from "../services/auth.service";
import { Internship } from "./internship.model";

@Injectable({providedIn:"root"})
export class InternshipDataService{
    // [x: string]: any;
    // all local paths used to be: http://localhost:3000
    // new backend path: https://internship-tracker-q5u0.onrender.com

    //private url = 'http://localhost:3000';
    private url = 'https://internship-tracker-q5u0.onrender.com';

    public maxId: number;
    
    constructor(private http: HttpClient, private authService: AuthService){}

    internshipSubject = new Subject<Internship[]>();

    internships: Internship[] = [
        //new Internship("No internships yet!", "Waiting", "Try adding a new one", "from the bar above!", "note1")
    ];

    private getHeaders() {
        const token = this.authService.getToken();
        return new HttpHeaders({
            'Authorization': `Bearer ${token}`
        });
    }
    
    onDelete(index: string){
        // this.internships.splice(index, 1);
        // this.internshipSubject.next(this.internships);
        this.http.delete<{message: string}>(this.url + '/remove-internship/' + index, {headers: this.getHeaders(), withCredentials: true}).subscribe((jsonData) => {
            console.log(jsonData.message);
            this.getInternshipEntries();
        })
    }

    onAddInternship(internship: Internship){

        // this.http.get<{maxId: string}>('http://localhost:3000/max-id').subscribe((jsonData) => {
        //     internship.id = jsonData.maxId + 1;
        // })
        // this.internships.push(internship);
        // this.internshipSubject.next(this.internships);

        // const userId = this.authService.getToken();

        // if (userId) {
        //     internship.user = userId; // Add user ID to the internship
        // }

        this.http.post<{message: string}>(this.url + '/add-internship', internship, {headers: this.getHeaders(), withCredentials: true}).subscribe((res) => {
            console.log(internship);
            this.getInternshipEntries();
        })
    }

    // onAddInternship(internship: Internship) {
    //     this.http.post<{ message: string }>('http://localhost:3000/add-internship', internship, { headers: this.getHeaders() })
    //         .subscribe((res) => {
    //             console.log(res.message);
    //             this.getInternshipEntries();
    //         });
    // }

    getInternshipEntry(id: string){
        //return {...this.internships[index]};
        const index = this.internships.findIndex((el) =>{
            return el._id == id;
        })
        return this.internships[index];
        //return this.http.get<Internship>(`http://localhost:3000/internships/${id}`);
    }

    getInternshipEntries() {
        this.http.get<{ internships: any }>(this.url + '/internships', { headers: this.getHeaders(), withCredentials: true })
            .pipe(
                map((responseData) => {
                    if (!responseData.internships) {
                        console.warn("No internships found in response data.");
                        return [];
                    }
                    return responseData.internships.map((entry: { date: string; status: string; company: string; role: string; notes: string; _id: string; user: string; }) => ({
                        date: entry.date,
                        status: entry.status,
                        company: entry.company,
                        role: entry.role,
                        notes: entry.notes,
                        _id: entry._id,
                        user: entry.user
                    }));
                }),
                catchError(error => {
                    console.error('Error fetching internships:', error);
                    return of([]); // Return an observable with an empty array as fallback
                })
            )
            .subscribe((jsonData) => {
                this.internships = jsonData;
                this.internshipSubject.next(this.internships);
            });
    }

    onUpdateInternship(id: string, internship: Internship){
        // this.internships[paramId] = internship;
        // this.internshipSubject.next(this.internships);
        this.http.put<{message: string}>(this.url + '/update-internship/' + id, internship, {headers: this.getHeaders(), withCredentials: true}).subscribe((jsonData) => {
            console.log(jsonData.message);
            this.getInternshipEntries();
        })
    }
    // onUpdateInternship(id: string, internship: Internship) {
    //     this.http.put<{ message: string }>('http://localhost:3000/update-internship/' + id, internship, { headers: this.getHeaders() })
    //         .subscribe((jsonData) => {
    //             console.log(jsonData.message);
    //             this.getInternshipEntries();
    //         });
    // }
}