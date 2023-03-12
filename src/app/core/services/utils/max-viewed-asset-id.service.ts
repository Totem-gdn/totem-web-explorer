import { Injectable } from '@angular/core';
import { StorageKey } from '@app/core/models/enums/storage-keys.enum';
import { AssetInfo } from '@app/core/models/interfaces/asset-info.model';
@Injectable({
  providedIn: 'root'
})
export class MaxViewedAssetIdService {

  getMaxAssetId(assetList: AssetInfo[]): number | undefined {
    if (!assetList) return;
    let assetIdArray: number[] = [];
    assetList.forEach((asset: AssetInfo) => {
      assetIdArray.push(asset.tokenId);
    });
    const maxId: number = Math.max.apply(null, assetIdArray);
    return maxId;
  }

  setMaxIdToStorage(type: 'item' | 'avatar', id: number) {
    if (type === 'item') localStorage.setItem(StorageKey.LAST_VIEWED_ITEM_ID, id.toString());
    if (type === 'avatar') localStorage.setItem(StorageKey.LAST_VIEWED_AVATAR_ID, id.toString());
  }

  getMaxIdFromStorage(type: 'item' | 'avatar'): number | undefined {
    let id: string | null = null;
    if (type === 'item') id = localStorage.getItem(StorageKey.LAST_VIEWED_ITEM_ID);
    if (type === 'avatar') id = localStorage.getItem(StorageKey.LAST_VIEWED_AVATAR_ID);
    if (!id) return undefined;
    return Number(id);
  }

}
