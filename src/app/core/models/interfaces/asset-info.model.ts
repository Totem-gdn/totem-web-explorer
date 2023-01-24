import { ASSET_TYPE } from "../enums/asset-types.enum";

export interface AssetInfo {
    createdAt: string;
    games: number;
    id: string;
    isLiked: boolean;
    lastUsed?: string;
    likes: number;
    owner: string;
    owners: string[];
    tokenId: number;
    updatedAt: string;
    views: string;
    rarity?: number | string;
    assetType?: string;
    rendererUrl?: string | undefined;
    price?: string;
}

// export interface AssetTransationType {
//     type:
// }
export interface PaymentInfo {
    type?: ASSET_TYPE;
    paymentInfo?: {
        address?: string;
        price?: string;
        token?: string;
    }
}

export interface CardPaymentResponse {
    url?: string;
    order?: string;
}

export function IsPaymentInfo(obj: any): obj is PaymentInfo {
    return 'type' in obj && 'paymentInfo' in obj;
}
export interface AssetTransation {
    type?: 'payment' | 'transfer';
    assetInfo?: AssetInfo;
    paymentInfo?: PaymentInfo;
}
