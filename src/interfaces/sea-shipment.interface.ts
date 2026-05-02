export interface ISeaShipment {
  clientId: number;
  productId: number;
  destinationPortId: number;
  productQuantity: number;
  shippingPrice: number;
  finalPrice: number;
  fleetNumber: string;
  trackingNumber: string;
  registrationDate: Date;
  deliveryDate: Date;
}
