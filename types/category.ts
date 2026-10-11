export interface Category {
    _id: string;
    name: string;
    slug: string;
    image: string;
    parentCategory: Category | null;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface CategoryResponse {
    success: boolean;
    currentPage: number;
    totalPages: number;
    totalCategories: number;
    categories: Category[];
}