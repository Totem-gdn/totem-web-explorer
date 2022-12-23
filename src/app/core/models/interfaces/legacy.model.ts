
export interface Legacy {
    achievements?: Achievement[];
}

export interface Achievement {
    data: string;
    gameId: string;
    itemId: string;
    timestamp: string;
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
  gameId: string;
  data: string;
}
