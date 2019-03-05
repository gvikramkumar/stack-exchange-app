import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AppService } from './app.service';
import { Subject } from 'rxjs';
declare var jQuery:any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [ AppService ]
})
export class AppComponent implements OnInit {
  @ViewChild('answersModal') answersModal:ElementRef;
  title = 'app';
  public loadingPage: string = "";
  public stackData: any = [];
  public search_pattern: string;
  public cols:any =[];
  public answersList:any = [];
  public question: string = "";
  constructor(private appService: AppService){}

  ngOnInit(){
    this.loadingPage = "";
    this.answersList = [];
    this.question = "";
    this.getStackData();
  }


  getStackData(search_pattern = undefined){
    let url = "";
    search_pattern ? url = `https://api.stackexchange.com/2.2/search?order=desc&sort=activity&tagged=${search_pattern}&site=stackoverflow` : url = "https://api.stackexchange.com/2.2/questions?order=desc&sort=activity&site=stackoverflow";

    this.loadingPage = "im_loading";
    this.stackData = [];
    this.appService.pullStackData(url, "GET")
        .subscribe(
          response => {
            this.loadingPage = "";
            this.stackData = response.items;
          },
          error => {
            this.loadingPage = "";
            console.log("error while fetching stack data");
          },
          () => {
            console.log("call finish");
            this.loadingPage = "";            
          }
        )
  }
  getAnswers(answerId,question){
    if(!answerId){
      return;
    }
    this.answersList = [];
    this.question = question;
    this.loadingPage = "im_loading";
    let url = `https://api.stackexchange.com//2.2/answers/${answerId}?order=desc&sort=activity&site=stackoverflow`;
    this.appService.pullStackData(url, "GET")
    .subscribe(
      response => {
        this.loadingPage = "";
        this.answersList = response.items;
        jQuery("#answersModal").modal('show');
      },
      error => {
        this.loadingPage = "";
        console.log("error while fetching stack data");
      },
      () => {
        console.log("call finish");
        this.loadingPage = "";            
      }
    )

  }
}
