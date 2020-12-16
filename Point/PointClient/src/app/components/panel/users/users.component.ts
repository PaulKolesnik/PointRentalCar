import { UserModel } from 'src/app/models/user-model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { store } from 'src/app/redux/store';
import { Unsubscribe } from 'redux';
import { AuthService } from 'src/app/services/auth.service';
import { Notyf } from 'notyf';
import { PhoneModel } from 'src/app/models/phone-model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, OnDestroy {


  users: UserModel[];
  user: UserModel;
  phone: PhoneModel = new PhoneModel();
  private userRole: string;
  private unsubscribe: Unsubscribe;

  constructor(
    private modalService: NgbModal,
    private authService: AuthService
  ) { }

  async ngOnInit() {
    this.unsubscribe = store.subscribe(() => {
      this.users = store.getState().users;
    });

    if (store.getState().users.length > 0) {
      this.users = store.getState().users;
    }
    else {
      await this.authService.LoadUsers();
    }

    console.log('users', this.users);
  }

  public ngOnDestroy(): void {
    this.unsubscribe();
  }


  open(content, id: number) {
    this.findUser(id);
    this.modalService.open(content, { size: 'lg' })
      .result.then((result) => {
        console.log(result);
      }, reason => {
        console.log(reason);
      });
  }
  public findUser(id: number): void {
    this.user = this.users.find(u => u.userID === id);
    this.user.phone = this.phone;
  }

  public async deleteUser(id: number) {
    try {
      const answer = confirm("Are you sure you want to delete?");
      if (!answer)
        return;


      await this.authService.DeleteUser(id);
      var notyf = new Notyf();
      notyf.success('User has been deleted!');
    }
    catch (err) {
      console.log(err.message);
    }
  }

}
