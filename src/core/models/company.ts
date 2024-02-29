import { User } from './user';

export interface Company {
    id: string;
    createdAt: string;
    updatedAt: string;
    isDeleted: false;
    isRequiredUpdate: boolean;
    docStatus: number;
    sortOrder: number;
    name: string;
    logo: string;
    status: string;
    description: string;
    imageUrls: string[];
    note: string;
    commission: number;
    licenseImageFront: string;
    licenseImageBack: string;
    address: string;
    owner: User;
}
