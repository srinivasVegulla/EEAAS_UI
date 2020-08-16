import { ChangeDetectorRef, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule }     from './app-routing.module';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

//3PP Modules
import { MatButtonModule, MatCardModule, MatInputModule, MatSnackBarModule, MatDatepickerModule, MatNativeDateModule, MatToolbarModule, MatSelectModule } from '@angular/material';
import { MatTableModule } from '@angular/material/table';
import { CdkTableModule } from '@angular/cdk/table';
import { MatSelect } from '@angular/material';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatPaginatorModule } from '@angular/material';
import { MatIconModule } from "@angular/material/icon";
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSortModule } from '@angular/material/sort';

import { AmChartsModule } from "@amcharts/amcharts3-angular";
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { jsPlumb } from 'jsplumb';
import { AngularDateTimePickerModule } from 'angular2-datetimepicker';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { ToastrModule } from 'ngx-toastr';
import { DlDateTimeDateModule, DlDateTimePickerModule } from 'angular-bootstrap-datetimepicker';
import * as $ from 'jquery';


//import { NgCircleProgressModule } from 'ng-circle-progress';
//import { RoundProgressModule, ROUND_PROGRESS_DEFAULTS } from 'angular-svg-round-progressbar';
//import { DropdownModule } from "ngx-dropdown";
//import { CalendarComponent } from './calendar/calendar.component';
//import { FullCalendarModule } from 'ng-fullcalendar';

//Service Components
import { WebService } from './services/web.service';
import { AuthService } from './services/auth.service';
import { Authguard } from './services/authguard.service';
import { Dashguard } from './services/dashguard.service';
import { ApiService } from "../app/bare-metal/services/api.service";

//PIPES
import { SearchPipe } from './search.pipe';
import { DatePipe } from '@angular/common';

//Custom Components
import { MenuComponent } from './pmsidebar/menu.component';
import { AppComponent } from './app.component';
import { NavComponent } from './navigation/nav.component';
import { LoginComponent, TrackCapsDirective } from './login/login.component';
import { PmdashboardComponent } from './pmdashboard/pmdashboard.component';
import { NewRequestComponent } from './pm-new-request/new-request.component';
import { RequestListComponent } from './request-list/request-list.component';
import { ChatbotComponent } from './chatbot/chatbot.component';
import { AdminRequestListComponent } from './admin-request-list/admin-request-list.component';
import { myPopup, successPopup } from './admin-request-list/admin-request-list.component';
import { submitPopup } from './admin-request-list/admin-request-list.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { myAddPopup } from './users/users.component';
import { AdminSidebarComponent } from './admin-sidebar/admin-sidebar.component';
import { PmordersummaryComponent } from './pmordersummary/pmordersummary.component';
import { PmrequestlistComponent, orderPopup, deletePopup, cancelPopup } from './pmrequestlist/pmrequestlist.component';
import { TestComponent, testSuccessPopup } from './test/test.component';
import { TesterSidebarComponent } from './tester-sidebar/tester-sidebar.component';
import { DevelopersidebarComponent } from './developersidebar/developersidebar.component';
import { DeveloperComponent } from './developer/developer.component';
import { AssuranceComponent } from './assurance/assurance.component';
import { ReservationSystemComponent } from './reservation-system/reservation-system.component';
import { CatalogueComponent } from './catalogue/catalogue.component';
import { ReservationDialogComponent } from './reservation-dialog/reservation-dialog.component';
import { InventoryComponent } from './inventory/inventory.component';
import { DesignerComponent, editServicePopup } from './designer/designer.component';
import { DesignerSidebarComponent } from './designer-sidebar/designer-sidebar.component';
import { ServiceRequestComponent } from './service-request/service-request.component';
// import { DaterangepickerModule } from 'angular-2-daterangepicker';
import { ServiceRequestListComponent } from './service-request-list/service-request-list.component';
import { ExtendPopupComponent } from './extend-popup/extend-popup.component';
import { LmsidebarComponent } from './lmsidebar/lmsidebar.component';
import { LmComponent } from './lm/lm.component';
import { ProjectsComponent } from './projects/projects.component';
import { BillingComponent, projectListPopup } from './billing/billing.component';
import { PmphysicalserviceComponent } from './pmphysicalservice/pmphysicalservice.component';
import { LabsComponent } from './labs/labs.component';
import { UsersComponent } from './users/users.component';
import { UtilizationReportsComponent } from './utilization-reports/utilization-reports.component';
import { AddLabsPopupComponent } from './add-labs-popup/add-labs-popup.component';
import { LmdashboardComponent } from './lmdashboard/lmdashboard.component';
import { HolidaysComponent, addorEditHoliday } from './holidays/holidays.component';
import { ReserveServersComponent } from './bare-metal/components/pm/reserve-servers/reserve-servers.component'
import { ServersListComponent } from './bare-metal/components/pm/servers-list/servers-list.component';
import { MyReservationsComponent } from './bare-metal/components/pm/my-reservations/my-reservations.component';
import { ProcessMyReservationsComponent } from './bare-metal/components/pm/process-my-reservations/process-my-reservations.component';
import { LmReqProcessingComponent } from './bare-metal/components/lm/lm-req-processing/lm-req-processing.component';
import { ReserveSwitchComponent } from './bare-metal/components/pm/reserve-switch/reserve-switch.component';
import { LoaderInterceptor } from './interceptors/loader.interceptor';
import { CarouselComponent } from './bare-metal/components/common-components/carousel/carousel.component';
import { HomeComponent } from './home/home.component';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { CalendarComponent } from './calendar/calendar.component';
import { AssetsComponent } from './assets/assets.component';
import { NewUsersComponent } from './new-users/new-users.component';
import { IsDeleteModalPopupComponent } from './is-delete-modal-popup/is-delete-modal-popup.component';
import { RequestModalPopupComponent } from './request-modal-popup/request-modal-popup.component';
import { DeviceUsageChartComponent } from './device-usage-chart/device-usage-chart.component';
import { DeviceOverviewComponent } from './device-overview/device-overview.component';

