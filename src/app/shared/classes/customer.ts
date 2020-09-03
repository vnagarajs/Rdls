
    export interface Region {
        region_code: string;
        region: string;
    }

    export interface Address {
        firstname: string;
        lastname: string;
        street: string[];
        city: string;
        region: Region;
        postcode: string;
        telephone: string;
    }

    export interface Customer {
        firstname: string;
        lastname: string;
        suffix?: any;
        email: string;
        addresses: Address[];
    }

    export interface Item {
        id: number;
        created_at: string;
        grand_total: number;
        status: string;
    }

    export interface CustomerOrders {
        items: Item[];
    }

    export interface CustomerDetails {
        customer: Customer;
        customerOrders: CustomerOrders;
    }