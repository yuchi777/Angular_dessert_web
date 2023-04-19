import { Component } from '@angular/core';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { DataService } from '../../data.service';

@Component({
  selector: 'app-home-component',
  templateUrl: './home-component.component.html',
  styleUrls: ['./home-component.component.css']
})
export class HomeComponentComponent {

  faHeart = faHeart;
  dataFeatured: any;
  dataRecommend: any;
  dataNewArrival: any;

  // DI注入
  constructor(public datasvc: DataService) {
  }



  ngOnInit() {

    // this.datasvc.getData().subscribe((result) => {
    //   console.log('http_re_objectKey', Object.keys(result));
    //   console.log('http_re_values', Object.values(result)[2]);
    //   console.log('http_re_typeof', typeof(result));
    //   console.log('http_re', result);

    // })

    this.datasvc.getProductsByTypeId(1).subscribe((data)=>{
      console.log('getApiData',data.data);
      this.dataFeatured = data.data;
    })
    this.datasvc.getProductsByTypeId(2).subscribe((data)=>{
      this.dataRecommend = data.data;
    })
    this.datasvc.getProductsByTypeId(3).subscribe((data)=>{
      this.dataNewArrival = data.data;
    })




  }

  addcart($event: MouseEvent) {
    console.log('add cart', $event.target);
    // console.log('add cart',$event.target.id);
  }


}
