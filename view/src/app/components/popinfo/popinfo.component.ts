import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-popinfo',
  templateUrl: './popinfo.component.html',
  styleUrls: ['./popinfo.component.scss'],
})
export class PopinfoComponent implements OnInit {
  items: Array<number>  = Array(40);
  constructor(private popoverCtrl: PopoverController) { }

  ngOnInit() {}
  
  onClick(e:number){
    console.log(e);
    this.popoverCtrl.dismiss({
      item: e
    });

  } 
}
