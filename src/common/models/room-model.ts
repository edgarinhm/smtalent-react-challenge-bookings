export interface RoomModel {
  id: number;
  hotelId: number;
  level: number;
  type: string;
  quantity: number;
  active: boolean;
  baseCost: number;
  taxes: number;
  location: string;
}
