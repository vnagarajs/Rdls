import { Injectable, HostListener } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

// Menu
export interface Menu {
	path?: string;
	title?: string;
	type?: string;
	megaMenu?: boolean;
	image?: string;
	active?: boolean;
	badge?: boolean;
	badgeText?: string;
	children?: Menu[];
}

@Injectable({
	providedIn: 'root'
})

export class NavService {

	constructor() { }

	public screenWidth: any;
	public leftMenuToggle: boolean = false;
	public mainMenuToggle: boolean = false;

	// Windows width
	@HostListener('window:resize', ['$event'])
	onResize(event?) {
		this.screenWidth = window.innerWidth;
	}

	MENUITEMS: Menu[] = [
		{
			title: 'BRIDAL', type: 'sub', megaMenu: true, active: false, children: [
				{
					title: 'CATEGORY', type: 'sub', active: false, children: [
						{ path: '/pages/portfolio/grid/two', title: 'Anniversary Rings', type: 'link' },
						{ path: '/pages/portfolio/grid/three', title: 'Diamond Mountings', type: 'link' },
						{ path: '/pages/portfolio/grid/four', title: 'Engagement Rings', type: 'link' },
						{ path: '/pages/portfolio/masonry/grid/two', title: 'Luxury', type: 'link' },
						{ path: '/pages/portfolio/masonry/grid/three', title: 'Mens Rings', type: 'link' },
						{ path: '/pages/portfolio/masonry/grid/four', title: 'Promise Rings', type: 'link' },
						{ path: '/pages/portfolio/masonry/full-width', title: 'Wedding Sets', type: 'link' }
					]
				},
				{
					title: 'DESIGNER', type: 'sub', active: false, children: [
						{ path: '/home/vegetable', title: 'ArtCarved Collections', type: 'link' },
						{ path: '/home/watch', title: 'Barkevs', type: 'link' },
						{ path: '/home/furniture', title: 'Benchmark', type: 'link' },
						{ path: '/home/flower', title: 'Triton', type: 'link' },
						{ path: '/home/fashion', title: 'Valina', type: 'link' }
					]
				},
				{
					title: 'Riddles Brand', type: 'sub', active: false, children: [
						{ path: '/elements/theme/title', title: '2Beloved', type: 'link' },
						{ path: '/elements/theme/collection-banner', title: 'Amaura Collection', type: 'link' },
						{ path: '/elements/theme/home-slider', title: 'Brite Buys', type: 'link' },
						{ path: '/elements/theme/category', title: 'Love In Color', type: 'link' },
						{ path: '/elements/theme/services', title: 'Noventa', type: 'link' }
					]
				},
				{
					title: 'DESIGN YOUR OWN', type: 'sub', active: false, children: [
						{ path: '/elements/product/slider', title: 'Ring Builder', type: 'link' },
						{ path: '/elements/product/banners', title: 'Stud Builder', type: 'link' },
						{ path: '/elements/product/tabs', title: 'Pendant Builder', type: 'link' },
						{ path: '/elements/product/multi-slider', title: 'Brilliantly Yours', type: 'link' }
					]
				},
			]
		},
		{
			title: 'DESIGN YOUR OWN', type: 'sub', active: false, children: [
				{ path: '/shop/design-your-own/ST20560', title: 'Family Jewelry', type: 'link' },
				{ path: '/shop/collection/right/sidebar', title: 'Ring Builder', type: 'link' },
				{ path: '/shop/collection/no/sidebar', title: 'Loose Diamonds', type: 'link' },
				{ path: '/shop/collection/no/sidebar', title: 'Stud Earrings Builder', type: 'link' },
				{ path: '/shop/collection/no/sidebar', title: 'Pendant Builder', type: 'link' },
				{ path: '/shop/collection/no/sidebar', title: 'Brilliantly Yours', type: 'link' }
			]
		},
		{
			title: 'COLLECTIONS', type: 'sub', megaMenu: true, active: false, children: [
				{
					title: 'RIDDLES BRANDS', type: 'sub', active: false, children: [
						{ path: '/pages/portfolio/grid/two', title: '2Beloved', type: 'link' },
						{ path: '/pages/portfolio/grid/three', title: 'Amaura', type: 'link' },
						{ path: '/pages/portfolio/grid/four', title: 'Black Hills Gold', type: 'link' },
						{ path: '/pages/portfolio/masonry/grid/two', title: 'Brite Buys', type: 'link' },
						{ path: '/pages/portfolio/masonry/grid/three', title: 'Designed With Love', type: 'link' },
						{ path: '/pages/portfolio/masonry/grid/four', title: 'Fairytale Diamonds', type: 'link' },
						{ path: '/pages/portfolio/masonry/full-width', title: 'Noventa', type: 'link' }
					]
				},
				{
					title: 'DESIGNER', type: 'sub', active: false, children: [
						{ path: '/home/vegetable', title: 'ArtCarved Bridal', type: 'link' },
						{ path: '/home/watch', title: 'Barkevs', type: 'link' },
						{ path: '/home/furniture', title: 'Benchmark', type: 'link' },
						{ path: '/home/flower', title: 'Triton', type: 'link' },
						{ path: '/home/fashion', title: 'Verragio', type: 'link' }
					]
				},
				{
					title: 'JEWELRY COLLECTIONS', type: 'sub', active: false, children: [
						{ path: '/elements/product/slider', title: 'Birth Stones', type: 'link' },
						{ path: '/elements/product/banners', title: 'Bolo Bracelets', type: 'link' },
						{ path: '/elements/product/tabs', title: 'Diamond Bezels', type: 'link' },
						{ path: '/elements/product/multi-slider', title: 'Family Jewelry', type: 'link' },
						{ path: '/elements/product/multi-slider', title: 'Luxury', type: 'link' },
						{ path: '/elements/product/multi-slider', title: 'Three Stone', type: 'link' },
						{ path: '/elements/product/multi-slider', title: 'Made In America', type: 'link' }
				    ]
				},
				
					]
				},
		{
			title: 'GIFTS', type: 'sub', megaMenu: true, active: false, children: [
				{
					title: 'GIFT IDEAS', type: 'sub', active: false, children: [
						{ path: '/pages/portfolio/grid/two', title: 'Gift For Her', type: 'link' },
						{ path: '/pages/portfolio/grid/three', title: 'Gift For Him', type: 'link' },
						{ path: '/pages/portfolio/grid/four', title: 'Bridal Gifts', type: 'link' },
						{ path: '/pages/portfolio/masonry/grid/two', title: 'Family Jewelry', type: 'link' },
						{ path: '/pages/portfolio/masonry/grid/three', title: 'Gifts Under $200', type: 'link' },
						{ path: '/pages/portfolio/masonry/grid/four', title: 'Gifts Under $500', type: 'link' },
						{ path: '/pages/portfolio/masonry/full-width', title: 'Gifts Under $1000', type: 'link' }
					]
				},
				{
					title: 'OCCASIONS', type: 'sub', active: false, children: [
						{ path: '/home/vegetable', title: 'Fathers Gifts', type: 'link' },
						{ path: '/home/watch', title: 'Mothers Gifts', type: 'link' },
						{ path: '/home/furniture', title: 'Birthday Gifts', type: 'link'}
					]
				},
				{
					title: 'ACCESSORIES', type: 'sub', active: false, children: [
						{ path: '/elements/theme/title', title: 'Keychains', type: 'link' },
						{ path: '/elements/theme/collection-banner', title: 'Money Clips', type: 'link' },
						{ path: '/elements/theme/home-slider', title: 'Tie Accessories', type: 'link' }
					]
				},
				{
					title: 'NEW ARRIVALS', type: 'sub', active: false, children: [
						{ path: '/elements/product/slider', title: 'Bezels', type: 'link' },
						{ path: '/elements/product/banners', title: 'Bolos', type: 'link' },
						{ path: '/elements/product/tabs', title: 'Perfect Matches Stackables', type: 'link' }
					]
				},
			]
		},
		{
			title: 'RINGS', type: 'sub', megaMenu: true, active: false, children: [
				{
					title: 'CATEGORY', type: 'sub', active: false, children: [
						{ path: '/pages/portfolio/grid/two', title: 'Anniversary', type: 'link' },
						{ path: '/pages/portfolio/grid/three', title: 'Diamond', type: 'link' },
						{ path: '/pages/portfolio/grid/four', title: 'Gold', type: 'link' },
						{ path: '/pages/portfolio/masonry/grid/two', title: 'Luxury', type: 'link' },
						{ path: '/pages/portfolio/masonry/grid/three', title: 'Mens', type: 'link' },
						{ path: '/pages/portfolio/masonry/grid/four', title: 'Silver', type: 'link' },
						{ path: '/pages/portfolio/masonry/full-width', title: 'Vintage', type: 'link' }
					]
				},
				{
					title: 'DESIGNER', type: 'sub', active: false, children: [
						{ path: '/home/vegetable', title: 'Canadian Rocks', type: 'link' },
						{ path: '/home/watch', title: 'Enchanted Disney', type: 'link' },
						{ path: '/home/furniture', title: 'Verragio', type: 'link' }
					]
				},
				{
					title: 'GEMSTONES', type: 'sub', active: false, children: [
						{ path: '/elements/product/slider', title: 'Amethyst', type: 'link' },
						{ path: '/elements/product/banners', title: 'Aquamarine', type: 'link' },
						{ path: '/elements/product/tabs', title: 'Emerald', type: 'link' },
						{ path: '/elements/product/multi-slider', title: 'Garnet', type: 'link' },
						{ path: '/elements/product/multi-slider', title: 'Morganite', type: 'link' },
						{ path: '/elements/product/multi-slider', title: 'Opal', type: 'link' },
						{ path: '/elements/product/multi-slider', title: 'Pearl', type: 'link' }
				    ]
				},
				{
					title: 'RIDDLES BRANDS', type: 'sub', active: false, children: [
						{ path: '/elements/theme/title', title: '2Beloved', type: 'link' },
						{ path: '/elements/theme/collection-banner', title: 'Canadian Rocks', type: 'link' },
						{ path: '/elements/theme/home-slider', title: 'Noventa', type: 'link' },
						{ path: '/elements/theme/category', title: 'Climbers And Crawlers', type: 'link' }
					]
				},
			]
		},
		{
			title: 'NECKLACE', type: 'sub', megaMenu: true, active: false, children: [
				{
					title: 'CATEGORY', type: 'sub', active: false, children: [
						{ path: '/pages/portfolio/grid/two', title: 'Anniversary', type: 'link' },
						{ path: '/pages/portfolio/grid/three', title: 'Diamond', type: 'link' },
						{ path: '/pages/portfolio/grid/four', title: 'Gold', type: 'link' },
						{ path: '/pages/portfolio/masonry/grid/two', title: 'Luxury', type: 'link' },
						{ path: '/pages/portfolio/masonry/grid/three', title: 'Mens', type: 'link' },
						{ path: '/pages/portfolio/masonry/grid/four', title: 'Silver', type: 'link' },
						{ path: '/pages/portfolio/masonry/full-width', title: 'Vintage', type: 'link' }
					]
				},
				{
					title: 'DESIGNER', type: 'sub', active: false, children: [
						{ path: '/home/vegetable', title: 'Canadian Rocks', type: 'link' },
						{ path: '/home/watch', title: 'Enchanted Disney', type: 'link' },
						{ path: '/home/furniture', title: 'Verragio', type: 'link' }
					]
				},
				{
					title: 'GEMSTONES', type: 'sub', active: false, children: [
						{ path: '/elements/product/slider', title: 'Amethyst', type: 'link' },
						{ path: '/elements/product/banners', title: 'Aquamarine', type: 'link' },
						{ path: '/elements/product/tabs', title: 'Emerald', type: 'link' },
						{ path: '/elements/product/multi-slider', title: 'Garnet', type: 'link' },
						{ path: '/elements/product/multi-slider', title: 'Morganite', type: 'link' },
						{ path: '/elements/product/multi-slider', title: 'Opal', type: 'link' },
						{ path: '/elements/product/multi-slider', title: 'Pearl', type: 'link' }
				    ]
				},
				{
					title: 'RIDDLES BRANDS', type: 'sub', active: false, children: [
						{ path: '/elements/theme/title', title: '2Beloved', type: 'link' },
						{ path: '/elements/theme/collection-banner', title: 'Black Hills Gold', type: 'link' },
						{ path: '/elements/theme/home-slider', title: 'Noventa', type: 'link' },
						{ path: '/elements/theme/category', title: 'Twinkling Diamons', type: 'link' }
					]
				},
			]
		},
		{
			title: 'EARRINGS', type: 'sub', megaMenu: true, active: false, children: [
				{
					title: 'CATEGORY', type: 'sub', active: false, children: [
						{ path: '/pages/portfolio/grid/three', title: 'Diamond', type: 'link' },
						{ path: '/pages/portfolio/grid/four', title: 'Gold', type: 'link' },
						{ path: '/pages/portfolio/masonry/grid/two', title: 'Luxury', type: 'link' },
						{ path: '/pages/portfolio/masonry/grid/three', title: 'Mens', type: 'link' },
						{ path: '/pages/portfolio/masonry/grid/four', title: 'Silver', type: 'link' },
						{ path: '/pages/portfolio/masonry/full-width', title: 'Vintage', type: 'link' }
					]
				},
				{
					title: 'DESIGNER', type: 'sub', active: false, children: [
						{ path: '/home/vegetable', title: 'Canadian Rocks', type: 'link' },
						{ path: '/home/watch', title: 'Enchanted Disney', type: 'link' }
					]
				},
				{
					title: 'GEMSTONES', type: 'sub', active: false, children: [
						{ path: '/elements/product/slider', title: 'Amethyst', type: 'link' },
						{ path: '/elements/product/banners', title: 'Aquamarine', type: 'link' },
						{ path: '/elements/product/tabs', title: 'Emerald', type: 'link' },
						{ path: '/elements/product/multi-slider', title: 'Garnet', type: 'link' },
						{ path: '/elements/product/multi-slider', title: 'Morganite', type: 'link' },
						{ path: '/elements/product/multi-slider', title: 'Opal', type: 'link' },
						{ path: '/elements/product/multi-slider', title: 'Pearl', type: 'link' }
				    ]
				},
				{
					title: 'NEW AND TRENDING', type: 'sub', active: false, children: [
						{ path: '/elements/theme/title', title: 'Noventa', type: 'link' },
						{ path: '/elements/theme/collection-banner', title: 'Canadian Rocks', type: 'link' },
						{ path: '/elements/theme/category', title: 'Climbers And Crawlers', type: 'link' }
					]
				},
			]
		},
				{
			title: 'BRACELETS', type: 'sub', megaMenu: true, active: false, children: [
				{
					title: 'CATEGORY', type: 'sub', active: false, children: [
						{ path: '/pages/portfolio/grid/two', title: 'Alternative Metals', type: 'link' },
						{ path: '/pages/portfolio/grid/three', title: 'Ankle', type: 'link' },
						{ path: '/pages/portfolio/grid/four', title: 'Bangle', type: 'link' },
						{ path: '/pages/portfolio/masonry/grid/two', title: 'Luxury', type: 'link' },
						{ path: '/pages/portfolio/masonry/grid/three', title: 'Mens', type: 'link' },
						{ path: '/pages/portfolio/masonry/grid/four', title: 'Infinity', type: 'link' },
						{ path: '/pages/portfolio/masonry/full-width', title: 'Heart', type: 'link' }
					]
				},
				{
					title: 'GEMSTONES', type: 'sub', active: false, children: [
						{ path: '/elements/product/slider', title: 'Amethyst', type: 'link' },
						{ path: '/elements/product/banners', title: 'Aquamarine', type: 'link' },
						{ path: '/elements/product/tabs', title: 'Emerald', type: 'link' },
						{ path: '/elements/product/multi-slider', title: 'Garnet', type: 'link' },
						{ path: '/elements/product/multi-slider', title: 'Morganite', type: 'link' },
						{ path: '/elements/product/multi-slider', title: 'Opal', type: 'link' },
						{ path: '/elements/product/multi-slider', title: 'Pearl', type: 'link' }
				    ]
				},
				{
					title: 'NEW AND TRENDING', type: 'sub', active: false, children: [
						{ path: '/elements/theme/title', title: 'Bolos', type: 'link' },
						{ path: '/elements/theme/home-slider', title: 'Infinity', type: 'link' }
					]
				},
			]
		},
				{
			title: 'WATCHES', type: 'sub', megaMenu: true, active: false, children: [
				{
					title: 'BRANDS', type: 'sub', active: false, children: [
						{ path: '/pages/portfolio/grid/two', title: 'Black Hills Gold', type: 'link' },
						{ path: '/pages/portfolio/grid/three', title: 'Bulova', type: 'link' },
						{ path: '/pages/portfolio/grid/four', title: 'Citizen', type: 'link' },
						{ path: '/pages/portfolio/masonry/grid/two', title: 'Disney', type: 'link' },
						{ path: '/pages/portfolio/masonry/grid/three', title: 'Fossil', type: 'link' },
						{ path: '/pages/portfolio/masonry/grid/four', title: 'G-Shock', type: 'link' },
						{ path: '/pages/portfolio/masonry/full-width', title: 'Marvel', type: 'link' }
					]
				},
				{
					title: 'CATEGORY', type: 'sub', active: false, children: [
						{ path: '/home/vegetable', title: 'Ladies', type: 'link' },
						{ path: '/home/watch', title: 'Mens', type: 'link' }
					]
				},
			]
		},
				{
			title: 'BLACK HILLS GOLD', type: 'sub', megaMenu: true, active: false, children: [
			{
				title: 'CATEGORY', type: 'sub', active: false, children: [
						{ path: '/home/vegetable', title: 'Accessories', type: 'link' },
						{ path: '/home/watch', title: 'Bracelets', type: 'link' },
						{ path: '/home/vegetable', title: 'Earrings', type: 'link' },
						{ path: '/home/vegetable', title: 'Necklace', type: 'link' }
					]
				},
			]
		}, 	
				{
			title: 'CLEARANCE', type: 'sub', active: false, children: [
				{ path: '/pages/blog/left/sidebar', title: 'Gold Tag', type: 'link' },
				{ path: '/pages/blog/right/sidebar', title: 'Brite Buys', type: 'link' }
			]
		},
	];

