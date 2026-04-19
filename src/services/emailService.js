const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

class EmailService {
  async sendEmail(to, subject, html) {
    try {
      const result = await transporter.sendMail({
        from: `Assa Pathao <${process.env.EMAIL_USER}>`,
        to,
        subject,
        html,
      });

      console.log('Email sent:', result.messageId);
      return result;
    } catch (error) {
      console.error('Email Service Error:', error.message);
      throw error;
    }
  }

  async sendWelcomeEmail(email, name) {
    const html = `
      <h1>Welcome to Assa Pathao!</h1>
      <p>Hi ${name},</p>
      <p>Your account has been created successfully.</p>
      <p>Thank you for joining Assa Pathao. We're excited to serve you!</p>
    `;
    return this.sendEmail(email, 'Welcome to Assa Pathao', html);
  }

  async sendRideCompletedEmail(email, rideDetails) {
    const html = `
      <h1>Ride Completed</h1>
      <p>Your ride has been completed successfully.</p>
      <p>Details:</p>
      <ul>
        <li>Amount: ${rideDetails.amount}</li>
        <li>Duration: ${rideDetails.duration}</li>
        <li>Distance: ${rideDetails.distance}</li>
      </ul>
    `;
    return this.sendEmail(email, 'Ride Completed', html);
  }

  async sendParcelDeliveredEmail(email, parcelDetails) {
    const html = `
      <h1>Parcel Delivered</h1>
      <p>Your parcel has been delivered successfully.</p>
      <p>Details:</p>
      <ul>
        <li>Amount: ${parcelDetails.amount}</li>
        <li>Delivery Address: ${parcelDetails.address}</li>
      </ul>
    `;
    return this.sendEmail(email, 'Parcel Delivered', html);
  }

  async sendPaymentConfirmationEmail(email, paymentDetails) {
    const html = `
      <h1>Payment Confirmation</h1>
      <p>Your payment has been processed successfully.</p>
      <p>Details:</p>
      <ul>
        <li>Amount: ${paymentDetails.amount}</li>
        <li>Transaction ID: ${paymentDetails.transactionId}</li>
        <li>Date: ${new Date(paymentDetails.createdAt).toLocaleDateString()}</li>
      </ul>
    `;
    return this.sendEmail(email, 'Payment Confirmation', html);
  }
}

module.exports = new EmailService();
