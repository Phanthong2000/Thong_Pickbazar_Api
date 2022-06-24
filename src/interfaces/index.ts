export interface UserType {
    name: string;
    age: string;
    username: string;
    password: string;
    roleId: string;
}

export interface RoleType {
    name: string;
    createAt: number;
}

export interface BannerGroupType {
    title_vn: string;
    title_en: string;
    description_vn: string;
    description_en: string;
    gallery: string;
}
export interface GroupType {
    name_vi: string;
    name_en: string;
    icon: string;
    layout: string;
    productCard: string;
    sliders: Array<string>;
    banner: BannerGroupType;
}

export interface CategoryType {
    name_vi: string;
    name_en: string;
    icon: string;
    image: string;
    groupId: string;
    type: string;
    parentId: string;
    detail: string;
}

export interface TagType {
    name: string;
    icon: string;
    slug: string;
    detail: string;
    groupId: string;
}
export interface AttributeValueType {
    value: string;
    meta: string;
}

export interface AttributeType {
    name_vi: string;
    name_en: string;
    values: Array<AttributeValueType>;
}

export interface ProductType {
    name_vi: string;
    name_en: string;
    unit: string;
    description: string;
    status: string;
    featureImage: string;
    galleries: Array<string>;
    groupId: string;
    categories: Array<string>;
    tags: Array<string>;
    type: string;
    simple: any;
    variable: any;
}

export interface AddressType {
    street: string;
    ward: string;
    district: string;
    city: string;
}
export interface UserType {
    name: string;
    email: string;
    phone: string;
    avatar: string;
    status: string;
    birthday: Date;
    address: AddressType;
    username: string;
    password: string;
    roleId: string;
    refreshToken: string;
}

export interface OrderStatusType {
    name: string;
    serial: number;
    color: string;
}

export interface CouponType {
    image: string;
    code: string;
    description: string;
    type: string;
    amount: number;
    from: Date;
    to: Date;
    condition: string;
    paymentMethodId: string;
    minTotal: number;
}

export interface TaxType {
    name: string;
    type: string;
    rate: number;
    status: string;
    city: string;
    district: string;
    ward: string;
}

export interface ShippingType {
    name: string;
    fee: number;
}

export interface PaymentMethodType {
    name: string;
    image: string;
    type: string;
    status: string;
    parentId: string;
}

export interface SettingType {
    logo: string;
    title: string;
    subTitle: string;
    currency: string;
    minimumOrderAmount: number;
    optCheckout: boolean;
    shippingId: string;
    seo: {
        metaTitle: string;
        metaDescription: string;
        metaTags: string;
        canonicalUrl: string;
        ogTitle: string;
        ogDescription: string;
        ogImage: string;
        twitterHandle: string;
        twitterCardType: string;
    };
    deliverySchedule: [
        {
            title: string;
            description: string;
        }
    ];
    shop: {
        address: string;
        phone: string;
        website: string;
        social: [
            {
                icon: string;
                name: string;
                url: string;
            }
        ];
    };
}

export interface OrderType {
    customerId: string;
    phone: string;
    billAddress: string;
    shippingAddress: string;
    deliverySchedule: {
        title: string;
        description: string;
    };
    products: [
        {
            productId: string;
            price: number;
            quantity: number;
            unit: string
        }
    ];
    taxId: string;
    shippingId: string;
    couponId: string;
    orderStatusId: string;
    paymentMethodId: string;
    internetBankingImage: string;
    total: number;
}
