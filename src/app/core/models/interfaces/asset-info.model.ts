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
    rendererUrl?: string;
    price?: string;
}

export type AssetTypes = 'item' | 'avatar' | 'gem';

export interface RendererAvailableTypes {
  supported_asset_types: string[];
}

// export interface AssetTransationType {
//     type:
// }
export interface PaymentInfo {
  type?: ASSET_TYPE;
  paymentInfo?: {
    contractAddress?: string;
    price?: string;
    token?: string;
  }
}

export interface CardPaymentResponse {
    url?: string;
    order?: string;
}

export interface AssetTypeInfo {
    contractAddress: string;
    price: string;
}

export function IsPaymentInfo(obj: any): obj is PaymentInfo {
    return 'type' in obj && 'paymentInfo' in obj;
}
export interface AssetTransation {
    type?: 'payment' | 'transfer';
    assetInfo?: AssetInfo;
    paymentInfo?: PaymentInfo;
}
