import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Convert as lottery_covert,Lottery } from 'src/app/model/lottery.model';
import { LotteryService } from 'src/app/service/lottery.service';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  providers:[MessageService]
})
export class MainComponent   {
   
 
}

