import React from "react";
import PropTypes from "prop-types";
import { AxiosContext } from "../context/AxiosContext";
import { useContext } from "react";

const ConfigurationContext = React.createContext({});

export const ConfigurationProvider = (props) => {
  const { usePublicAxios } = useContext(AxiosContext);
  const { loading, data, error } = usePublicAxios("configuration", "get");
  const configuration =
    loading || error || !data
      ? { currency: "", currencySymbol: "", deliveryCharges: 0 }
      : data.configuration;
  return (
    <ConfigurationContext.Provider value={configuration}>
      {props.children}
    </ConfigurationContext.Provider>
  );
};

ConfigurationProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const ConfigurationConsumer = ConfigurationContext.Consumer;
export default ConfigurationContext;
