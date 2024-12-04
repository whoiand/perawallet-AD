import React, { useMemo } from "react";
import { RepoCardProps } from "./RepoCard.types";
import { Text, TouchableOpacity, View } from "react-native";
import { Card, Icon } from "@rneui/base";
import { ListItem } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "react-native-screens/lib/typescript/native-stack/types";
import { AppStackParamList } from "../../navigation/AppStack/AppStack";
import { useStore } from "../../store";

type BooleanProperties = {
  isPositive: boolean;
  propertyTitle: string;
};

const RepoCard: React.FC<RepoCardProps> = ({ repoData }) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<AppStackParamList>>();

  const { addFavouriteRepo, removeFavouriteRepo, favouriteRepos } = useStore();

  const handleCardPressCallback = (repository: GithubRepo) => () => {
    navigation.navigate("RepoDetails", { repoDetails: repository });
  };

  const booleanPropertyElement = ({
    isPositive,
    propertyTitle,
  }: BooleanProperties) => {
    return (
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text>{propertyTitle}: </Text>
        <Icon
          name={`${isPositive ? "checkmark" : "close"}-circle-outline`}
          type='ionicon'
          color={isPositive ? "green" : "red"}
        />
      </View>
    );
  };

  const isFavourite = useMemo(
    () => !!favouriteRepos.find(({ id }) => repoData.id === id),
    [favouriteRepos]
  );

  const getBooleanPropertiesData = (
    repoData: GithubRepo
  ): Array<BooleanProperties> => [
    {
      isPositive: repoData.archived,
      propertyTitle: "Archived",
    },
    {
      isPositive: repoData.disabled,
      propertyTitle: "Disabled",
    },
    {
      isPositive: repoData.private,
      propertyTitle: "Private",
    },
  ];

  const handleStarPress = () => {
    if (isFavourite) {
      removeFavouriteRepo(repoData.id);

      return;
    }

    addFavouriteRepo(repoData);
  };

  return (
    <TouchableOpacity onPress={handleCardPressCallback(repoData)}>
      <Card containerStyle={{ borderRadius: 20 }}>
        <Card.Title>{`${repoData.name}`}</Card.Title>
        <Card.Divider />
        <Card.Title>{`Organization: ${repoData.owner.login}`}</Card.Title>
        <Card.Divider />
        <ListItem.Content>
          {getBooleanPropertiesData(repoData).map(
            ({ isPositive, propertyTitle }) =>
              booleanPropertyElement({
                isPositive,
                propertyTitle,
              })
          )}
        </ListItem.Content>
        <Card.Divider />
        <TouchableOpacity onPress={handleStarPress}>
          <Icon name='star' color={isFavourite ? "gold" : "black"} />
        </TouchableOpacity>
      </Card>
    </TouchableOpacity>
  );
};

export default RepoCard;
