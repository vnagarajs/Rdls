import { Component, OnInit } from '@angular/core';
import * as jQuery from 'jquery';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DyoService } from './dyo.service';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../environments/environment';
@Component({
  selector: 'app-dyo',
  templateUrl: './dyo.component.html',
  styleUrls: ['./dyo.component.scss']
})
export class DyoComponent implements OnInit {
BASE_URL_CDN = environment.DYO_BASE_MEDIA_URL;
MEDIA_URL_DYO = environment.BASE_MEDIA_URL;
myPersonalizedItemsObj = {};
currency = '$';
baseDetails;
baseitems = {
  baseImagepath: null,
  clipImagePath: null,
};
 getPositionsOffset = {
  offset: []
};
baseDetailsId = [{
  drop_down: 'No Of Stones',
  id: 'noOfStones',
  label: 'Gemstone Qty'
}, {
  drop_down: 'Metal Color',
  id: 'metalType',
  label: 'Metal Type'
}, {
  drop_down: 'Gemstone Type',
  id: 'stoneType',
  label: 'Metal Type'
}];
fromDataArray = { data: []};
myPersonalizedItems = [];
engtext =  null;
showModal: boolean;
currentEngElement =  null;
  constructor(
    public dyoService: DyoService,
    public modalService: NgbModal,
    private route: ActivatedRoute
   
  ) { }

//Bootstrap Modal Open event
show(event)
{
  this.showModal = true;
  this.currentEngElement = event.id;
  this.engtext = null;
  
}
//Bootstrap Modal Close event
hide()
{
  this.currentEngElement = null;
  this.showModal = false;
  this.engtext = null;

}
save() {
 if (this.engtext.trim() != '') {
 jQuery(`#${this.currentEngElement}`).text(this.engtext);
}
 this.showModal = false;
}
  ngOnInit(): void {
    const sku  = this.route.snapshot.params.sku;
    this.loadDataBySku(sku);
  }

  loadDataBySku(sku) {
    let self =  this;
    this.dyoService.getDesignYourProducts(sku).subscribe(async (data: any)  => {
      jQuery('#container2d').empty();
      if (data) {
          this.baseDetails = data;
         
          setTimeout(async function(){
            self.setMetalProperties(data);
           }, 2000);
      }
  });
  }
  getbaseDetailLabels(title) {
    const result = this.baseDetailsId.filter(item => item.drop_down === title);
    return result[0];
  }
  changeBaseDetailsDropDown(event, selfthis) {
    if (event.target.id === 'metalType') {
      const self = jQuery('#metalType').children(':selected');
      const image = jQuery(self).prop('image');
    } else if (event.target.id === 'noOfStones') {
          const sku =  jQuery('#noOfStones option:selected').data('sku');
          this.loadDataBySku(sku);
    }
  }

