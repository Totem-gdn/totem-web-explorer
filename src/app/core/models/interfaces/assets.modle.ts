

export interface AssetsCache 
{
    totalGems?: TotalAssets;
    totalAvatars?: TotalAssets;
    totalItems?: TotalAssets;
    totalFavItems?: TotalAssets;
    totalFavAvatars?: TotalAssets;
    totalFavGems?: TotalAssets;
}

export interface TotalAssets
{
    all: string;
    rare: string;
    unique: string;
}