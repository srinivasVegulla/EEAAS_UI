import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { WebService } from '../services/web.service';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-assets',
  templateUrl: './assets.component.html',
  styleUrls: ['./assets.component.scss']
})
export class AssetsComponent implements OnInit {

  listOfDevices;
  dataSource;
  usageHistoryData;
  usageHistoryDataSource;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatPaginator, { static: false }) paginatorUH: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  filterColumns = ['asset_name', 'asset_number', 'availablity', 'last_user', 'last_user_group'];
  displayedColumns = ['S_NO', 'asset_name', 'asset_number', 'availablity', 'last_user', 'last_user_group', 'actions'];
  UHdisplayedColumns = ['S_NO', 'pm_id', 'project_id', 'location_id', 'start_date', 'end_date', 'status'];
  UHfilterColumns = ['pm_id', 'project_id', 'location_id', 'start_date', 'end_date', 'status']
  filterValue = ['', '', '', '', ''];
  filterValueUH = ['', '', '', '', '', ''];
  filteredData;
  filteredDataUH;
  searchObj = [];
  searchObjUH = [];
  pageLength;
  pageLengthUH;
  pageSize = 10;
  pageSizeUH = 5;
  currentPage = 'assetsPage';
  currentAsset;
  assetForm;

  modalInputData = '';
  isModalOpen = false;
  editPageFrom;
  owner_groups = ['NextGen', 'IoT', 'EEaaS', 'CloudOps'];

  leftSideDeviceDetails = [
    {
      "key": 'asset_number',
      "displayName": 'Asset No'
    }, {
      "key": 'owner',
      "displayName": 'Device Owner'
    }, {
      "key": 'owner_group',
      "displayName": 'Device Owner Group'
    },
    {
      "key": 'location',
      "displayName": 'Location'
    }, {
      "key": 'brand',
      "displayName": 'Brand'
    }, {
      "key": 'model_number',
      "displayName": 'Model No'
    }, {
      "key": 'RAM',
      "displayName": 'Ram Size'
    }, {
      "key": 'voltage',
      "displayName": 'Voltage'
    }
  ];

  rightSideDeviceDetails = [
    {
      "key": 'passkey',
      "displayName": 'Pass Key'
    }, {
      "key": 'instructions',
      "displayName": 'Usage Instructions'
    }
  ]

  expandDropDown = false;
  dropDwnValue = 'Select device owner group';

  constructor(
    private webService: WebService,
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.webService.currentTab = 'Assets';
    this.getData();
    this.currentPage = 'assetsPage';
    this.currentAsset = '';
    this.editPageFrom = '';
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

  openDropdown() {
    this.expandDropDown = !this.expandDropDown;
  }

  openModalDialog(data) {
    this.modalInputData = data;
    this.isModalOpen = true;
  }

  closeModalDialog(dataObj) {
    this.isModalOpen = false;
    if (dataObj['isDelete']) {
      let data = {
        'asset_id': dataObj['data']['asset_id'],
        'action': 'delete'
      };
      this.webService.submitAssetDetails(data).subscribe(res => {
        this.ngOnInit();
      }, error => {
        alert("Something Went Wrong.")
      });
    }
  }

  getData() {
    this.webService.getAssetsData().subscribe(res => {
      this.listOfDevices = res;
      this.dataSource = new MatTableDataSource(this.listOfDevices.slice(0, this.pageSize));
      this.filteredData = this.listOfDevices;
      this.dataSource.sort = this.sort;
      this.pageLength = this.listOfDevices.length;
    });
  }

  showAssetDetailPage(row) {
    this.currentPage = 'detailPage';
    this.currentAsset = row;
    this.getassetUsageHistory(row);
  }
  getassetUsageHistory(rowData) {
    let data = {
      'asset_id': rowData['asset_id'],
    }
    this.filteredDataUH = [];
    this.filterValueUH = ['', '', '', '', '', ''];
    //this.usageHistoryData = [];
    this.webService.getassetUsageHistory(data).subscribe(res => {
      this.usageHistoryData = res;
      this.usageHistoryDataSource = new MatTableDataSource(this.usageHistoryData.slice(0, this.pageSizeUH));
      this.filteredDataUH = this.usageHistoryData;
      this.usageHistoryDataSource.sort = this.sort;
      this.pageLengthUH = this.usageHistoryData.length;
    }, error => {
      alert("Something Went Wrong.")
    });
  }
  backPage() {
    this.currentPage = 'assetsPage';
    this.ngOnInit();
  }
  applyFilter(searchText, column, i) {

    this.filterValue[i] = searchText;

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
          this.filteredData = this.listOfDevices.filter(function (device) {
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
      this.filteredData = this.listOfDevices;
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

  applyFilterUH(searchText, column, i) {

    this.filterValueUH[i] = searchText;

    let matchFound = false;
    //If searchObjUH has elements and typed column belongs to any available searchObjUH
    if (this.searchObjUH.length > 0) {
      this.searchObjUH.map((ele) => {
        if (ele.key == column) {
          ele.value = searchText;
          matchFound = true;
        }
      });
    }

    //If typed column is not there in searchObjUH push that Column to search
    if (!matchFound) {
      this.searchObjUH.push({
        'key': column,
        'value': searchText
      });
    };

    //Filter only to have non empty Search Criteria
    let finalSearchObj = this.searchObjUH.filter((obj) => {
      return (obj.value != '');
    });

    //Every Time reset the filtered data
    this.filteredData = [];

    if (finalSearchObj.length > 0) {
      for (let i = 0; i < finalSearchObj.length; i++) {
        //first element searches from whole available devices
        if (i == 0) {
          this.filteredDataUH = this.usageHistoryData.filter(function (device) {
            let key = finalSearchObj[i].key;
            let searchTextCol = finalSearchObj[i].value;
            return String(device[key]).toLowerCase().indexOf(searchTextCol.toLowerCase()) > -1;
          });
        } else {
          //After first element searches from already filtered elements
          let key = finalSearchObj[i].key;
          let searchTextCol = finalSearchObj[i].value;
          this.filteredDataUH = this.filteredDataUH.filter(function (device) {
            return String(device[key]).toLowerCase().indexOf(searchTextCol.toLowerCase()) > -1;
          });
        }
      }
    } else {
      this.filteredDataUH = this.usageHistoryData;
    }
    let pageEventObj = {
      'length': this.filteredDataUH.length,
      'pageIndex': 0,
      'pageSize': this.pageSizeUH,
      'previousPageIndex': 0
    }
    this.pageChangeEventUH(pageEventObj, this.filteredDataUH);
    this.pageLengthUH = this.filteredDataUH.length;
    //this.dataSource = new MatTableDataSource(this.filteredData);

  }

  clear(i, field) {
    this.filterValue[i] = '';
    this.applyFilter("", field, i);
  }

  clearUH(i, field) {
    this.filterValueUH[i] = '';
    this.applyFilterUH("", field, i);
  }

  clearAll() {
    this.filterValue = ['', '', '', '', ''];
    this.ngOnInit();
  }

  clearAllUH() {
    this.filterValueUH = ['', '', '', '', '', ''];
    this.getassetUsageHistory(this.currentAsset);
  }

  pageChangeEvent(event, data) {
    this.pageSize = event.pageSize;
    const offset = ((event.pageIndex + 1) - 1) * event.pageSize;
    this.dataSource = new MatTableDataSource(data.slice(offset).slice(0, event.pageSize));
  }

  pageChangeEventUH(event, data) {
    this.pageSizeUH = event.pageSize;
    const offset = ((event.pageIndex + 1) - 1) * event.pageSize;
    this.usageHistoryDataSource = new MatTableDataSource(data.slice(offset).slice(0, event.pageSize));
  }

  //pageEvent
  /* length: 5
  pageIndex: 1
  pageSize: 3
  previousPageIndex: 0 */
  createAnAsset(val) {
    this.currentPage = val;
    this.setFormValues();
  }
  cancelEditingAsset() {
    this.currentPage = this.editPageFrom;
  }

  setFormValues() {
    this.assetForm = this.fb.group({
      asset_name: ['', Validators.required],
      owner: ['', Validators.required],
      owner_group: ['', Validators.required],
      location: ['', Validators.required],
      brand: ['', Validators.required],
      model_number: ['', Validators.required],
      RAM: [''],
      voltage: [''],
      asset_number: ['', Validators.required],
      instructions: [''],
      passkey: [''],
    });
  }

  updateFormValues(data) {
    this.setFormValues();
    console.log("hi veguu data", data)
    this.assetForm.setValue({
      asset_name: data.asset_name,
      brand: data.brand,
      owner: data.owner,
      owner_group: data.owner_group,
      location: data.location,
      model_number: data.model_number,
      RAM: data.RAM,
      voltage: data.voltage,
      asset_number: data.asset_number,
      instructions: data.instructions,
      passkey: data.passkey,
    });
    this.dropDwnValue = data.owner_group;
  }

  updateAsset(rowData, pageLocation) {
    this.updateFormValues(rowData);
    this.currentPage = 'editPage';
    this.editPageFrom = pageLocation;
    this.currentAsset = rowData;
  }

  get asset_name() {
    return this.assetForm.get('asset_name');
  }
  get owner() {
    return this.assetForm.get('owner');
  }
  get owner_group() {
    return this.assetForm.get('owner_group');
  }
  get location() {
    return this.assetForm.get('location');
  }
  get brand() {
    return this.assetForm.get('brand');
  }

  get model_number() {
    return this.assetForm.get('model_number');
  }
  get RAM() {
    return this.assetForm.get('RAM');
  }

  get voltage() {
    return this.assetForm.get('voltage');
  }
  get asset_number() {
    return this.assetForm.get('asset_number');
  }

  submitAsset(data, action) {
    data['action'] = action;
    console.log("hi device data", data);
    if (action == 'update') {
      data['asset_id'] = this.currentAsset.asset_id;
    }
    this.webService.submitAssetDetails(data).subscribe(res => {
      if (action == 'create' || this.editPageFrom == 'assetsPage') {
        this.currentPage = 'assetsPage';
        this.ngOnInit();
      } else if (action == 'update') {
        this.currentPage = this.editPageFrom;
        this.currentAsset = data;
        this.getData();
      }
    }, error => {
      alert("Something Went Wrong.")
    });
  }

  EditService(row) {
    console.log("hi assets row edit", row);
  }

  deleteService(row) {
    this.openModalDialog(row);
  }

  changeOwnerGroup(ownerName) {
    this.expandDropDown = !this.expandDropDown;
    this.dropDwnValue = ownerName;
    this.owner_group.setValue(ownerName);
    console.log("hi asetForm", this.assetForm.value, this.assetForm.invalid)
  }

}