   change2dItems(self, event) {
    event.stopPropagation();
    const selfthis =  this;
    const shortName = jQuery(self).prop('shortName');
    const id = event.target.id;
    const selfId = jQuery('#' + id);
    const tryonImage = selfId.children('span').children('img').attr('src');
    jQuery('#container2d .tryonimage').each(function(index, element) {
        let layerId = jQuery(this).attr('id');
        layerId = jQuery('#overLay_' + layerId);

        if (layerId.hasClass('borderImg')) {
          jQuery('span').removeClass('borderImg');
          layerId.addClass('borderImg');
          jQuery(this).attr('src', tryonImage);
          jQuery(this).prop('productDetails', selfId.prop('productDetails'));
          jQuery(this).prop('productSku', selfId.data('productsku'));
          jQuery(this).prop('productPrice', selfId.prop('productPrice'));
          jQuery(this).prop('stoneType', selfId.prop('stoneType'));
          jQuery(this).prop('shortName', selfId.prop('shortName'));
          jQuery(this).prop('stoneName', selfId.prop('stoneName'));
          const imgId = jQuery(this).attr('id');
          const parentid = jQuery(self).parent().data('parentid');
          jQuery('#' + parentid + ' a .dyo-select-opt > label').text(selfId.prop('stoneName'));
          selfthis.retriveProducts(imgId);
        }
    });
    this.changeStoneActive();
    this.showPrice();
    // this.clearcompleteTab();
}
retriveProducts(id) {
  const index = jQuery('#' + id).data('index');
  const productDetails = jQuery('#' + id).prop('productDetails');
  const price = jQuery('#' + id).prop('productPrice');
  const stoneType = jQuery('#' + id).prop('stoneType');
  const shortName = jQuery('#' + id).prop('shortName');
  const stoneSku = jQuery('#' + id).prop('productSku');
  const stoneShape = jQuery('#overLay_' + id).data('shape');
  this.myPersonalizedItemsObj[index].id = id + '';
  this.myPersonalizedItemsObj[index].index = index;
  this.myPersonalizedItemsObj[index].price = price;
  this.myPersonalizedItemsObj[index].stoneType = stoneType;
  this.myPersonalizedItemsObj[index].shortName = shortName;
  this.myPersonalizedItemsObj[index].stoneSku = stoneSku;
  this.myPersonalizedItemsObj[index].stoneShape = stoneShape;
  this.myPersonalizedItems.push(index);
}
  async setMetalProperties(productInfo) {

   
    const self = this;
    const baseSKU = productInfo.sku;
    const basePrice = productInfo.price;
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < productInfo.options.length; i++) {
      const metalColor = productInfo.options[i].title.toLowerCase();
      const sku = productInfo.options[i].product_sku;
      const baseId = productInfo.options[i].id;
      if (metalColor === 'metal color') {
        for (let j = 0; j < productInfo.options[i].values.length; j++) {
            const title = productInfo.options[i].values[j].title;
            const metalPrice = productInfo.options[i].values[j].price;
            const changableSku = productInfo.options[i].values[j].sku;
            const res = title.split('_');
            const name = res[0];
            const iconImage = this.MEDIA_URL_DYO + sku + '/' + res[1] + '.jpg';
            const baseImage = this.MEDIA_URL_DYO + sku + '/' + res[2];
            const clipImage = this.MEDIA_URL_DYO + sku + '/' + res[3];
            const imagePath = this.MEDIA_URL_DYO + sku + '/' + iconImage;

            jQuery('#metalType_' + j).prop('image', iconImage);
            jQuery('#metalType_' + j).prop('baseimage', baseImage);
            jQuery('#metalType_' + j).prop('clipimage', clipImage);
            jQuery('#metalType_' + j).prop('title', name);
            jQuery('#metalType_' + j).prop('baseSku', baseSKU);
            jQuery('#metalType_' + j).prop('basePrice', basePrice);
            jQuery('#metalType_' + j).prop('metalName', name);
            jQuery('#metalType_' + j).prop('metalPrice', metalPrice);
            jQuery('#metalType_' + j).prop('changableSku', changableSku);

           
        }
    }

  }

    const  fromArray = { data: []};
    const getStoneCount = this.dyoService.getStoneTotalQty(productInfo);
    let getShapeList = [];
    getShapeList = [];
        // tslint:disable-next-line:no-shadowed-variable
    for (let i = 0; i < getStoneCount; i++) {
            const idxStone = i + 1;
            // tslint:disable-next-line:prefer-for-of
            for (let j = 0; j < productInfo.custom_attributes.length; j++) {
                const attribute_code = productInfo.custom_attributes[j].attribute_code;
                // tslint:disable-next-line:variable-name
                const attribute_value = productInfo.custom_attributes[j].label;
                if (attribute_code === 'stone' + idxStone + '_shape') {
                    getShapeList.push(attribute_value);
                }
            }
        }
    const uniqueStonesList = [...new Set(getShapeList)];
  //  const uniqueStonesList = getShapeList;
    for (let i = 0; i < uniqueStonesList.length; i++) {
      await this.dyoService.getStoneList(uniqueStonesList[i]).subscribe((result: any)  => {
        const storeData = {
          shape: uniqueStonesList[i],
          stoneList: result,
          stoneIndex: i
        };
        this.fromDataArray.data[i] = storeData;
      });

    }
    await this.display2dContainerData(productInfo, getStoneCount);

    setTimeout(function(){
      self.changeStoneActive();
      self.showPrice();

     }, 3000);


  }

