export interface ISeaShipment {
  clientId: number;
  productId: number;
  destinationPortId: number;
  productQuantity: number;
  shippingPrice: number;
  finalPrice: number;
  vehiclePlate: string;
  trackingNumber: string;
  registrationDate: Date;
  deliveryDate: Date;
}
