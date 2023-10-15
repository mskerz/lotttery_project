import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './page/main/main.component';
import { LoginComponent } from './page/login/login.component';
import { AppComponent } from './app.component';
import { LotteryComponent } from './page/lottery/lottery.component';
import { RegisterComponent } from './page/register/register.component';
 import { HomeComponent } from './page/home/home.component';
import { LotteryManageComponent } from './page/lottery-manage/lottery-manage.component';
import { DashboardComponent } from './page/dashboard/dashboard.component';
import { HistoryOrderComponent } from './member/history-order/history-order.component';

const routes: Routes = [
 
  {path: '', component:MainComponent,children:[
    {path:'',component: HomeComponent},
    {path: 'lottery', component:LotteryComponent,title:'ค้นหาสลาก'},
    {path: 'login', component:LoginComponent,title: 'เข้าสู่ระบบ'},
    {path: 'register', component:RegisterComponent,title:'สมัครสมาชิก'},
    {path:'admin/dashboard', component:DashboardComponent,title: 'รายงานการซื้อ'},
    {path:'admin/lottery',component:LotteryComponent,title:'ค้นหาสลาก'},
    {path:'admin/lottery/manage',component:LotteryManageComponent,title:'จัดการสลาก'},
     {path:'member/lottery',component:LotteryComponent,title:'ค้นหาสลาก'},
     {path:'member/lottery/history/:user_id',component:HistoryOrderComponent,title:'ประวัติการซื้อย้อนหลัง'}
    
  ]},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
