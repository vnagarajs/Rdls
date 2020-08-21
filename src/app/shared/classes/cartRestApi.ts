export namespace cartRestApi {

    export interface CustomOption {
        optionId?: string;
        optionValue?: string;
    }

    export interface ExtensionAttributes {
        customOptions?: CustomOption[];
        configurable_item_options?: ConfigurableItemOption[];
    }

    export interface ConfigurableItemOption {
        option_id: string;
        option_value: number;
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
        product_type?: string;
    }

    export interface Cart {
        cartItem?: CartItem;
    }
}
