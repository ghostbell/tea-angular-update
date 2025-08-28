import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from "rxjs";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {
  private observable: Observable<boolean>;
  private subscriptionOrder: Subscription | null = null;

  showPopup: boolean = false;

  slideConfig = {
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: true,
    infinite: true,
    arrows: true
  };

  accordionItems = [
    { title: 'Собираете ли вы подарочные боксы?', content: 'Да, у нас есть такая услуга. Мы можем собрать подарочный бокс на любой вкус, объем и стоимость!', open: false },
    { title: 'Сколько у вас разновидностей чая?', content: 'Да, у нас есть такая услуга. Мы можем собрать подарочный бокс на любой вкус, объем и стоимость!', open: false },
    { title: 'В какой срок осуществляется доставка?', content: 'Да, у нас есть такая услуга. Мы можем собрать подарочный бокс на любой вкус, объем и стоимость!', open: false },
    { title: 'У вас обновляется ассортимент?', content: 'Да, у нас есть такая услуга. Мы можем собрать подарочный бокс на любой вкус, объем и стоимость!', open: false },
    { title: 'Какого объема у вас пачки чая?', content: 'Да, у нас есть такая услуга. Мы можем собрать подарочный бокс на любой вкус, объем и стоимость!', open: false },
  ];

  toggle(index: number) {
    this.accordionItems.forEach((item, i) => item.open = i === index ? !item.open : false);
  }

  constructor() {
    this.observable = new Observable((observer) => {
      setTimeout(() => {
        observer.next(true);
      }, 10000)
    })
  }

  ngOnInit(): void {
    this.subscriptionOrder = this.observable.subscribe((param: boolean) => {
      this.showPopup = param;
    });
  }

  ngOnDestroy(): void {
    this.subscriptionOrder?.unsubscribe();
  }
}
