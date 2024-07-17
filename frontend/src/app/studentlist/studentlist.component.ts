import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { response } from 'express';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { EditDialogComponent } from '../edit-dialog/edit-dialog.component';
@Component({
  selector: 'app-studentlist',
  templateUrl: './studentlist.component.html',
  styleUrl: './studentlist.component.css'
})
export class StudentlistComponent implements OnInit  {

  students: any[] = [];
  constructor( private apiService: ApiService, private http: HttpClient, private router: Router, private dialog:MatDialog) {
  }

  ngOnInit(): void {
  this.getstlist();
  }
// for getting student list 
  getstlist() { 
   
      this.apiService.getStudents().subscribe(response => {
        this.students = response;
        console.log(this.students);
       
      });
  }
// deletion a student 
deletest(id: string): void {
  const dialogref = this.dialog.open(DeleteDialogComponent, {
    width: '300px',
    position: { left: '40%' },
  });

  dialogref.afterClosed().subscribe(result => {
    if (result) {
      this.apiService.deletestudent(id).subscribe(response => {
        this.students = this.students.filter(st => st._id !== response._id);
      });
    }
  });
}

// edit student data 
editst(st: any): void {
  const dialogref = this.dialog.open(EditDialogComponent, {
    width: '400px',
    panelClass: 'custom-dialog-container',
    position: { left: '40%' },
    data: { st }
  });

  
  dialogref.afterClosed().subscribe(result => {
    if (result) {
      this.getstlist();
    }
  });
}

}
