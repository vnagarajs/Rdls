

    export interface Image {
        url?: string;
    }

    export interface Product {
        name?: string;
        sku?: string;
        image?: Image;
    }

    export interface Price {
        value?: number;
    }

    export interface Value {
        id?: number;
        label?: string;
        value?: string;
        price?: Price;
    }

    export interface CustomizableOption {
        label?: string;
        id?: number;
        values?: Value[];
    }

    export interface Item {
        id?: string;
        product?: Product;
        customizable_options?: CustomizableOption[];
        quantity?: number;
        price?: number;
    }

    export interface Amount {
        value?: number;
        currency?: string;
    }

    export interface SelectedShippingMethod {
        amount?: Amount;
        carrier_code?: string;
        carrier_title?: string;
        method_code?: string;
        method_title?: any;
    }

    export interface ShippingAddress {
        selected_shipping_method?: SelectedShippingMethod;
    }

    export interface AppliedCoupon {
        code?: string;
    }

    export interface GrandTotal {
        value?: number;
    }

    export interface SubtotalExcludingTax {
        value?: number;
    }

    export interface Amount2 {
        value?: number;
    }

    export interface AppliedTax {
        amount?: Amount2;
        label?: string;
    }

    export interface Prices {
        grand_total?: GrandTotal;
        subtotal_excluding_tax?: SubtotalExcludingTax;
        applied_taxes?: AppliedTax[];
    }

    export interface Cart {
        items?: Item[];
        shipping_addresses?: ShippingAddress[];
        applied_coupon?: AppliedCoupon;
        prices?: Prices;
    }

    export interface Data {
        cart?: Cart;
    }

    export interface CartResponse {
        data?: Data;
    }



