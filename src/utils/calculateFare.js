// Fare calculation logic
const calculateFare = (distance, duration, rideType = 'economy', discount = 0) => {
  // Base fares in currency units (e.g., BDT)
  const baseFares = {
    economy: 50,
    comfort: 100,
    premium: 150,
  };

  // Per km rate
  const perKmRate = {
    economy: 15,
    comfort: 20,
    premium: 25,
  };

  // Per minute rate
  const perMinuteRate = {
    economy: 2,
    comfort: 3,
    premium: 4,
  };

  const baseFare = baseFares[rideType] || baseFares.economy;
  const kmRate = perKmRate[rideType] || perKmRate.economy;
  const minRate = perMinuteRate[rideType] || perMinuteRate.economy;

  const distanceFare = distance * kmRate;
  const timeFare = duration * minRate;
  const subtotal = baseFare + distanceFare + timeFare;

  // Apply discount
  const discountAmount = (subtotal * discount) / 100;
  const fareAfterDiscount = subtotal - discountAmount;

  // Calculate tax (e.g., 15%)
  const tax = (fareAfterDiscount * 0.15);
  const totalFare = fareAfterDiscount + tax;

  return {
    baseFare,
    distanceFare,
    timeFare,
    subtotal,
    discount: discountAmount,
    tax,
    total: Math.round(totalFare * 100) / 100,
  };
};

const calculateParcelFare = (weight, distance, deliveryType = 'standard', discount = 0) => {
  const baseFares = {
    standard: 100,
    express: 200,
    scheduled: 80,
  };

  const perKmRate = 10;
  const perKgRate = 20;

  const baseFare = baseFares[deliveryType] || baseFares.standard;
  const distanceFare = distance * perKmRate;
  const weightFare = weight * perKgRate;
  const subtotal = baseFare + distanceFare + weightFare;

  // Apply discount
  const discountAmount = (subtotal * discount) / 100;
  const fareAfterDiscount = subtotal - discountAmount;

  // Calculate tax (e.g., 15%)
  const tax = (fareAfterDiscount * 0.15);
  const totalFare = fareAfterDiscount + tax;

  return {
    baseFare,
    distanceFare,
    weightFare,
    subtotal,
    discount: discountAmount,
    tax,
    total: Math.round(totalFare * 100) / 100,
  };
};

module.exports = {
  calculateFare,
  calculateParcelFare,
};
