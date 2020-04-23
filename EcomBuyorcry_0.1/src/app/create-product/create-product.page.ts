import { Component, OnInit, Input } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.page.html',
  styleUrls: ['./create-product.page.scss'],
})
export class CreateProductPage implements OnInit {

  // Data passed in by componentProps
  @Input() adaccountid: string;

  constructor(navParams: NavParams,public modalController: ModalController) {
    // componentProps can also be accessed at construction time using NavParams
    console.log(navParams.get('adaccountid'));
  }

  ngOnInit() {
  }

  dismissModal() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({"productname":"led light"});
  }   

}
