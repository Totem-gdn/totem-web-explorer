
export interface Legacy {
    achievements?: LegacyEvent[];
}

export interface Achievement {
    data: string;
    gameId: string;
    itemId: string;
    timestamp: string;
}

export interface ItemLegacy {
  limit?: number;
  offset?: number;
  results?: LegacyData[];
}
export interface LegacyData {
  assetId?: number;
  data?: string;
  type?: string;
  gameAddress?: string;
  playerAddress?: string;
  recordId?: number;
  timestamp?: number;
}

export interface LegacyResponse<T> {
  limit: number;
  offset: number;
  results: T;
  total: number;
}

export interface LegacyEvent {
  playerAddress: string;
  assetId: string;
  gameAddress: string;
  data: string;
}
