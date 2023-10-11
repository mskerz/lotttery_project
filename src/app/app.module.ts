import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import {HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './page/login/login.component';
import { RegisterComponent } from './page/register/register.component';
import { AdminComponent } from './page/admin/admin.component';
 import { MainComponent } from './page/main/main.component';
import { HeaderComponent } from './component/header/header.component';
import { FooterComponent } from './component/footer/footer.component';

//Module of Material Angular
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormControl,FormGroupDirective,NgForm,Validators,FormsModule,ReactiveFormsModule,} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { LotteryComponent } from './page/lottery/lottery.component';
import { NgIf } from '@angular/common';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatProgressSpinnerModule as MatSpinnerModule} from '@angular/material/progress-spinner';
import {MatMenuModule} from '@angular/material/menu';
import { CartComponent } from './dialog/cart/cart.component';
import {MatDialogModule} from '@angular/material/dialog';
import { BadgeModule } from 'primeng/badge';
import { TableModule } from 'primeng/table';
import { ProfileComponent } from './page/profile/profile.component';
import { HomeComponent } from './page/home/home.component';
import { LotteryManageComponent } from './page/lottery-manage/lottery-manage.component';
import {MatTableModule} from '@angular/material/table';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import {  MatSnackBarModule } from '@angular/material/snack-bar';
import { InsertLotteryComponent } from './dialog/insert-lottery/insert-lottery.component';
import { HistoryPurchaseComponent } from './page/history-purchase/history-purchase.component';
import { EditLotteryComponent } from './dialog/edit-lottery/edit-lottery.component';
import { DashboardComponent } from './page/dashboard/dashboard.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import { SidebarModule } from 'primeng/sidebar';
import { HistoryOrderComponent } from './member/history-order/history-order.component';
import { ButtonModule } from 'primeng/button';
import { CardComponent } from './component/card/card.component';
import { CalendarModule } from 'primeng/calendar';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    AdminComponent,
    MainComponent,
    HeaderComponent,
    FooterComponent,
    LotteryComponent,
    CartComponent,
    ProfileComponent,
    HomeComponent,
    LotteryManageComponent,
    InsertLotteryComponent,
    HistoryPurchaseComponent,
    EditLotteryComponent,
    DashboardComponent,
    HistoryOrderComponent,
    CardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule, 
    NgIf,
    // Material Angular Module
    MatButtonModule,
    MatCardModule,
    MatGridListModule,
    MatInputModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    MessagesModule,
    MessageModule,
    ToastModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSpinnerModule,
    MatMenuModule,
    MatDialogModule,
    BadgeModule,
    TableModule,
    MatTableModule,
    DropdownModule,
    InputTextModule,
    MatSnackBarModule,
    MatSidenavModule,MatToolbarModule,SidebarModule,ButtonModule,CalendarModule
   ],
  providers: [Title],
  bootstrap: [AppComponent]
})
export class AppModule { }
