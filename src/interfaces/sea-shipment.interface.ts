export interface ISeaShipment {
  clientId: number;
  clientName: string;
  clientDocument: string;
  productId: number;
  productName: string;
  destinationPortId: number;
  destinationPortName: string;
  productQuantity: number;
  shippingPrice: number;
  discountPercentage: number;
  discountAmount: number;
  finalPrice: number;
  fleetNumber: string;
  trackingNumber: string;
  registrationDate: Date;
  deliveryDate: Date;
}
