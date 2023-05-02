import { useNavigation } from "@react-navigation/native";
import React, { useContext, useLayoutEffect } from "react";
import { FlatList, View } from "react-native";
import EmptyFood from "../../assets/images/SVG/imageComponents/EmptyFood";
import { AxiosContext } from "../../context/AxiosContext";
import {
  MenuCard,
  Spinner,
  StatusCard,
  TextDefault,
  TextError,
  WrapperView,
} from "../../components";
import UserContext from "../../context/User";
import { alignment } from "../../utils/alignment";
import { NAVIGATION_SCREEN } from "../../utils/constant";
import { scale } from "../../utils/scaling";
import useStyle from "./styles";
// constants

function Menu() {
  const styles = useStyle();
  const navigation = useNavigation();
  const { usePublicAxios } = useContext(AxiosContext);
  const { isLoggedIn, profile } = useContext(UserContext);
  let { data, loading, error } = usePublicAxios("recipeCategories", "get");

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Home",
    });
  }, []);

  function emptyView() {
    if (loading) {
      return <Spinner />;
    } else if (error) {
      return (
        <TextError
          text={error ? error.message : "No Foods"}
          backColor="transparent"
        />
      );
    } else {
      return (
        <View style={styles.emptyContainer}>
          <EmptyFood width={scale(250)} height={scale(250)} />
          <TextDefault H4 bold style={alignment.MTlarge}>
            No item found
          </TextDefault>
        </View>
      );
    }
  }

  return (
    <WrapperView>
      <View style={[styles.flex, styles.mainContentContainer]}>
        <FlatList
          style={styles.flex}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => String(index)}
          ListEmptyComponent={emptyView()}
          data={loading ? [] : error ? [] : data}
          ListHeaderComponent={() => {
            if (!error && !loading) {
              return (
                <>
                  {isLoggedIn && profile && <StatusCard />}

                  <TextDefault style={alignment.Psmall} H4 medium>
                    Featured
                  </TextDefault>
                </>
              );
            }
            return null;
          }}
          renderItem={({ item }) => (
            <View key={item.id} style={styles.cardViewContainer}>
              <MenuCard
                onPress={() =>
                  navigation.navigate(NAVIGATION_SCREEN.MenuItems, {
                    ...item,
                  })
                }
                title={item.name}
                description={item.description}
                image={item.imageUrl || ""}
              />
            </View>
          )}
        />
      </View>
    </WrapperView>
  );
}

export default React.memo(Menu);
