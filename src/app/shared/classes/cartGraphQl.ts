export interface Image {
    url?: string;
}

export interface Value {
    option_type_id?: number;
    price?: number;
    title?: string;
    sort_order?: number;
}

export interface Option {
    title?: string;
    required?: boolean;
    sort_order?: number;
    option_id?: number;
    value?: Value[];
    type?: string;
}

export interface Product {
    name?: string;
    sku?: string;
    image?: Image;
    options?: Option[];
}

export interface Price {
    value?: number;
}

export interface Value2 {
    id?: number;
    label?: string;
    value?: string;
    price?: Price;
}

export interface CustomizableOption {
    label?: string;
    id?: number;
    values?: Value2[];
}

export interface Item {
    id?: string;
    product?: Product;
    customizable_options?: CustomizableOption[];
    quantity?: number;
}

export interface Country {
    code?: any;
    label?: any;
}

export interface Region {
    code?: any;
    label?: any;
}

export interface BillingAddress {
    city?: any;
    country?: Country;
    firstname?: any;
    lastname?: any;
    postcode?: any;
    region?: Region;
    street?: string[];
    telephone?: any;
}

export interface Amount {
    currency?: string;
    value?: number;
}

export interface PriceExclTax {
    value?: number;
    currency?: string;
}

export interface PriceInclTax {
    value?: number;
    currency?: string;
}

export interface AvailableShippingMethod {
    amount?: Amount;
    available?: boolean;
    carrier_code?: string;
    carrier_title?: string;
    error_message?: string;
    method_code?: string;
    method_title?: any;
    price_excl_tax?: PriceExclTax;
    price_incl_tax?: PriceInclTax;
}

export interface SelectedShippingMethod {
    amount: Amount;
    carrier_code: string;
    carrier_title: string;
    method_code: string;
    method_title?: any;
}

export interface ShippingAddress {
    firstname?: string;
    lastname?: string;
    street?: string[];
    city?: string;
    region?: Region;
    country?: Country;
    telephone?: string;
    postcode?: string;
    available_shipping_methods?: AvailableShippingMethod[];
    selected_shipping_method?: SelectedShippingMethod;
}

export interface SelectedPaymentMethod {
    code?: string;
    title?: string;
}

export interface AvailablePaymentMethod {
    code?: string;
    title?: string;
}

export interface GrandTotal {
    value?: number;
}

export interface SubtotalExcludingTax {
    value?: number;
}

export interface Prices {
    grand_total?: GrandTotal;
    subtotal_excluding_tax?: SubtotalExcludingTax;
    applied_taxes?: any[];
}

export interface Cart {
    items?: Item[];
    email?: string;
    billing_address?: BillingAddress;
    shipping_addresses?: ShippingAddress[];
    selected_payment_method?: SelectedPaymentMethod;
    applied_coupon?: any;
    available_payment_methods?: AvailablePaymentMethod[];
    prices?: Prices;
}

export interface Data {
    cart?: Cart;
}

export interface CartResponse {
    data?: Data;
}