display2dContainerData(productInfo, getStoneCount) {
    const self = this;
    let  pos = {
      x: 0,
      y: 0,
      w: 0,
      h: 0,
      shape: null
    };
    for (let i = 0; i < getStoneCount; i++) {
        pos = {
          x: 0,
          y: 0,
          w: 0,
          h: 0,
          shape: null
        };
       
        const idxStone = i + 1;
        for (let j = 0; j < productInfo.custom_attributes.length; j++) {
            const attribute_code = productInfo.custom_attributes[j].attribute_code;
            const attribute_value = productInfo.custom_attributes[j].value;
            if (attribute_code === 'default_stone' + idxStone + '_x') {
                pos.x = attribute_value;
            } else if (attribute_code === 'default_stone' + idxStone + '_y') {
                pos.y = attribute_value;
            } else if (attribute_code === 'default_stone' + idxStone + '_width') {
                pos.w = attribute_value;
            } else if (attribute_code === 'default_stone' + idxStone + '_height') {
                pos.h = attribute_value;
            } else if (attribute_code === 'stone_shape') {
                pos.shape = productInfo.custom_attributes[j].label;
            }
        }
        this.getPositionsOffset.offset[i] = pos;
    }

    if (jQuery('.priceBoxHint').length > 0) {
      jQuery('.priceBoxHint').remove();
    }
    let priceContent = '';
    priceContent += '<div class="priceBoxHint">';
    priceContent += '<span id="displayPriceHint"></span>';
    priceContent += '</div>';
   
    jQuery('.dyo-design-view').append(priceContent);
   // jQuery('.dyo-design-view').append('<button class="btn complete-btn btn-primary" onClick="viewDetails();">Complete</button>');
  

    const size = this.dyoService.getContainerBoxSize();
    jQuery('#container2d').css({
        left: 0,
        right: 0,
        margin: '0px auto',
        position: 'relative'
    });
    this.baseitems = {
      baseImagepath: null,
      clipImagePath: null,
    };
    for (let i = 0; i < productInfo.custom_attributes.length; i++) {
        const res = productInfo.custom_attributes[i];
        if (res.attribute_code === 'dyo_file_path') {
          this.baseitems.baseImagepath = this.BASE_URL_CDN + res.value;
        } else if (res.attribute_code === 'clip_image_path') {
          this.baseitems.clipImagePath = this.BASE_URL_CDN + res.value;
        }
    }
    this.changeBaseImage(jQuery('#metalType'));
   // const engraving = new engraiving();
   // engraving.appendId = '#container2d';
   // engraving.itemDetails = productInfo;
    const engDetails = this.dyoService.getEngarvingD(productInfo);
    // alert(engDetails);

   /* this.dyoService.getEngarving(productInfo).then((data) => {
        alert(data);
    }); */
   // const engDetails  = undefined;
    if (engDetails !== undefined) {
        for (let i = 0; i < engDetails.length; i++) {
            const details = engDetails[i];
            const factX = size.scale * 1.0;
            const factY = size.scale * 1.0;
            const X = (details.x * factX) - 0;
            const W = factX * details.width;
            const Y = (details.y * factY) - 0;
            const H = factY * details.height;
            const angle = details.angle;
            const engravable_text = details.engravable_text;
            jQuery('#container2d').append('<label id=eng_' + i + '>' + engravable_text + '</label>');
            jQuery('#eng_' + i ).click(function() {
              self.show(this);
            })
            jQuery('#eng_' + i).css({
                left: X + 'px',
                top: Y + 'px',
                width: W + 'px',
                height: H + 'px',
                position: 'absolute',
                'text-align': 'center',
                'white-space': 'nowrap',
                'text-overflow': 'ellipsis',
                overflow: 'hidden'
            });
            jQuery('#eng_' + i).css({
                '-webkit-transform': 'rotate(' + angle + 'deg)',
                '-moz-transform': 'rotate(' + angle + 'deg)',
                '-ms-transform': 'rotate(' + angle + 'deg)',
                '-o-transform': 'rotate(' + angle + 'deg)',
                transform: 'rotate(' + angle + 'deg)'
            });
            jQuery('#eng_' + i).prop('X', details.x);
            jQuery('#eng_' + i).prop('Y', details.y);
            jQuery('#eng_' + i).prop('W', details.width);
            jQuery('#eng_' + i).prop('H', details.height);
        }
    }
    if (productInfo.stone_sku !== undefined) {
        for (let i = 0; i < productInfo.stone_sku.length; i++) {
            const sku = productInfo.stone_sku[i];
            const stoneDetails = productInfo.items[sku];
            const imagePath = this.BASE_URL_CDN + stoneDetails.dyo_2d_file_path;
            const shape =  this.dyoService.getDefaultStoneShape(stoneDetails);

            const StoneIndex = i + 1;
            const tryonId = 'tryonimage_' + StoneIndex;
            let pos = this.getPositionsOffset.offset[i];
            pos = JSON.parse(JSON.stringify(pos));
            jQuery('#container2d').append('<img data-index=' + StoneIndex + ' class="tryonimage"  id=' + tryonId + ' src=' + imagePath + '>');
            let hideBorder = '';
            if (this.baseDetails.dyo_support_same_stone) {
                hideBorder = 'hideborder';
            }
            jQuery('#container2d').append('<span data-parentimgid=' + tryonId + ' style="z-index:9;" data-shape=' + shape + ' class="overLay_tryonimage ' + hideBorder + '" id=overLay_' + tryonId + ' ></span>');
            const factX = size.scale * 1.0;
            const factY = size.scale * 1.0;
            const X = (pos.x * factX) - 0;
            const W = factX * pos.w;
            const Y = (pos.y * factY) - 0;
            const H = factY * pos.h;
            jQuery('#overLay_' + tryonId).css({
                left: X + 'px',
                top: Y + 'px',
                width: W + 'px',
                height: H + 'px',
                position: 'absolute'
            });
            jQuery('#' + tryonId).css({
                left: X + 'px',
                top: Y + 'px',
                width: W + 'px',
                height: H + 'px',
                position: 'absolute'
            });
            jQuery('#' + tryonId).prop('X', pos.x);
            jQuery('#' + tryonId).prop('Y', pos.y);
            jQuery('#' + tryonId).prop('W', pos.w);
            jQuery('#' + tryonId).prop('H', pos.h);

            const stoneType = stoneDetails.dyo_stone_type;
            const shortName = stoneDetails.short_name;


            jQuery('#' + tryonId).prop('stoneName', stoneDetails.name);
            jQuery('#' + tryonId).prop('productDetails', stoneDetails);
            jQuery('#' + tryonId).prop('productSku', stoneDetails.sku);
            jQuery('#' + tryonId).prop('productPrice', stoneDetails.price);
            jQuery('#' + tryonId).prop('stoneType', stoneType);
            jQuery('#' + tryonId).prop('shortName', shortName);
            jQuery('#overLay_' + tryonId).click(function(e) {
                e.stopImmediatePropagation();
                e.preventDefault();
                jQuery('span').removeClass('borderImg');
                jQuery(this).addClass('borderImg');
                const so = jQuery(this).data('shape');
                const se = jQuery(this).prop('productSku');
                jQuery('.stoneSection').hide();
                jQuery('.stoneSection').each(function(index, element) {
                    const thisShape = jQuery(this).data('shape');

                    if (thisShape === so) {
                        jQuery(this).show();
                    }
                });
                self.changeStoneActive();
                self.showPrice();
            });
        }
    }
    if (this.baseitems.clipImagePath !== undefined) {
        if (jQuery('#baseClipImage').length === 0) {
            jQuery('#container2d').append('<img id="baseClipImage" class="baseimage" src="' + this.baseitems.clipImagePath + '">');
            jQuery('#baseClipImage').css({
                width: jQuery('#container2d').css('width'),
                height: jQuery('#container2d').css('height'),
                position: 'absolute',
                left: '0px',
                top: '0px'
            });
        }
    }
    if (jQuery('.tryonimage').length !== this.getSizeOfObject(self.myPersonalizedItemsObj)) {
        jQuery('.tryonimage').each(function(index, element) {
            const idx = index + 1;
            self.myPersonalizedItemsObj[idx] = {};
        });
    }
    jQuery('.tryonimage').each(function(index, element) {
        const idx = index + 1;
        const parentThis = this;
        const id = jQuery(this).attr('id');
        const layerId = jQuery('#overLay_' + id);
        const shape = layerId.data('shape');
        const objLength = self.getSizeOfObject(self.myPersonalizedItemsObj[idx]);

        if (objLength !== 0) {
            const shortName = self.myPersonalizedItemsObj[idx].shortName;
            const stoneShape = self.myPersonalizedItemsObj[idx].stoneShape;
            jQuery('.stoneSection').each(function(index, element) {
                const thisShape = jQuery(this).data('shape');
               // alert(`${thisShape} === ${stoneShape}`);
                if (thisShape === stoneShape) {
                    jQuery(this).find('.dyo-select-stones ul li').each(function(index, element) {
                        const listSname = jQuery(this).prop('shortName');
                        if (shortName === listSname) {
                            layerId.trigger('click');
                            jQuery(this).click();
                        }
                    });
                }
            });
        }
    });
    let tryonIdList = [];
    tryonIdList = [];
    const rootNode = document.getElementById('container2d');
    const node = rootNode.childNodes;
    for (let i = node.length - 1; i >= 0; i--) {
        const elem = node[i];
        const id = elem['id'];
        if (jQuery(`#${id}`).hasClass('tryonimage')) {
            tryonIdList.push(id);
        }
    }
    const defaultId = tryonIdList[tryonIdList.length - 1];
    jQuery('#overLay_' + defaultId).trigger('click');
    jQuery(window).resize(function() {
      self.resize();
    });
    jQuery('#container2d img').on('click', function(e) {
        jQuery('span').removeClass('borderImg');
        jQuery('.stoneSection').slideUp('fast');
    });
}

