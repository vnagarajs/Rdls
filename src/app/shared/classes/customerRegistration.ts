export interface CustomAttribute {
    attribute_code?: string;
    value?: string;
}

export interface Customer {
    email?: string;
    firstname?: string;
    lastname?: string;
    custom_attributes?: CustomAttribute[];
    storeId?: number;
    websiteId?: number;
}

export interface customerRegistration {
    customer?: Customer;
    password?: string;
}