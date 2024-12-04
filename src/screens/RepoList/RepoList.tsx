import React, { useCallback, useMemo, useState } from "react";
import {
  FlatList,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useGetRepositories } from "../../api";
import { Header, ListItem, SearchBar, Switch } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import { AppStackParamList } from "../../navigation/AppStack/AppStack";
import { NativeStackNavigationProp } from "react-native-screens/lib/typescript/native-stack/types";
import RepoCard from "../../components/RepoCard/RepoCard";

const organizations: Array<Organization> = [
  "algorand",
  "algorandfoundation",
  "perawallet",
];

const RepoList = () => {
  const queriesResponse = useGetRepositories();

  const isRefetching = useMemo(
    () =>
      !!queriesResponse.find((queryProperties) => queryProperties.isRefetching),
    [queriesResponse]
  );

  const refetchQueries = () => {
    queriesResponse.forEach((queryProperties) => queryProperties.refetch());
  };

  const [searchInputValue, setSearchInputValue] = useState("");

  const [filtersState, setFiltersState] = useState<{
    [key in Organization]: boolean;
  }>({ algorand: true, algorandfoundation: true, perawallet: true });

  const [isFiltersSectionExpanded, setIsFiltersSectionExpanded] =
    useState(false);

  const navigation =
    useNavigation<NativeStackNavigationProp<AppStackParamList>>();

  const toggleSwitchCallback = (organization: Organization) => () => {
    setFiltersState((prevState) => ({
      ...prevState,
      [organization]: !prevState[organization],
    }));
  };

  const handleAccordionPress = () => {
    setIsFiltersSectionExpanded((prevState) => !prevState);
  };

  const allOrganizationsRepos = useMemo(
    () =>
      queriesResponse.reduce<Array<GithubRepo>>((acc, queryData) => {
        const organizationRepos = Array.isArray(queryData.data?.data)
          ? queryData.data?.data
          : [];

        return [...acc, ...organizationRepos];
      }, []),
    [queriesResponse]
  );

  const filteredOrganizationsRepos = useMemo(
    () =>
      allOrganizationsRepos.filter(
        (organization) =>
          organization.name
            .toLowerCase()
            .includes(searchInputValue.trim().toLowerCase()) &&
          !!filtersState[organization.owner.login as Organization]
      ),
    [allOrganizationsRepos]
  );

  const filterElements = organizations.map((organization, index) => (
    <View
      key={index}
      style={{
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingVertical: 5,
      }}
    >
      <Text>{`Repo: ${organization}`}</Text>
      <Switch
        value={filtersState[organization]}
        onValueChange={toggleSwitchCallback(organization)}
      />
    </View>
  ));

  const handleFavouritesPress = () => {
    navigation.navigate("Favourites");
  };

  return (
    <View style={{ flex: 1 }}>
      <Header
        rightComponent={{
          icon: "star",
          color: "#fff",
          onPress: handleFavouritesPress,
        }}
      />
      <SearchBar
        placeholder='Search your repo...'
        onChangeText={setSearchInputValue}
        autoCapitalize='none'
        value={searchInputValue}
      />
      <ListItem.Accordion
        content={
          <View style={{ flex: 1 }}>
            <Text>Filter by Organization</Text>
          </View>
        }
        isExpanded={isFiltersSectionExpanded}
        onPress={handleAccordionPress}
      >
        {filterElements}
      </ListItem.Accordion>
      <FlatList
        refreshControl={
          <RefreshControl
            refreshing={isRefetching}
            onRefresh={refetchQueries}
          />
        }
        style={{ flex: 1 }}
        data={filteredOrganizationsRepos}
        renderItem={({ item }) => <RepoCard repoData={item} />}
      />
    </View>
  );
};

export default RepoList;
