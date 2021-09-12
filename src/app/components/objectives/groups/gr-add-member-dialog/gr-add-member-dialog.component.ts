import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  switchMap,
  take,
} from 'rxjs/operators';
import { LoadService } from 'src/libraries/loading/services/load.service';
import { DatabaseService } from 'src/libraries/util/services/database.service';
import firebase from 'firebase/compat/app';
import { GlobalVariablesService } from 'src/libraries/util/services/global-variables.service';
import {
  GroupMemberModel,
  GroupMemberRole,
} from 'src/app/models/objectives/group.model';

@Component({
  selector: 'gr-add-member-dialog',
  templateUrl: './gr-add-member-dialog.component.html',
  styleUrls: ['./gr-add-member-dialog.component.scss'],
})
export class GrAddMemberDialogComponent implements OnInit {
  private searchSubject = new BehaviorSubject<any>({});

  membersToAdd: GroupMemberModel[] = [];
  searchResult: firebase.User[];

  searchQuery = '';

  constructor(
    public gv: GlobalVariablesService,
    private load: LoadService,
    private db: DatabaseService
  ) {}

  ngOnInit(): void {
    this.setSearch();
  }

  setSearch() {
    this.searchSubject
      .pipe(
        debounceTime(1000),
        distinctUntilChanged(),
        switchMap(() => this.doSearch())
      )
      .subscribe();
  }

  search() {
    this.searchSubject.next({});
  }

  stageMember(user: firebase.User) {
    if (this.membersToAdd.find((u) => u.id === user.uid) == null)
      this.membersToAdd.push({
        id: user.uid,
        email: user.email,
        name: user.displayName,
        role: GroupMemberRole.user,
      });
  }

  unstageMember(user: GroupMemberModel) {
    const i = this.membersToAdd.findIndex((u) => u.id === user.id);
    if (i >= 0) this.membersToAdd.splice(i, 1);
  }

  private async doSearch() {
    this.searchQuery = this.searchQuery.trim();
    if (this.searchQuery === '') {
      this.searchResult = [];
      return;
    }

    this.load.load('search');

    this.db.db
      .collection('users-public', (ref) =>
        ref
          .orderBy('email')
          .startAt(this.searchQuery)
          .endAt(this.searchQuery + '\uf8ff')
          .limit(5)
      )
      .valueChanges()
      .subscribe((users: firebase.User[]) => {
        this.searchResult = users;

        this.load.unload('search');
      });
  }
}
