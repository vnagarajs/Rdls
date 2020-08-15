export namespace cartRestApi {

    export interface CustomOption {
        optionId?: string;
        optionValue?: string;
    }

    export interface ExtensionAttributes {
        customOptions?: CustomOption[];
    }

    export interface ProductOption {
        extensionAttributes?: ExtensionAttributes;
    }

    export interface CartItem {
        sku?: string;
        qty?: number;
        quote_id?: string;
        productOption?: ProductOption;
        name?: string;
        price?: string;
    }

    export interface Cart {
        cartItem?: CartItem;
    }
}
