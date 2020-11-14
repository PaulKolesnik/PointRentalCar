import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  //profileForm: FormGroup;

  public profileForm = new FormGroup({
    email: new FormControl(''),
    subject: new FormControl(''),
    textarea: new FormControl('')
  });
  public descriptionLength = new BehaviorSubject(0);
  constructor(){
    (this.profileForm.controls['textarea'] as FormControl)
    .valueChanges.subscribe( v => this.descriptionLength.next(v.length));
  }

  ngOnInit(): void {

  }


  onSubmit() {
    console.warn(this.profileForm.value);
  }
}
