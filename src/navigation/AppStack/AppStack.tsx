import { createStackNavigator } from "@react-navigation/stack";
import RepoDetails from "../../screens/RepoDetails/RepoDetails";
import { RepoList } from "../../screens/RepoList";
import Favourites from "../../screens/Favourites/Favourites";

export type AppStackParamList = {
  RepoList: {};
  RepoDetails: {
    repoDetails: GithubRepo;
  };
  Favourites: {};
};

const Stack = createStackNavigator<AppStackParamList>();

const AppStack = () => {
  return (
    <Stack.Navigator
      initialRouteName='RepoList'
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen component={RepoList} name='RepoList' />
      <Stack.Screen component={RepoDetails} name='RepoDetails' />
      <Stack.Screen component={Favourites} name='Favourites' />
    </Stack.Navigator>
  );
};

export default AppStack;
