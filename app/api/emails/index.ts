import language from "@/contexts/language";
import axios from "axios";

const defaultTemplate = (title: any, body: any) => {
  return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${title}</title>
      </head>
      <body style="font-family: 'Arial', sans-serif;">
        <table style="max-width: 600px; margin: 0 auto; padding: 20px; border-collapse: collapse; width: 100%;">
          <tbody style="border: solid 1px #c7c7c7;">
          <tr style="background: #c7c7c7;">
            <td style="text-align: center; padding-top:10px;">
              <img src="${language.logo}" alt="" style="max-width: 100%;">
            </td>
          </tr>
          <tr>
            <td style="text-align: center; padding: 20px 0;">
              <h2 style="text-align: center; color: #333;">${title}</h2>
              ${body}
            </td>
          </tr>
      </tbody>
        </table>
      </body>
      </html>
      `
};

export async function sendEmail(email: any, name: any, title: any, body: any) {
  let emailBody = defaultTemplate(title, body)
  let data = JSON.stringify({
    "sender": {
      "name": "Travaux",
      "email": "no-reply@travaux.com"
    },
    "to": [
      {
        "email": email,
        "name": name
      }
    ],
    "htmlContent": emailBody,
    "subject": title
  });

  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://api.brevo.com/v3//smtp/email',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'api-key': process.env.EMAIL_KEY,
    },
    data: data
  };

  axios.request(config)
    .then((response) => {
      // console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
      console.log(error);
    });
}

export async function sendSms(phone: any, body: any) {
  let data = JSON.stringify({
    "content": body,
    "recipient": `+33 ${phone}`,
    "sender": "Depannage",
    "type": "marketing",
    "tag": "accountValidation",
    "webUrl": "http://requestb.in/173lyyx1",
    "unicodeEnabled": true
  });

  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://api.brevo.com/v3/transactionalSMS/sms',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'API-key': process.env.SMS_KEY,
    },
    data: data
  };

  axios.request(config)
    .then((response: any) => {
      // console.log(JSON.stringify(response.data));
    })
    .catch((error: any) => {
      console.log(error);
    });

}