import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentIndeks, StudentProfile } from 'src/app/model';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit{

  studentService: StudentService;
  studentDto!: StudentIndeks;
  studentProfile!: StudentProfile;

  constructor(private route: ActivatedRoute, private router: Router, studentService : StudentService) {
    this.studentService = studentService
  }

  ngOnInit(): void {
    console.log('ngOnInit student component')
    const indeksShort: string = <string>this.route.snapshot.paramMap.get('indeksShort');
    this.studentService.findStudentByIndeksShort(indeksShort).subscribe(
      response => {
          this.studentDto = response
          this.studentService.getStudentProfile(this.studentDto.id).subscribe(
            response => {
                this.studentProfile = response
            },
            error => {
            }
          )
      },
      error => {
      }
    )
  }
}