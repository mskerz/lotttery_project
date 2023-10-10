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
    {path: 'lottery', component:LotteryComponent},
    {path: 'login', component:LoginComponent,data:{title: 'Login'}},
    {path: 'register', component:RegisterComponent},
    {path:'admin/dashboard', component:DashboardComponent,title: 'Admin Dashboard'},
    {path:'admin/lottery',component:LotteryComponent},
    {path:'admin/lottery/manage',component:LotteryManageComponent},
     {path:'member/lottery',component:LotteryComponent},
     {path:'member/lottery/history/:user_id',component:HistoryOrderComponent}
    
  ]},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
