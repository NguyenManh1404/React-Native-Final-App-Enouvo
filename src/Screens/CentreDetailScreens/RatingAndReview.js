import React, { useEffect, useState } from "react";
import { Image, StyleSheet } from "react-native";
import { ScrollView } from "react-native";
import { Text } from "react-native";
import { View } from "react-native";
import Btn from "../../components/Button";
import CardComment from "../../components/cards/CardComment";
import { Rating } from "react-native-ratings";
import CarDropdown from "../../components/cards/CarDropdown";
import Line from "../../components/Line";
import { changeData, changeDetail } from "../../global/actions/centreData";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { getDatabase, onValue, ref } from "firebase/database";
function RatingAndReview(props) {
  const [dataRating, setDataRating] = useState(null);
  const { detail: value } = props;
  const id = value.detail;

  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    try {
      const db = getDatabase();
      const reference = await ref(db, `evaluate`);
      onValue(reference, (snapshot) => {
        setDataRating(snapshot.val());
      });
    } catch (error) {}
  };
  return (
    <View>
      <ScrollView>
        <CarDropdown
          titleIcon={
            <Image
              style={{ width: 39, height: 39 }}
              source={require("../../../assets/kindicare.png")}
            />
          }
          mainTitle="Kindicare Rating"
          imageDisnabel={false}
          subTitle="Very good"
        >
          <Btn
            text="8.4"
            textStyle={{
              fontSize: 20,
              fontWeight: "bold",
              color: "white",
            }}
            style={styles.btn}
          />
          <Text style={styles.feed}>Very good</Text>

          {/* score rating bar */}
          <View
            style={{
              width: "45%",
              alignSelf: "flex-start",
              alignItems: "flex-end",
            }}
          >
            <Text style={[styles.score, { color: "#DB147F" }]}>8.4</Text>
          </View>
          <View style={[styles.scoreBar]}>
            <View style={[styles.serviceBar, { width: "45%" }]}>
              <View style={styles.circle}></View>
            </View>
            <View style={[styles.averageBar, { width: "70%" }]}>
              <View style={styles.circle}></View>
            </View>
          </View>

          <View style={{ width: "100%" }}>
            <View
              style={[
                styles.row,
                { width: "100%", justifyContent: "space-between" },
              ]}
            >
              <Text style={styles.score}>7.9</Text>
              <Text style={styles.score}>9.3</Text>
            </View>
            <View
              style={{
                width: "70%",
                alignSelf: "flex-start",
                alignItems: "flex-end",
                position: "absolute",
              }}
            >
              <Text style={[styles.score, { color: "#32A4FC" }]}>8.6</Text>
            </View>
          </View>

          {/* end score rating bar */}

          <View style={styles.row}>
            <View style={[styles.item, styles.row]}>
              <View
                style={[
                  {
                    backgroundColor: "#32A4FC",
                  },
                  styles.dot,
                ]}
              />
              <Text style={{ fontSize: 15 }}>Average</Text>
            </View>
            <View style={[styles.item, styles.row]}>
              <View
                style={[
                  {
                    backgroundColor: "#DB147F",
                  },
                  styles.dot,
                ]}
              />
              <Text style={{ fontSize: 15 }}>This Service</Text>
            </View>
          </View>
          <Text
            style={{
              fontSize: 17,
              textAlign: "center",
              lineHeight: 30,
              marginTop: 20,
            }}
          >
            The KindiCare Rating for this service of 8.4 is lower than the
            average KindiCare Rating for the area of 8.6, and represents the
            good quality of service provided
          </Text>
        </CarDropdown>
        <CarDropdown
          mainTitle="User Reviews"
          imageDisnabel={true}
          titleIcon={
            <View>
              <Rating
                type="custom"
                ratingCount={1}
                startingValue={1}
                imageSize={39}
                readonly={true}
                ratingColor="#DB147F"
                tintColor="white"
              />
            </View>
          }
          subTitle="4.5/5"
          onPress={() => setRating(rating == "flex" ? "none" : "flex")}
        >
          {dataRating &&
            dataRating.map((e) => {
              if (e.centre_id == id + 1) {
                const { comment, date, email, star, type } = e;
                const listImage = e["list-image"];
                return (
                  <CardComment
                    image={
                      <Image
                        style={styles.image}
                        source={{
                          uri: "https://mayanhxachtaynhat.com/wp-content/uploads/2019/12/N%C3%AAn-t%E1%BA%ADp-trung-v%C3%A0o-%C3%A1nh-m%E1%BA%AFt-m%E1%BA%ABu.jpg",
                        }}
                      />
                    }
                    name={email}
                    subTitle={type}
                    date={date}
                    comment={comment}
                    listImage={listImage}
                    starCounts={star}
                  />
                );
              }
            })}
        </CarDropdown>
        <CarDropdown
          mainTitle="NQS Rating"
          imageDisnabel={true}
          titleIcon={
            <Image
              style={styles.icon}
              source={{
                uri: "https://www.esb.sa.gov.au/sites/default/files/news-images/exceeding_72_rgb.jpg",
              }}
            />
          }
          subTitle="Last reviewed 21 September 2017"
          onPress={() => setRating(rating == "flex" ? "none" : "flex")}
        >
          <Image
            style={styles.imageRow}
            source={{
              uri: "https://www.esb.sa.gov.au/sites/default/files/news-images/exceeding_72_rgb.jpg",
            }}
          />
          <Text>Last Reviewed 01 December 2019</Text>
          <Line height={20} />
          <View style={styles.row}>
            <Text style={styles.txt}>1. Education program and practice</Text>
            <Text style={styles.txtCl}>Exceeding NQS</Text>
          </View>
        </CarDropdown>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    backgroundColor: "white",
    borderWidth: 0,
  },
  cardTitle: {
    flexDirection: "row",
    alignItems: "center",
  },
  btn: {
    width: 60,
    height: 60,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#DB147F",
  },
  row: {
    flexDirection: "row",
  },
  feed: {
    fontSize: 25,
    fontWeight: "bold",
    padding: 20,
  },
  item: {
    width: "50%",
    alignItems: "center",
  },
  dot: {
    width: 14,
    height: 14,
    marginRight: 10,
    borderRadius: 3,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  icon: {
    width: 39,
    height: 39,
  },
  imageRow: {
    width: 110,
    height: 74,
  },
  txt: {
    width: "70%",
    fontSize: 17,
  },
  txtCl: {
    fontSize: 17,
    color: "#FB8429",
  },
  scoreBar: {
    borderRadius: 6,
    height: 10,
    width: "100%",
    backgroundColor: "#F2F2F2",
    marginVertical: 5,
  },
  score: {
    fontWeight: "400",
    fontSize: 12,
    lineHeight: 17,
    color: "#857E7F",
  },
  circle: {
    backgroundColor: "#fff",
    width: 8,
    height: 8,
    borderRadius: 50,
    margin: 1,
  },
  averageBar: {
    borderRadius: 6,
    height: 10,
    backgroundColor: "#32A4FC",
    position: "absolute",
    zIndex: 1,
    justifyContent: "center",
    alignItems: "flex-end",
  },
  serviceBar: {
    borderRadius: 6,
    height: 10,
    backgroundColor: "#DB147F",
    position: "absolute",
    zIndex: 2,
    justifyContent: "center",
    alignItems: "flex-end",
  },
});
const mapStateToProps = (state) => ({
  data: state.data,
  detail: state.detail,
});

const ActionCreators = Object.assign({
  changeData: changeData,
  changeDetailCentre: changeDetail,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(ActionCreators, dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(RatingAndReview);
