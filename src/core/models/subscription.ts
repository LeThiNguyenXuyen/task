export interface Subscription {
    id: string;
    createdAt: string;
    updatedAt: string;
    isDeleted: boolean;
    isRequiredUpdate: boolean;
    docStatus: number;
    name: string;
    description: string;
    price: number;
    slug: string;
    index: number;
    duration: number;
    imageUrls: string[];
    maxCompany: number;
}
