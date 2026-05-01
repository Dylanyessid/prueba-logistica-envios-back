export interface ILandShipment {
  clientId: number;
  productId: number;
  destinationWarehouseId: number;
  productQuantity: number;
  shippingPrice: number;
  finalPrice: number;
  vehiclePlate: string;
  trackingNumber: string;
  registrationDate: Date;
  deliveryDate: Date;
}
