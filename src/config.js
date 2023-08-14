import yn from "yn";

const config = {
  serverUrl: process.env.REACT_APP_SERVER_URL,
  featureToggles: {
    conversations: yn(process.env.REACT_APP_FEATURE_TOGGLE_CONVERSATION),
  },
};

export default config;
