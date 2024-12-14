import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Indeks, Student, StudentIndeks, StudentProfile, StudijskiProgram } from 'src/app/model';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit{

  studentService: StudentService;
  studentProfile!: StudentProfile;

  constructor(private route: ActivatedRoute, private router: Router, studentService : StudentService) {
    this.studentService = studentService
  }

  ngOnInit(): void {
    const indeksShort: string = <string>this.route.snapshot.paramMap.get('indeksShort');

    if (indeksShort === "-1"){
        this.studentProfile = <StudentProfile>{ };
        this.studentProfile.indeks = <Indeks>{ godina: 2025 };
        this.studentProfile.indeks.student = <Student>{ };
        this.studentProfile.indeks.studijskiProgram = <StudijskiProgram>{ };
    }else{
      this.studentService.findStudentByIndeksShort(indeksShort).subscribe(
        studentDto => {
            this.studentService.getStudentProfile(studentDto.id).subscribe(
              response => {
                  this.studentService.getUploadedImage(studentDto.student.id).subscribe(
                    slikaByte => {
                      response.indeks.student.slika = this.arrayBufferToBase64(slikaByte)
                      this.studentProfile = response
                    }
                  )
              },
              error => {
                alert('Ne postoji student sa indeksom ' + indeksShort)
              }
            )
        },
        error => {
          alert('Ne postoji student sa indeksom ' + indeksShort)
        }
      )
    }
  }

  // Convert byte array to Base64 string
  arrayBufferToBase64(buffer: Uint8Array): string {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const length = bytes.byteLength;
    if (length === 0) return '';
    for (let i = 0; i < length; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return 'data:image/jpeg;base64,' + window.btoa(binary); // Change image type if necessary
  }

}