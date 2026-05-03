export interface ILandShipment {
  clientId: number;
  clientName: string;
  clientDocument: string;
  productId: number;
  productName: string;
  destinationWarehouseId: number;
  destinationWarehouseName: string;
  productQuantity: number;
  shippingPrice: number;
  discountPercentage: number;
  discountAmount: number;
  finalPrice: number;
  vehiclePlate: string;
  trackingNumber: string;
  registrationDate: Date;
  deliveryDate: Date;
}
