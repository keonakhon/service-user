/* Config Key - Main */
import ConfigKeyLocal from "./config_local";
import ConfigKeyDev from "./config_dev";

let ConfigKey: any;
if (process.env.NODE_ENV === "production") {
  ConfigKey = ConfigKeyDev;
} else if (process.env.NODE_ENV === "development") {
  ConfigKey = ConfigKeyDev;
} else {
  ConfigKey = ConfigKeyLocal;
}

export default ConfigKey;
