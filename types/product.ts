// export interface ProductSpecification {
//     key: string;
//     value: string;
// }

export interface Product {
    _id: string;

    name: string;

    slug: string;

    description: string;

    shortDescription: string;

    brand: string;

    isWishlisted?: boolean;

    category: {
        _id?: string;
        name: string;
        slug: string;
    };

    subCategory?: {
        _id?: string;
        name: string;
        slug: string;
    };

    cover: string;

    gallery: string[];

    price: number;

    rating: number;

    discountPrice: number;

    retailPrice: number;

    minimumOrderQuantity: number;

    stock: number;

    specifications: Record<string, string>;

    isFeatured: boolean;

    isActive: boolean;

    createdAt?: string;

    updatedAt?: string;
}

export interface ProductForm {
    name: string;

    slug: string;

    description: string;

    brand: string;

    category: string;

    subCategory: string;

    cover: File | null;

    images: File[];

    price: number;

    discountPrice: number;

    retailPrice: number;
    
    minimumOrderQuantity: number;

    stock: number;

    // specifications: ProductSpecification[];
    specifications: Record<string, string>;

    isFeatured: boolean;

    isActive: boolean;
}