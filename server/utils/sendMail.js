exports.sendEmail = async (email, subject, message) => {
  try {
    if (!email) {
      throw new Error('Please provide email');
    }

    const transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE || 'gmail',
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: `Cu Voting <${process.env.EMAIL_USERNAME}>`,
      to: email,
      subject: subject,
      html: message,
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending email:', error);
    throw error; // Rethrow the error for handling in the calling code
  }
};
