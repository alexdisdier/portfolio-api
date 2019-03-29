require("dotenv").config();

module.exports = () => {
  const emailConfig = {
    apiKey: process.env.API_KEY,
    domain: process.env.DOMAIN
  };
  return emailConfig;
};
