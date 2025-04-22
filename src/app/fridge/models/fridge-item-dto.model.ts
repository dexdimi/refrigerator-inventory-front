export interface FridgeItemDTO {
    id?: string;
    name: string;
    category?: string;
    quantity?: number;
    unit?: string,
    bestBeforeDate?: string;
    notes?: string;
}

export interface UnitDTO {
    name: string;
    label: string;
}
  
export interface CategoryDTO {
    name: string;
    label: string;
}