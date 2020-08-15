import { Component, OnInit, OnDestroy, ViewChild, TemplateRef, Input,
Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Product } from "../../../classes/product";

@Component({
  selector: 'special-financing',
  templateUrl: './special-financing.html',
  styleUrls: ['./special-financing.scss']
})
export class SpecialFinancingComponent implements OnInit, OnDestroy  {
  
  @Input() product: Product;

  @ViewChild("specialFinancing", { static: false }) SpecialFinancing: TemplateRef<any>;

  public closeResult: string;
  public modalOpen: boolean = false;

  constructor(@Inject(PLATFORM_ID) private platformId: Object,
    private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  openModal() {
    this.modalOpen = true;
    if (isPlatformBrowser(this.platformId)) { // For SSR 
      this.modalService.open(this.SpecialFinancing, { 
        size: 'md',
        ariaLabelledBy: 'special-financing',
        centered: true,
        windowClass: 'SpecialFinancing' 
      }).result.then((result) => {
        `Result ${result}`
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    }
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  ngOnDestroy() {
    if(this.modalOpen){
      this.modalService.dismissAll();
    }
  }

}
