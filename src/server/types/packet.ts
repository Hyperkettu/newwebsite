import { WeightResult } from '../../client/types/weight-result.entry';

export interface UpdateRequest {
    id?: number;
    weight?: number;
    password: string;
}

export interface UpdateResponse {
    status: number;
    results?: WeightResult[];
}