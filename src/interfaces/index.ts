export interface UserType {
    name: string;
    age: string;
    username: string;
    password: string;
    roleId: string
}

export interface RoleType {
    name: string;
    createAt: number
}

export interface BannerGroupType {
    title_vn: string;
    title_en: string;
    description_vn: string;
    description_en: string;
    gallery: string
}
export interface GroupType {
    name_vi: string;
    name_en: string;
    icon: string;
    layout: string;
    productCard: string;
    sliders: Array<string>;
    banner: BannerGroupType
}