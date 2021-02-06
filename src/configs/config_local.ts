/* Config Key - Local */
const ConfigKeyLocal = {
  fw_user_uri: "mongodb://localhost:5546",
  fw_user_db_name: process.env.fw_user_db_name_dev,
  access_token_secret: "423kjifos3rwsfd",
  refresh_token_secret: "fdsfjwoejri233sfwej",
  /* Format - Day * Hour * Minute * Second */
  access_token_life: 50 * 24 * 60 * 60,
  refresh_token_life: 60 * 24 * 60 * 60
};

export default ConfigKeyLocal;
