import { FontAwesome } from "@expo/vector-icons";
import { View, StyleSheet, Text } from "react-native";
import { ProfileScreenData } from "./ScreenData";
import { colors } from "../global/styles";
import { ScrollView } from "react-native";
import { TouchableOpacity } from "react-native";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import AsyncStorageLib from "@react-native-async-storage/async-storage";
import { NativeModules } from "react-native"

function Profile({ navigation }) {
  const Logout = async () => {
    await signOut(auth);
    await AsyncStorageLib.removeItem("token");
    NativeModules.DevSettings.reload();
  };
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.tab}>
          {ProfileScreenData.firstTab.map((e, index) => {
            const { name, right } = e;
            return (
              <View
                key={index}
                style={[
                  styles.row,
                  index !== ProfileScreenData.firstTab.length - 1
                    ? styles.m2
                    : null,
                ]}
              >
                <Text>{name}</Text>
                <Text style={{ marginLeft: "auto", fontWeight: "bold" }}>
                  {right !== undefined ? (
                    right
                  ) : (
                    <FontAwesome
                      name="long-arrow-right"
                      size={20}
                      color={colors.grey2}
                      style={{ padding: 10 }}
                    />
                  )}
                </Text>
              </View>
            );
          })}
        </View>
        <View style={styles.tab}>
          {ProfileScreenData.canterTab.map((e, index) => {
            const { name, right } = e;
            return (
              <View
                key={index}
                style={[
                  styles.row,
                  index !== ProfileScreenData.canterTab.length - 1
                    ? styles.m2
                    : null,
                ]}
              >
                <Text style={{ width: "70%" }}>{name}</Text>
                <Text style={{ marginLeft: "auto", fontWeight: "bold" }}>
                  <FontAwesome
                    name="long-arrow-right"
                    size={20}
                    color={colors.grey2}
                    style={{ padding: 10 }}
                  />
                </Text>
              </View>
            );
          })}
        </View>
      </ScrollView>
      <View style={[styles.row, { padding: 20, backgroundColor: "white" }]}>
        <TouchableOpacity
          onPress={Logout}
          style={{flex: 1, flexDirection: "row", justifyContent: "space-between" }}
        >
          <Text>Logout</Text>

          <Text style={{ fontWeight: "bold" }}>
            <FontAwesome
              name="sign-out"
              size={20}
              color={colors.grey2}
              style={{ padding: 10 }}
            />
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Profile;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#bdc6cf",
  },
  contain: {
    width: "90%",
    marginLeft: "5%",
    marginRight: "5%",
  },
  m2: {
    marginBottom: 20,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  tab: {
    backgroundColor: "white",
    padding: 20,
    marginBottom: 10,
  },
});
