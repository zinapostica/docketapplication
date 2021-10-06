const sgMail = require('@sendgrid/mail');

export const sendEmail = async (to: string, subject: string, body: string, html: string = "") => {
    sgMail.setApiKey(process.env.EMAIL_API_KEY);
    const message = {
        to: to,
        from: process.env.EMAIL_FROM,
        subject: subject,
        text: body,
        html: html.length ? html : body
    }
    let responseCode;
    try {
        const response = await sgMail.send(message);
        responseCode = response[0].statusCode;
    } catch (err) {
        responseCode = err.code;
    }
    if (responseCode == 202) {
        return "Email sent successfully";
    } else {
        return "Failed to send email";
    }
}

