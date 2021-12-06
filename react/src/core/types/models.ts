type DateString = string;
type Name = string;
type PrimaryTitle = string;
type SecondaryTitle = string;
type Weight = number;
type wasSoldStatus = boolean;
type BasePrice = string;

export interface I_Product {
    id: number,
    name: Name,
    primaryTitle: PrimaryTitle,
    secondaryTitle: SecondaryTitle,
    weight: Weight,
    wasSold: wasSoldStatus,
    basePrice: BasePrice
}

export enum I_Product_DetailStatus {
    expired = 'EXPIRED',
    active  = 'ACTIVE'
}

type CompanyName = string;

export type Tag =
    'PRIMARY'
    | 'STANDARD'
    | 'SECONDARY';

type Phone = string;
type Email = string;
type RelatedProductId = string

export interface RelatedProduct {
    id: RelatedProductId,
    phone: Phone,
    email: Email,
    tags: Tag[]
}

interface RelatedProductMap {
    [name: string]: RelatedProduct
}

export interface I_Product_Detail {
    id: string,
    status: I_Product_DetailStatus,
    companyName: CompanyName,
    creationDate: DateString,
    updateDate: DateString,
    relatedProducts: RelatedProductMap
}


export type HydratedDetail =
    Omit<I_Product_Detail, 'relatedProducts'>
    & {
        relatedProducts: string[];
        primaryRelatedProduct?: string;
        secondaryRelatedProduct?: string;
    }

export type HydratedRelatedProduct =
    Omit<RelatedProduct, 'tags'>
    & { tags: Set<Tag>; name: string };
