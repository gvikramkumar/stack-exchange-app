import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [ AppService ]
})
export class AppComponent implements OnInit {
  title = 'app';
  public loadingPage: string = "";
  public stackData: any = [];
  public dtOptions: DataTables.Settings = {};
  public dtTrigger: Subject<any> = new Subject();
  public dtData: StackData[] = [];
  constructor(private appService: AppService){}

  ngOnInit(){
    this.loadingPage = "";
    this.dtOptions = {
      searching: false,
      order: [[2, 'desc']],
      // paging: false,
      info: false,
      responsive: false,
      scrollX: false,
      dom: '<"top"i>rt<"#table-pagination"flp><"clear">'
      columnDefs: [{
        targets: [2,3,4],
        orderable: false
      }]
    };
    // this.stackData = [];
    this.getStackData();
  }
  // ngAfterViewInit(): void{
  //   this.dtTrigger.next();
  // }
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }


  getStackData(id = undefined){
    let url = "";
    id ? url = `https://api.stackexchange.com/2.2/answers{$id}?order=desc&sort=activity&site=stackoverflow` : url = "https://api.stackexchange.com/2.2/answers?order=desc&sort=activity&site=stackoverflow";
    this.loadingPage = "im_loading";
    this.stackData = [];
    this.appService.pullStackData(url, "GET")
        .subscribe(
          response => {
            this.dtData = response.items;
            this.dtTrigger.next();
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