@NgModule({
  exports: [
    MatCardModule,
    MatCheckboxModule,
    MatDialogModule,
    MatInputModule,
    MatSelectModule,
    MatSnackBarModule,
    MatSortModule
  ],
  imports: [
    OwlDateTimeModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AngularFontAwesomeModule, 
    HttpClientModule,
    ToastrModule.forRoot(),
    DlDateTimeDateModule,
    DlDateTimePickerModule,
    OwlNativeDateTimeModule, 
    AngularDateTimePickerModule, 
    AmChartsModule, 
    MatSortModule, 
    BrowserModule,
    Ng4LoadingSpinnerModule.forRoot(), 
   //RoundProgressModule,
    MatCheckboxModule, MatDialogModule, MatIconModule, MatPaginatorModule, FormsModule, MatTableModule, MatExpansionModule, MatDatepickerModule, MatNativeDateModule,
    MatButtonModule, MatCardModule, MatInputModule, MatSnackBarModule, MatToolbarModule,  MatSelectModule
  ],


  declarations: [
    TrackCapsDirective, 
    AppComponent, 
    ChatbotComponent, 
    AdminDashboardComponent,
    AdminSidebarComponent,
    successPopup,
    cancelPopup,
    deletePopup,
    editServicePopup, 
    orderPopup, 
    addorEditHoliday, 
    projectListPopup, 
    myPopup, 
    submitPopup, 
    NavComponent, 
    LoginComponent, 
    MenuComponent, 
    PmdashboardComponent, 
    NewRequestComponent, 
    SearchPipe, 
    RequestListComponent, 
    AdminRequestListComponent, 
    PmordersummaryComponent, 
    PmrequestlistComponent, 
    TestComponent, 
    TesterSidebarComponent, 
    DevelopersidebarComponent, 
    DeveloperComponent, 
    testSuccessPopup, 
    AssuranceComponent, 
    ReservationSystemComponent, 
    CatalogueComponent, 
    ReservationDialogComponent, 
    InventoryComponent, 
    DesignerComponent, 
    DesignerSidebarComponent, 
    ServiceRequestComponent, 
    ServiceRequestListComponent, 
    ExtendPopupComponent, 
    LmsidebarComponent, 
    LmComponent, 
    ProjectsComponent,
    BillingComponent, 
    PmphysicalserviceComponent, 
    LabsComponent, 
    UsersComponent, 
    UtilizationReportsComponent, 
    AddLabsPopupComponent, 
    myAddPopup, 
    LmdashboardComponent, 
    CalendarComponent, 
    HolidaysComponent,
    ReserveServersComponent,
    ServersListComponent,
    MyReservationsComponent,
    ProcessMyReservationsComponent,
    LmReqProcessingComponent,
    ReserveSwitchComponent,
    CarouselComponent,
    HomeComponent,
    NavigationBarComponent,
    AssetsComponent,
    NewUsersComponent,
    IsDeleteModalPopupComponent,
    RequestModalPopupComponent,
    DeviceUsageChartComponent,
    DeviceOverviewComponent
  ],

  bootstrap: [AppComponent],

  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true }, 
    WebService,
     AuthService, { provide: MatSelect, useValue: {} }, 
     Authguard, 
     Dashguard, 
     DatePipe,
    { provide: MatDialogRef, useValue: {} }, 
    { provide: ChangeDetectorRef, useValue: {} },
    { provide: MAT_DIALOG_DATA, useValue: {} },
    ApiService
  ],
  entryComponents: [
    myPopup, 
    editServicePopup, 
    addorEditHoliday, 
    submitPopup, 
    orderPopup, 
    projectListPopup, 
    cancelPopup, 
    deletePopup, 
    successPopup, 
    testSuccessPopup, 
    ReservationDialogComponent, 
    ExtendPopupComponent,
    myAddPopup
  ]
})
export class AppModule { }
