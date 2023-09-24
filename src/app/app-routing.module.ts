import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './page/main/main.component';
import { LoginComponent } from './page/login/login.component';
import { AppComponent } from './app.component';
import { LotteryComponent } from './page/lottery/lottery.component';
import { RegisterComponent } from './page/register/register.component';

const routes: Routes = [
  {path: '', component:MainComponent,children:[
    {path: 'lottery', component:LotteryComponent},
    {path: 'login', component:LoginComponent},
    {path: 'register', component:RegisterComponent}
  ]},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