changeBaseImage(selfid) {
  const self = jQuery(selfid).children(':selected');
  if (jQuery('#baseImage').length === 0) {
      jQuery('#container2d').append('<img class="baseimage" id="baseImage"  src="' + this.baseitems.baseImagepath + '">');
      jQuery('#baseImage').css({
          width: jQuery('#container2d').css('width'),
          height: jQuery('#container2d').css('height')
      });
  } else {
      jQuery('#baseImage').attr('src', jQuery(self).prop('baseimage'));
  }
  jQuery('#baseImage').prop('selectableIndex', jQuery(self).index());
  jQuery('#baseImage').prop('baseSku', jQuery(self).prop('baseSku'));
  jQuery('#baseImage').prop('basePrice', jQuery(self).prop('basePrice'));
  jQuery('#baseImage').prop('metalName', jQuery(self).prop('metalName'));
  jQuery('#baseImage').prop('metalPrice', jQuery(self).prop('metalPrice'));
  if (jQuery('#baseClipImage').length !== 0) {
      jQuery('#baseClipImage').attr('src', jQuery(self).prop('clipimage'));
  }
  this.changeSlectedRounder();
  this.showPrice();
}
getSizeOfObject(obj) {
  let size = 0;
  let key;
  for (key in obj) {
      if (obj.hasOwnProperty(key)) { size++; }
  }
  return size;
}
changeStoneActive() {
  jQuery('#container2d .tryonimage').each(function(index, element) {
      let layerId = jQuery(this).attr('id');
      layerId = jQuery('#overLay_' + layerId);
      if (layerId.hasClass('borderImg')) {
          const activeLayer = jQuery(this).prop('productSku');
          const activeLayerShape = layerId.data('shape');
          jQuery('.stoneSection').each(function(index, element) {
              const sectionShape = jQuery(this).data('shape');
              if (sectionShape === activeLayerShape) {
                  jQuery(this).find('.dyo-select-stones ul li span img').removeClass('stoneActive');
                  jQuery(this).find('.dyo-select-stones ul li').each(function(index, element) {
                      const listSku = jQuery(this).data('productsku');
                      console.log(`${activeLayer}  === ${listSku}`);
                      if (activeLayer === listSku) {
                          jQuery(this).find('span img').addClass('stoneActive');
                          const parentid = jQuery(this).parent().data('parentid');
                          jQuery('#' + parentid + ' a .dyo-select-opt > label').text(jQuery(this).prop('stoneName'));
                      }
                  });
              }
          });
      }

  });
}


 showPrice() {
  let price = 0;
  price = 0;
  jQuery('#container2d .tryonimage').each(function(index, element) {
      const productPrice = jQuery(this).prop('productPrice');
      price += parseFloat(productPrice);
     // alert(price);
  });
  const basePrice = jQuery('#baseImage').prop('basePrice');
  const metalPrice = jQuery('#baseImage').prop('metalPrice');
  if (metalPrice != null) {
    
      price += parseFloat(metalPrice);
  }

  //alert(basePrice);
  price += parseFloat(basePrice);
  //alert(price);
  let displayPrice: any = price;
  displayPrice = displayPrice.toFixed(2);
  //alert(displayPrice);
  jQuery('#displayPriceHint').text(this.currency + displayPrice);
}

