import React from "react";
import { View } from "react-native";
import * as Progress from "react-native-progress";

function LoaderScreen() {
  return (
    <View>
      <Progress.CircleSnail color={["green"]} />
    </View>
  );
}

export default LoaderScreen;
