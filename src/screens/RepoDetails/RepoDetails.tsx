import React from "react";
import { RepoDetailsProps } from "./RepoDetails.types";
import { Text, View } from "react-native";
import { Header, ListItem } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "react-native-screens/lib/typescript/native-stack/types";
import { AppStackParamList } from "../../navigation/AppStack/AppStack";

const RepoDetails: React.FC<RepoDetailsProps> = ({
  route: {
    params: { repoDetails },
  },
}) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<AppStackParamList>>();

  const repoDatailsData: Array<{ fieldTitle: string; value: string }> = [
    { fieldTitle: "Name", value: repoDetails.name },
    { fieldTitle: "Full Name", value: repoDetails.full_name },
    { fieldTitle: "Description", value: repoDetails.description ?? "-" },
    { fieldTitle: "Topics", value: repoDetails.topics.join(", ") || "-" },
    { fieldTitle: "Default Branch", value: repoDetails.default_branch },
  ];

  const repoDetailsElements = repoDatailsData.map(
    ({ fieldTitle, value }, index) => (
      <React.Fragment key={index}>
        <View style={{ padding: 10, backgroundColor: "grey" }}>
          <ListItem.Title>{fieldTitle}</ListItem.Title>
        </View>
        <View style={{ padding: 10 }}>
          <ListItem.Subtitle>{value}</ListItem.Subtitle>
        </View>
      </React.Fragment>
    )
  );

  const handleBackPress = () => {
    navigation.goBack();
  };

  return (
    <View>
      <Header
        leftComponent={{ icon: "arrow-back", onPress: handleBackPress }}
      />
      {repoDetailsElements}
    </View>
  );
};

export default RepoDetails;
