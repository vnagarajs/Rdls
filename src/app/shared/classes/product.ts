// Products

export interface Variants {
    variant_id?: number;
    id?: number;
    sku?: string;
    size?: string;
    color?: string;
    image_id?: number;
}

export interface Images {
    image_id?: number;
    id?: number;
    alt?: string;
    src?: string;
    variant_id?: any[];
}

export interface Product {
    //id?: number;
    title?: string;
    description?: string;
    type?: string;
    brand?: string;
    collection?: any[];
    category?: string;
    //price?: number;
    sale?: boolean;
    discount?: number;
    stock?: number;
    new?: boolean;
    quantity?: number;
    tags?: any[];
    variants?: Variants[];
    images?: Images[];

// Product as per riddles API

    id?: number;
    sku?: string;
    name?: string;
    attribute_set_id?: number;
    price?: number;
    status?: number;
    visibility?: number;
    type_id?: string;
    created_at?: string;
    updated_at?: string;
    extension_attributes?: ExtensionAttributes;
    product_links?: any[];
    options?: Option[];
    media_gallery_entries?: MediaGalleryEntry[];
    tier_prices?: any[];
    dyo_tryon?: number;
    display_price?: string;
    Warranty_Info_Url?: string;
    custom_attributes?: CustomAttribute[];
    product_reviews?: ProductReviews;
    stock_item_status?: StockItemStatus;
    share_url?: string;
}


export interface CategoryLink {
    position: number;
    category_id: string;
}

export interface StockItem {
    item_id: number;
    product_id: number;
    stock_id: number;
    qty: number;
    is_in_stock: boolean;
    is_qty_decimal: boolean;
    show_default_notification_message: boolean;
    use_config_min_qty: boolean;
    min_qty: number;
    use_config_min_sale_qty: number;
    min_sale_qty: number;
    use_config_max_sale_qty: boolean;
    max_sale_qty: number;
    use_config_backorders: boolean;
    backorders: number;
    use_config_notify_stock_qty: boolean;
    notify_stock_qty: number;
    use_config_qty_increments: boolean;
    qty_increments: number;
    use_config_enable_qty_inc: boolean;
    enable_qty_increments: boolean;
    use_config_manage_stock: boolean;
    manage_stock: boolean;
    low_stock_date?: any;
    is_decimal_divided: boolean;
    stock_status_changed_auto: number;
}

export interface ExtensionAttributes {
    website_ids?: number[];
    category_links?: CategoryLink[];
    stock_item?: StockItem;
    configurable_product_options?: ConfigurableProductOption[];
    configurable_product_links?: number[];
}

export interface ConfigurableProductOption {
    id: number;
    attribute_id: string;
    label: string;
    position: number;
    values: Value2[];
    product_id: number;
}

export interface Value2 {
    value_index: number;
}

export interface Value {
    title: string;
    sort_order: number;
    price: number;
    price_type: string;
    sku: string;
    option_type_id: number;
}

export interface Option {
    product_sku: string;
    option_id: number;
    title: string;
    type: string;
    sort_order: number;
    is_require: boolean;
    sku: string;
    max_characters: number;
    image_size_x: number;
    image_size_y: number;
    values: Value[];
    price?: number;
    price_type: string;
}

export interface MediaGalleryEntry {
    id: number;
    media_type: string;
    label: string;
    position: number;
    disabled: boolean;
    types: string[];
    file: string;
}

export interface CustomAttribute {
    attribute_code: string;
    value: any;
    label: string;
    is_visible_on_front?: number;
    default_frontend_label: string;
}

export interface ProductReviews {
}

export interface StockItem2 {
    item_id: number;
    product_id: number;
    stock_id: number;
    qty: number;
    is_in_stock: boolean;
    is_qty_decimal: boolean;
    show_default_notification_message: boolean;
    use_config_min_qty: boolean;
    min_qty: number;
    use_config_min_sale_qty: number;
    min_sale_qty: number;
    use_config_max_sale_qty: boolean;
    max_sale_qty: number;
    use_config_backorders: boolean;
    backorders: number;
    use_config_notify_stock_qty: boolean;
    notify_stock_qty: number;
    use_config_qty_increments: boolean;
    qty_increments: number;
    use_config_enable_qty_inc: boolean;
    enable_qty_increments: boolean;
    use_config_manage_stock: boolean;
    manage_stock: boolean;
    low_stock_date?: any;
    is_decimal_divided: boolean;
    stock_status_changed_auto: number;
}

export interface StockItemStatus {
    product_id: number;
    stock_id: number;
    qty: number;
    stock_status: number;
    stock_item: StockItem2;
}