/* Config Key - Main */
import ConfigKeyLocal from "./config_local";

let ConfigKey: any;
if (process.env.NODE_ENV === "development") {
  ConfigKey = ConfigKeyLocal;
} else {
  ConfigKey = ConfigKeyLocal;
}

export default ConfigKey;