	LEFTMENUITEMS: Menu[] = [
		{
			title: 'clothing', type: 'sub', megaMenu: true, active: false, children: [
			  {
				  title: 'mens fashion',  type: 'link', active: false, children: [
					  { path: '/home/fashion', title: 'sports wear',  type: 'link' },
					  { path: '/home/fashion', title: 'top',  type: 'link' },
					  { path: '/home/fashion', title: 'bottom',  type: 'link' },
					  { path: '/home/fashion', title: 'ethic wear',  type: 'link' },
					  { path: '/home/fashion', title: 'sports wear',  type: 'link' },
					  { path: '/home/fashion', title: 'shirts',  type: 'link' },
					  { path: '/home/fashion', title: 'bottom',  type: 'link' },
					  { path: '/home/fashion', title: 'ethic wear',  type: 'link' },
					  { path: '/home/fashion', title: 'sports wear',  type: 'link' }
				  ]
			  },
			  {
				  title: 'women fashion',  type: 'link', active: false, children: [
					  { path: '/home/fashion', title: 'dresses',  type: 'link' },
					  { path: '/home/fashion', title: 'skirts',  type: 'link' },
					  { path: '/home/fashion', title: 'westarn wear',  type: 'link' },
					  { path: '/home/fashion', title: 'ethic wear',  type: 'link' },
					  { path: '/home/fashion', title: 'bottom',  type: 'link' },
					  { path: '/home/fashion', title: 'ethic wear',  type: 'link' },
					  { path: '/home/fashion', title: 'sports wear',  type: 'link' },
					  { path: '/home/fashion', title: 'sports wear',  type: 'link' },
					  { path: '/home/fashion', title: 'bottom wear',  type: 'link' }
				  ]
			  },
			]
		},
		{
			title: 'bags', type: 'sub', active: false, children: [
			  { path: '/home/fashion', title: 'shopper bags', type: 'link' },
			  { path: '/home/fashion', title: 'laptop bags', type: 'link' },
			  { path: '/home/fashion', title: 'clutches', type: 'link' },
			  {
				  path: '/home/fashion', title: 'purses', type: 'link', active: false, children: [
					  { path: '/home/fashion', title: 'purses',  type: 'link' },
					  { path: '/home/fashion', title: 'wallets',  type: 'link' },
					  { path: '/home/fashion', title: 'leathers',  type: 'link' },
					  { path: '/home/fashion', title: 'satchels',  type: 'link' }
				  ]
			  },
			]
		},
		{
			title: 'footwear', type: 'sub', active: false, children: [
			  { path: '/home/fashion', title: 'sport shoes', type: 'link' },
			  { path: '/home/fashion', title: 'formal shoes', type: 'link' },
			  { path: '/home/fashion', title: 'casual shoes', type: 'link' }
			]
		},
		{
			path: '/home/fashion', title: 'watches', type: 'link'
		},
		{
			title: 'Accessories', type: 'sub', active: false, children: [
			  { path: '/home/fashion', title: 'fashion jewellery', type: 'link' },
			  { path: '/home/fashion', title: 'caps and hats', type: 'link' },
			  { path: '/home/fashion', title: 'precious jewellery', type: 'link' },
			  {
				  path: '/home/fashion', title: 'more..', type: 'link', active: false, children: [
					  { path: '/home/fashion', title: 'necklaces',  type: 'link' },
					  { path: '/home/fashion', title: 'earrings',  type: 'link' },
					  { path: '/home/fashion', title: 'rings & wrist wear',  type: 'link' },
					  {
						  path: '/home/fashion', title: 'more...',  type: 'link', active: false, children: [
							  { path: '/home/fashion', title: 'ties',  type: 'link' },
							  { path: '/home/fashion', title: 'cufflinks',  type: 'link' },
							  { path: '/home/fashion', title: 'pockets squares',  type: 'link' },
							  { path: '/home/fashion', title: 'helmets',  type: 'link' },
							  { path: '/home/fashion', title: 'scarves',  type: 'link' },
							  {
								  path: '/home/fashion', title: 'more...',  type: 'link', active: false, children: [
									  { path: '/home/fashion', title: 'accessory gift sets',  type: 'link' },
									  { path: '/home/fashion', title: 'travel accessories',  type: 'link' },
									  { path: '/home/fashion', title: 'phone cases',  type: 'link' }
								  ]
							  },
						]
					  }
				  ]
			  },
			]
		},
		{
			path: '/home/fashion', title: 'house of design', type: 'link'
		},
		{
			title: 'beauty & personal care', type: 'sub', active: false, children: [
			  { path: '/home/fashion', title: 'makeup', type: 'link' },
			  { path: '/home/fashion', title: 'skincare', type: 'link' },
			  { path: '/home/fashion', title: 'premium beaty', type: 'link' },
			  {
				  path: '/home/fashion', title: 'more..', type: 'link', active: false, children: [
					  { path: '/home/fashion', title: 'fragrances',  type: 'link' },
					  { path: '/home/fashion', title: 'luxury beauty',  type: 'link' },
					  { path: '/home/fashion', title: 'hair care',  type: 'link' },
					  { path: '/home/fashion', title: 'tools & brushes',  type: 'link' }
				  ]
			  },
			]
		},
		{
			path: '/home/fashion', title: 'home & decor', type: 'link'
		},
		{
			path: '/home/fashion', title: 'kitchen', type: 'link'
		},
	];

	// Array
	items = new BehaviorSubject<Menu[]>(this.MENUITEMS);
	leftMenuItems = new BehaviorSubject<Menu[]>(this.LEFTMENUITEMS);

}