changeSlectedRounder() {
  jQuery('#container2d .tryonimage').each(function(index, element) {
      const hasBorder = jQuery(this).hasClass('tryonimage');
      if (hasBorder) {
          const overLayId = jQuery(this).attr('id');
          const sku = jQuery('#' + overLayId).prop('productSku');
          let dataindex = jQuery('#' + overLayId).data('index');
          dataindex = dataindex - 1;
          jQuery('.stoneSection:eq(' + dataindex + ') ul li img').removeClass('stoneActive');
          jQuery('.stoneSection:eq(' + dataindex + ') ul li ').each(function(index, element) {
              const self = this;
              const id = jQuery(self).attr('id');
              const selfId = jQuery('#' + id);
              if (selfId.prop('productSku') === sku) {
                  jQuery(this).find('span img').addClass('stoneActive');
              }
          });
      }
  });
}

resize() {

  const size = this.dyoService.getContainerBoxSize();
  jQuery('#container2d img').each(function(index, element) {
      const width = jQuery('#container2d').width();
      const height = jQuery('#container2d').height();
      const isBaseImage = jQuery(this).hasClass('baseimage');
      const isBaseClipImage = jQuery(this).hasClass('baseClipImage');
      if (isBaseImage) {
          jQuery(this).css({
              width: width + 'px',
              height: height + 'px',
          });
      } else if (isBaseClipImage) {
          jQuery(this).css({
              width: width + 'px',
              height: height + 'px',
          });
      } else {
          const orgWidth = 768.00;
          const orgHeigth = 785.00;
          const widthRatio = (width) / (orgWidth);
          const heightRatio = (height) / (orgHeigth);
          const scale = Math.min(widthRatio, heightRatio);
          const selfWidth = jQuery(this).prop('W');
          const selfHeight = jQuery(this).prop('H');
          const selfLeft = jQuery(this).prop('X');
          const selfTop = jQuery(this).prop('Y');
          const factX = size.scale * 1.0;
          const factY = size.scale * 1.0;
          const X = (selfLeft * factX);
          const W = factX * selfWidth;
          const Y = (selfTop * factY);
          const H = factY * selfHeight;
          const getOverLayId = jQuery(this).attr('id');
          jQuery(this).css({
              left: X + 'px',
              top: Y + 'px',
              width: W + 'px',
              height: H + 'px'
          });
          jQuery('#overLay_' + getOverLayId).css({
              left: X + 'px',
              top: Y + 'px',
              width: W + 'px',
              height: H + 'px'
          });
      }
  });
  jQuery('#container2d label').each(function(index, element) {
      const width = jQuery('#container2d').width();
      const height = jQuery('#container2d').height();
      const orgWidth = 768.00;
      const orgHeigth = 785.00;
      const widthRatio = (width) / (orgWidth);
      const heightRatio = (height) / (orgHeigth);
      const scale = Math.min(widthRatio, heightRatio);
      const selfWidth = jQuery(this).prop('W');
      const selfHeight = jQuery(this).prop('H');
      const selfLeft = jQuery(this).prop('X');
      const selfTop = jQuery(this).prop('Y');
      const factX = size.scale * 1.0;
      const factY = size.scale * 1.0;
      const X = (selfLeft * factX);
      const W = factX * selfWidth;
      const Y = (selfTop * factY);
      const H = factY * selfHeight;
      jQuery(this).css({
          left: X + 'px',
          top: Y + 'px',
          width: W + 'px',
          height: H + 'px',
      });
  });
}



}
