import Reactotron from "reactotron-react-native";

if (__DEV__) {
  const tron = Reactotron.configure({ host: "knowledgesoftware.kinghost.net:21046" })
    .useReactNative()
    .connect();

  console.tron = tron;

  tron.clear();
}
