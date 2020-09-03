// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
    instagram_token: 'IGQVJYeTgwLUxRRUowZAHRIQUFzVGpGOThieXlFSVg4VlE4dU9UaU5sUmhhRDU2b2JNTzFvblFGT19nT0JPZAEcxUjZAwenBkWmNORE1tOThwbXpJUlVOQTZAmUmRDdnUzRTFtdERyU2hB',
    stripe_token: 'STRIPE_PUBLISHABLE_KEY',
    paypal_token: 'sb',
    phonenumber: {
    number: '18884023475',
    display_string: '1-888-402-3475'
    },
    featureCategoryImageBaseURL: 'https://28pkqk84wgmimmok.mojostratus.io/media/catalog/category/',
    homePageBannerImageBaseURL: 'https://www.riddlesjewelry.com/media/slide/',
    BASE_URL: 'https://28pkqk84wgmimmok.mojostratus.io/',
    image_base_url: 'https://28pkqk84wgmimmok.mojostratus.io/media/catalog/product/cache/1fbe3e5bb431ac364a84f162d5cf3425/',
    product_base_url: 'https://28pkqk84wgmimmok.mojostratus.io/rest/V1/',
    api_host: 'https://28pkqk84wgmimmok.mojostratus.io/',    
    graphql_url: 'graphql',    
    get_product_url: 'product/detail/',
    add_to_cart_guest_url: 'guest-carts/{0}/items',
    add_to_cart_customer_url: 'carts/mine/items', 
    get_cart_url: 'guest-carts/{0}/items',
    get_quote_id_url: 'guest-carts',
    get_order_url:'orders/',
    authorize_net_order_url:'payment/captureAmount',    
    adminBearerToken: 'txvjvw2sib3qo381lxizcjegldhfw8qx',
    addGiftMessageUrl: 'carts/{0}/gift-message',
    savePaymentDetails: 'payment/savePaymentDetails',    
    getBirthMonthOptionsUrl: 'Customer/getAttributeValues/customer_birth_month',
    getAnniversaryMonthOptionsUrl: 'Customer/getAttributeValues/customer_anniversary_month',
    registerCustomerUrl: 'customers'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
