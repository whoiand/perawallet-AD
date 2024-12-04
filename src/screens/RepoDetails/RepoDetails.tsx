import React from "react";
import { RepoDetailsProps } from "./RepoDetails.types";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, View } from "react-native";

const RepoDetails: React.FC<RepoDetailsProps> = ({
  route: {
    params: { repoDetails },
  },
}) => {
  const repoDatailsData: Array<{ fieldTitle: string; value: string }> = [
    { fieldTitle: "Name", value: repoDetails.name },
    { fieldTitle: "Full Name", value: repoDetails.full_name },
    { fieldTitle: "Description", value: repoDetails.description ?? "-" },
    { fieldTitle: "Topics", value: repoDetails.topics.join(", ") },
    { fieldTitle: "Default Branch", value: repoDetails.default_branch },
  ];

  const repoDetailsElements = repoDatailsData.map(({ fieldTitle, value }) => (
    <Text>{`${fieldTitle}: ${value}`}</Text>
  ));

  return <SafeAreaView>{repoDetailsElements}</SafeAreaView>;
};

export default RepoDetails;
