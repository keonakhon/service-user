/* Config Key - Development */
const mongo_host1 = process.env.fw_user_host1_uri_dev;
const mongo_username = process.env.fw_user_username_dev;
const mongo_password = process.env.fw_user_password_dev;

const ConfigKeyDev = {
  fw_user_uri: `mongodb+srv://${mongo_username}:${mongo_password}@${mongo_host1}`,
  fw_user_db_name: process.env.fw_user_db_name_dev,
  access_token_secret: "423kjifos3rwsfd",
  refresh_token_secret: "fdsfjwoejri233sfwej",
  /* Format - Day * Hour * Minute * Second */
  access_token_life: 50 * 24 * 60 * 60,
  refresh_token_life: 60 * 24 * 60 * 60
};

export default ConfigKeyDev;
