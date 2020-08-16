import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { WebService } from '../services/web.service';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-new-users',
  templateUrl: './new-users.component.html',
  styleUrls: ['./new-users.component.scss']
})
export class NewUsersComponent implements OnInit {


  listOfUsers;
  dataSource;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  filterColumns = ['user_name', 'user_group', 'location'];
  displayedColumns = ['S_NO', 'user_name', 'user_group', 'location', 'actions'];
  tValue = ['', '', ''];
  filteredData;
  searchObj = [];
  pageLength;
  pageSize = 5;
  isCreateUser = false;
  userForm;
  modalInputData = '';
  isModalOpen = false;
  roles = ['PM', 'LM', 'Developer'];
  dropDwnValue = 'Select a Role';
  usersGroupDrpDwnVal = 'Select users group';
  expandDropDown = false;
  userGroups = ['NextGen', 'IoT', 'EEaaS', 'CloudOps'];
  expandUGDropDown = false;

  constructor(
    private webService: WebService,
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.webService.currentTab = 'USERS';
    //this.searchObj = [];
    this.tValue = ['', '', ''];
    this.getData();
  }

  getData() {
    this.webService.getUsersData().subscribe(res => {
      this.listOfUsers = res;
      console.log("hi users", res)

      this.dataSource = new MatTableDataSource(this.listOfUsers.slice(0, this.pageSize));
      this.filteredData = this.listOfUsers;
      // this.pageChangeEvent(this.listOfUsers, this.listOfUsers);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.pageLength = this.listOfUsers.length;
    });
  }

  viewRequest(row) {
    console.log("hi assets row", row);
  }
  applyFilter(searchText, column, i) {

    this.tValue[i] = searchText;

    let matchFound = false;
    //If searchObj has elements and typed column belongs to any available searchObj
    if (this.searchObj.length > 0) {
      this.searchObj.map((ele) => {
        if (ele.key == column) {
          ele.value = searchText;
          matchFound = true;
        }
      });
    }

    //If typed column is not there in searchObj push that Column to search
    if (!matchFound) {
      this.searchObj.push({
        'key': column,
        'value': searchText
      });
    };

    //Filter only to have non empty Search Criteria
    let finalSearchObj = this.searchObj.filter((obj) => {
      return (obj.value != '');
    });

    //Every Time reset the filtered data
    this.filteredData = [];

    if (finalSearchObj.length > 0) {
      for (let i = 0; i < finalSearchObj.length; i++) {
        //first element searches from whole available devices
        if (i == 0) {
          this.filteredData = this.listOfUsers.filter(function (device) {
            let key = finalSearchObj[i].key;
            let searchTextCol = finalSearchObj[i].value;
            return String(device[key]).toLowerCase().indexOf(searchTextCol.toLowerCase()) > -1;
          });
        } else {
          //After first element searches from already filtered elements
          let key = finalSearchObj[i].key;
          let searchTextCol = finalSearchObj[i].value;
          this.filteredData = this.filteredData.filter(function (device) {
            return String(device[key]).toLowerCase().indexOf(searchTextCol.toLowerCase()) > -1;
          });
        }
      }
    } else {
      this.filteredData = this.listOfUsers;
    }
    let pageEventObj = {
      'length': this.filteredData.length,
      'pageIndex': 0,
      'pageSize': this.pageSize,
      previousPageIndex: 0
    }
    this.pageChangeEvent(pageEventObj, this.filteredData);
    this.pageLength = this.filteredData.length;
    //this.dataSource = new MatTableDataSource(this.filteredData);

  }

  clear(i, field) {
    this.tValue[i] = '';
    this.applyFilter("", field, i);
  }

  clearAll() {
    this.tValue = ['', '', ''];
    this.ngOnInit()
  }

  pageChangeEvent(event, data) {
    console.log("hi event", event)
    this.pageSize = event.pageSize;
    const offset = ((event.pageIndex + 1) - 1) * event.pageSize;
    this.dataSource = new MatTableDataSource(data.slice(offset).slice(0, event.pageSize));
  }

  //pageEvent
  /* length: 5
  pageIndex: 1
  pageSize: 3
  previousPageIndex: 0 */
  createAnAsset(val) {
    this.isCreateUser = val;
    if (val)
      this.setFormValues()
  }
  setFormValues() {
    this.userForm = this.fb.group({
      user_name: ['', Validators.required],
      user_group: ['', Validators.required],
      location: ['', Validators.required],
      password: ['', Validators.required],
      role: [''],
    });
    this.dropDwnValue = 'Select a Role';
    this.usersGroupDrpDwnVal = 'Select users group';
  }

  get user_name() {
    return this.userForm.get('user_name');
  }
  get user_group() {
    return this.userForm.get('user_group');
  }

  get location() {
    return this.userForm.get('location');
  }
  get password() {
    return this.userForm.get('password');
  }

  get role() {
    return this.userForm.get('role');
  }


  submitUser(data) {
    data['action'] = 'create';
    this.webService.submitUserDetails(data).subscribe(res => {
      this.isCreateUser = false;
      this.ngOnInit();
    }, error => {
      alert("Something Went Wrong.")
    });
  }

  EditService(row) {
    console.log("hi assets row edit", row);
  }

  deleteService(data) {
    this.openModalDialog(data);
  }

  @HostListener('document:keydown', ['$event'])
  function(event) {
    if (event.key == "Escape") {
      this.closeModalDialog({
        'isDelete': false,
        'data': ''
      });
    }
  }


  openModalDialog(data) {
    this.modalInputData = data;
    this.isModalOpen = true;
  }

  closeModalDialog(dataObj) {
    this.isModalOpen = false;
    if (dataObj['isDelete']) {
      let data = dataObj['data'];
      data['action'] = 'delete';
      this.webService.submitUserDetails(data).subscribe(res => {
        this.ngOnInit();
      }, error => {
        alert("Something Went Wrong.")
      });
    }
  }

  changeRole(roleName) {
    this.dropDwnValue = roleName;
    this.expandDropDown = !this.expandDropDown;
    this.role.setValue(roleName, {
      onlySelf: true
    });
    console.log("hi  form bvalue", this.userForm.value, this.userForm.invalid, roleName);
  }

  changeUserGroup(userGroup) {
    this.usersGroupDrpDwnVal = userGroup;
    this.expandUGDropDown = !this.expandUGDropDown;
    this.user_group.setValue(userGroup, {
      onlySelf: true
    });
    console.log("hi  form bvalue", this.userForm.value, this.userForm.invalid);
  }

  openDropdown() {
    this.expandDropDown = !this.expandDropDown;
  }

  openUSerGroupDropdown() {
    this.expandUGDropDown = !this.expandUGDropDown;
  }



}
