const async = require("../moddlewares/async");

const iconUploaderHelper = require("../helpers/icon");
const path = require("path");
require("dotenv").config(path.resolve(__dirname, ".env"));

const { renderHBFile, sendMail } = require("../helpers/utils");

const sendMessage = async(async (req, res) => {
  const data = req.body;
  const { file } = req;
  let uploadedPath = await iconUploaderHelper(file);
  let updatedData = {
    todayDate: data.todayDate,
    serviceDate: data.serviceDate,
    employeeName: data.employeeName,
    idNum: data.idNum,
    address: data.address,
    city: data.city,
    state: data.state,
    zip: data.zip,
    emailId: data.emailId,
    patientName: data.patientName,
    patientDateOfBirth: data.patientDateOfBirth,
    phone: data.phone,
    relation: data.relation,
    category1: data.category1,
    code1: data.code1,
    date1: data.date1,
    paid1: data.paid1,
    category2: data.category2,
    code2: data.code2,
    date2: data.date2,
    paid2: data.paid2,
    category3: data.category3,
    code3: data.code3,
    date3: data.date3,
    paid3: data.paid3,
    category4: data.category4,
    code4: data.code4,
    date4: data.date4,
    paid4: data.paid4,
    category5: data.category5,
    code5: data.code5,
    date5: data.date5,
    paid5: data.paid5,
    category6: data.category6,
    code6: data.code6,
    date6: data.date6,
    paid6: data.paid6,

    uploadedPath: uploadedPath,
  };
  let agentMessageHtml = await renderHBFile(
    `./templates/visionForm.hbs`,
    updatedData
  );

  sendMail(
    "claims@surecarebenefits.com",
    "Visionstart Claim Form",
    agentMessageHtml
  )
    .then((res) => console.log(res))
    .catch((err) => console.log(err));

  res.send({
    error: false,
    message: "Details saved.",
    data: agentMessageHtml,
  });
});
const sendContactForm = async(async (req, res) => {
  const data = req.body;
  let updatedData = {
    name: data.name,
    email: data.email,
    message: data.message,
  };
  let contactMessageHtml = await renderHBFile(
    `./templates/contactFormTemplate.hbs`,
    updatedData
  );

  sendMail("claims@surecarebenefits.com", "Contact Us Form", contactMessageHtml)
    .then((res) => console.log(res))
    .catch((err) => console.log(err));

  res.send({
    error: false,
    message: "Details saved.",
    data: contactMessageHtml,
  });
});
const sendIdentityForm = async(async (req, res) => {
  const data = req.body;
  let updatedData = {
    name: data.name,
    email: data.email,
    message: data.message,
  };
  let identityMessageHtml = await renderHBFile(
    `./templates/identityTheftTemplate.hbs`,
    updatedData
  );

  sendMail(
    "claims@surecarebenefits.com",
    "Identity Theft Form",
    identityMessageHtml
  )
    .then((res) => console.log(res))
    .catch((err) => console.log(err));

  res.send({
    error: false,
    message: "Details saved.",
    data: identityMessageHtml,
  });
});

module.exports = {
  sendMessage,
  sendContactForm,
  sendIdentityForm,
};
