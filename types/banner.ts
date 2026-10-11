export interface Banner {
    _id ?: string;
    heading: string;
    subHeading: string;
    buttonText: string,
    link: string,
    order: number,
    bannerCover: string|File|null,
    isActive: boolean;
    createdAt ?: string;
    updatedAt ?: string;
}