import React from "react";
import { FlatList, View } from "react-native";
import { Header } from "@rneui/themed";
import { useStore } from "../../store";
import RepoCard from "../../components/RepoCard/RepoCard";

const Favourites = () => {
  const { favouriteRepos } = useStore();

  return (
    <View>
      <Header centerComponent={{ text: "Favourites" }} />
      <FlatList
        data={favouriteRepos}
        renderItem={({ item }) => <RepoCard repoData={item} />}
      />
    </View>
  );
};

export default Favourites;
