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
    meta: string
}

export interface AttributeType {
    name_vi: string;
    name_en: string;
    values: Array<AttributeValueType>
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