const fs = require("fs");
const transporter = require("./mailer");
const readFile = require("util").promisify(fs.readFile);
const handlebars = require("handlebars");

exports.sendMail = async (to, subject, html, attachments = null) => {
  let from = {
    name: "Surecare",
    address: "elysiumsolssmtp@gmail.com",
  };

  let sendMailObject = {};

  if (!attachments)
    sendMailObject = {
      to,
      subject,
      html,
      from,
    };
  else
    sendMailObject = {
      to,
      subject,
      html,
      from,
      attachments: attachments,
    };

  const mail = await transporter.sendMail(sendMailObject);

  if (mail) {
    return { error: false, message: "Email sent" };
  } else {
    return { error: true, message: "Email not sent" };
  }
};
exports.renderHBFile = async (file, data) => {
  const content = await readFile(file, "utf8");
  const template = handlebars.compile(content);
  data.zoom = process.platform == "linux" ? 0.68 : 0.9;
  data.fontSize = process.platform == "linux" ? 12 : 24;
  return template(data);
};
