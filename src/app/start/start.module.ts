import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
//
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { FormsModule } from "@angular/forms";
import { NouisliderModule } from "ng2-nouislider";
import { JwBootstrapSwitchNg2Module } from "jw-bootstrap-switch-ng2";
//
import { StartComponent } from "./start.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { HomeComponent } from "./homescreen/homescreen.component";
import { DashboardStudentComponent } from "./dashboard/dashboard-student/dashboard-student.component";
import { DashboardTeacherComponent } from "./dashboard/dashboard-teacher/dashboard-teacher.component";
import { DashboardAdminComponent } from "./dashboard/dashboard-admin/dashboard-admin.component";
import { RouterModule } from "@angular/router";
import { CourseModule } from "../course/course.module";
import { SharedModule } from "../shared/shared.module";
import { NotificationModule } from "../notification/notification.module";
import { InfoBoxComponent } from "./homescreen/info-box/info-box.component";
import { BasicelementsComponent } from "./components/basicelements/basicelements.component";
import { NavigationComponent } from "./components/navigation/navigation.component";
import { TypographyComponent } from "./components/typography/typography.component";
import { NucleoiconsComponent } from "./components/nucleoicons/nucleoicons.component";
import { NotificationComponent } from "./components/notification/notification.component";
import { NgbdModalBasic } from "./components/modal/modal.component";
import { NavbarComponent } from "./components/navbar/navbar.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    RouterModule,
    CourseModule,
    NgbModule,
    NouisliderModule,
    RouterModule,
    JwBootstrapSwitchNg2Module,
  ],
  declarations: [
    StartComponent,
    DashboardComponent,
    HomeComponent,
    DashboardStudentComponent,
    DashboardTeacherComponent,
    DashboardAdminComponent,
    InfoBoxComponent,
    BasicelementsComponent,
    NavigationComponent,
    TypographyComponent,
    NucleoiconsComponent,
    NotificationComponent,
    NgbdModalBasic,
    NavbarComponent,
  ],
  exports: [
    StartComponent,
    DashboardComponent,
    HomeComponent,
    DashboardStudentComponent,
    DashboardTeacherComponent,
    DashboardAdminComponent,
    BasicelementsComponent,
    NavigationComponent,
    TypographyComponent,
    NucleoiconsComponent,
    NotificationComponent,
    NgbdModalBasic,
    NavbarComponent,
  ],
})
export class StartModule {}
