/* Config Key - Main */
import ConfigKeyLocal from "./configs_local";

let ConfigKey: any;
if (process.env.NODE_ENV === "development") {
  ConfigKey = ConfigKeyLocal;
} else {
  ConfigKey = ConfigKeyLocal;
}

export default ConfigKey;
