
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