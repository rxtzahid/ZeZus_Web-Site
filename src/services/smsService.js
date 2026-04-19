const twilio = require('twilio');

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

const client = twilio(accountSid, authToken);

class SMSService {
  async sendSMS(toPhoneNumber, message) {
    try {
      const result = await client.messages.create({
        body: message,
        from: twilioPhoneNumber,
        to: toPhoneNumber,
      });

      console.log('SMS sent:', result.sid);
      return result;
    } catch (error) {
      console.error('SMS Service Error:', error.message);
      throw error;
    }
  }

  async sendOTP(phoneNumber, otp) {
    const message = `Your Assa Pathao OTP is: ${otp}. Valid for 10 minutes.`;
    return this.sendSMS(phoneNumber, message);
  }

  async sendRideNotification(phoneNumber, driverName, rideDetails) {
    const message = `Your ride has been accepted by ${driverName}. ${rideDetails}`;
    return this.sendSMS(phoneNumber, message);
  }

  async sendDeliveryNotification(phoneNumber, driverName, parcelDetails) {
    const message = `Your parcel is on the way with ${driverName}. ${parcelDetails}`;
    return this.sendSMS(phoneNumber, message);
  }
}

module.exports = new SMSService();
