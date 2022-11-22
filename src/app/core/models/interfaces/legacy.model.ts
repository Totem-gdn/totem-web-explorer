
export interface Legacy {
    achievements?: Achievement[];
}

export interface Achievement {
    data: string;
    gameId: string;
    itemId: string;
    timestamp: string;
}