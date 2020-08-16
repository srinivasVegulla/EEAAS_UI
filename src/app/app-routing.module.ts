import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MenuComponent } from './pmsidebar/menu.component';
import { AppComponent } from './app.component';
import { NavComponent } from './navigation/nav.component';
import { LoginComponent, TrackCapsDirective } from './login/login.component';

import { Authguard } from './services/authguard.service'
import { Dashguard } from './services/dashguard.service'

import { PmdashboardComponent } from './pmdashboard/pmdashboard.component';
//import { DropdownModule } from "ngx-dropdown";
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
import { CalendarComponent } from './calendar/calendar.component';
import { AssetsComponent } from './assets/assets.component';
import { NewUsersComponent } from './new-users/new-users.component';

var routes: Routes = [
  {
    path: '',
    // redirectTo: '/dashboard/reserve-servers',
    // redirectTo: '/dashboard/reservationSystem',
    pathMatch: 'full',
    component: LoginComponent
  },

  {
    path: 'login',
    component: LoginComponent,
    // canActivate: [Authguard]
  },
  {
    path: 'home',
    component: HomeComponent,
    children: [
      {
        path: 'dashboard',
        // component: MenuComponent,
        children: [
          { path: '', component: PmdashboardComponent },
          // { path: 'catalogue', component: DesignerComponent },
          { path: 'Myservices/NewRequest', component: NewRequestComponent },
          { path: 'Myservices/NewRequest/service', component: PmphysicalserviceComponent },
          { path: 'Myservices/RequestList', component: PmrequestlistComponent },
          { path: 'Myservices/RequestList', component: PmrequestlistComponent },
          { path: 'orderList', component: PmordersummaryComponent },
          { path: 'reservationSystem', component: ReservationSystemComponent },
          { path: 'inventory', component: CatalogueComponent },
          { path: 'catalogue', component: CatalogueComponent },
          { path: 'lab1', component: LabsComponent },
          { path: 'lab2', component: LabsComponent },
          { path: 'serverlist', component: ServersListComponent },
          //  { path: 'AdminRequestList', component: AdminRequestListComponent },
          {
            path: 'reserve-servers',
            component: ReserveServersComponent
          },
          {
            path: 'reserve-switch',
            component: ReserveSwitchComponent
          },
          {
            path: 'my-reservations',
            component: MyReservationsComponent
          },
          {
            path: 'process-my-reservations',
            component: ProcessMyReservationsComponent
          },
          {
            path: 'pm-req-cancel',
            component: LmReqProcessingComponent
          }
        ]
      }
    ]
  },
  {
    path: 'home',
    component: HomeComponent,
    children: [
      {
        path: 'AdminDashboard',
        // component: AdminSidebarComponent,
        canActivate: [Dashguard],
        children: [
          { path: '', component: AdminDashboardComponent },
          { path: 'users', component: NewUsersComponent },
          { path: 'devices', component: AssetsComponent },
          { path: 'orders', component: AdminRequestListComponent },
          { path: 'assurance', component: AssuranceComponent },
          { path: 'Billing', component: BillingComponent },
          { path: 'Utilization', component: UtilizationReportsComponent },
          { path: 'lab1', component: LabsComponent },
          { path: 'lab2', component: LabsComponent },
          { path: 'serviceRequest', component: ServiceRequestComponent },
          { path: 'services', component: PmphysicalserviceComponent },
          { path: 'catalogue', component: CatalogueComponent },
          { path: 'calendar', component: CalendarComponent },
          { path: 'holidays', component: HolidaysComponent },
          { path: 'lm-req-processing', component: LmReqProcessingComponent },
          {
            path: 'DesignerDashboard',
            canActivate: [Dashguard],
            children: [
              { path: '', component: DesignerComponent },
              { path: 'serviceRequest', component: ServiceRequestComponent },
              { path: 'serviceRequestList', component: ServiceRequestListComponent },
              { path: 'issues', component: AssuranceComponent },
            ]
          },
        ]
      }
    ]
  },
  {
    path: 'home',
    component: HomeComponent,
    children: [
      {
        path: 'lmdashboard',
        canActivate: [Dashguard],
        children: [
          { path: '', component: LmdashboardComponent },
          { path: 'Myservices/RequestList', component: PmrequestlistComponent },
          // { path: 'catalogue', component: DesignerComponent },
          { path: 'projects', component: ProjectsComponent },
          { path: 'serviceRequestList', component: ServiceRequestListComponent },
          { path: 'issues', component: AssuranceComponent },
          { path: 'Billing', component: BillingComponent },
          { path: 'orders', component: AdminRequestListComponent },
          { path: 'catalogue', component: CatalogueComponent },
          { path: 'lab1', component: LabsComponent },
          { path: 'lab2', component: LabsComponent },
          { path: 'Myservices/RequestList', component: PmrequestlistComponent },
          { path: 'services', component: PmphysicalserviceComponent },
          { path: 'lm-req-processing', component: LmReqProcessingComponent },
        ]
      }
    ]
  },

  /* {
    path: 'dashboard',
    component: MenuComponent,
    canActivate: [Dashguard],
    children: [
      { path: '', component: PmdashboardComponent },
      { path: 'Myservices/NewRequest', component: NewRequestComponent },
      { path: 'Myservices/NewRequest/service', component: PmphysicalserviceComponent },
      { path: 'Myservices/RequestList', component: PmrequestlistComponent },
      { path: 'orderList', component: PmordersummaryComponent },
      { path: 'reservationSystem', component: ReservationSystemComponent },
      { path: 'inventory', component: CatalogueComponent },
      { path: 'catalogue', component: CatalogueComponent },
      { path: 'lab1', component: LabsComponent },
      { path: 'lab2', component: LabsComponent },
      { path: 'serverlist', component: ServersListComponent },
      //  { path: 'AdminRequestList', component: AdminRequestListComponent },
      {
        path: 'reserve-servers',
        component: ReserveServersComponent
      },
      {
        path: 'reserve-switch',
        component: ReserveSwitchComponent
      },
      {
        path: 'my-reservations',
        component: MyReservationsComponent
      },
      {
        path: 'process-my-reservations',
        component: ProcessMyReservationsComponent
      },
      {
        path: 'pm-req-cancel',
        component: LmReqProcessingComponent
      }
    ]
  }, */

  /* {
    path: 'AdminDashboard',
    component: AdminSidebarComponent,
    canActivate: [Dashguard],
    children: [
      { path: '', component: AdminDashboardComponent },
      { path: 'users', component: UsersComponent },
      { path: 'orders', component: AdminRequestListComponent },
      { path: 'assurance', component: AssuranceComponent },
      { path: 'Billing', component: BillingComponent },
      { path: 'Utilization', component: UtilizationReportsComponent },
      { path: 'lab1', component: LabsComponent },
      { path: 'lab2', component: LabsComponent },
      { path: 'serviceRequest', component: ServiceRequestComponent },
      { path: 'services', component: PmphysicalserviceComponent },
      { path: 'catalogue', component: CatalogueComponent },
     // { path: 'calendar', component: CalendarComponent },
      { path: 'holidays', component: HolidaysComponent },
      { path: 'lm-req-processing', component: LmReqProcessingComponent },

    ]
  }, */

  {
    path: 'TesterDashboard',
    component: TesterSidebarComponent,
    canActivate: [Dashguard],
    children: [
      { path: '', component: TestComponent }
    ]
  },
  {
    path: 'Developer',
    component: DevelopersidebarComponent,
    canActivate: [Dashguard],
    children: [
      { path: '', component: DeveloperComponent }
    ]
  },

  /* {
    path: 'lmdashboard',
    component: LmsidebarComponent,
    canActivate: [Dashguard],
    children: [
      { path: '', component: LmdashboardComponent },
      { path: 'Myservices/RequestList', component: PmrequestlistComponent },
      { path: 'projects', component: ProjectsComponent },
      { path: 'serviceRequestList', component: ServiceRequestListComponent },
      { path: 'issues', component: AssuranceComponent },
      { path: 'Billing', component: BillingComponent },
      { path: 'orders', component: AdminRequestListComponent },
      { path: 'catalogue', component: CatalogueComponent },
      { path: 'lab1', component: LabsComponent },
      { path: 'lab2', component: LabsComponent },
      { path: 'Myservices/RequestList', component: PmrequestlistComponent },
      { path: 'services', component: PmphysicalserviceComponent },
      { path: 'lm-req-processing', component: LmReqProcessingComponent },
    ]
  } */
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
