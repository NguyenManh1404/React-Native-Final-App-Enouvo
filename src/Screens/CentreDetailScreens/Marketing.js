import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native';
import { View } from 'react-native';
import { Card, withBadge } from 'react-native-elements';
import Line from '../../components/Line';
import SwitchToggle from 'react-native-switch-toggle';
import { TouchableOpacity } from 'react-native';
import ModalBottom from '../../components/ModalBottom';
import { changeData, changeDetail } from '../../global/actions/centreData';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getDatabase, onValue, ref, update } from 'firebase/database';
function Marketing(props) {
  const { detail: value } = props;
  const id = value.detail;
  const [dataDetail, setDataDetail] = useState(null);
  const [isEnabled, setIsEnabled] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const toggleSwitch = async (index, status) => {
    const url = `Centres/${id}/marketing/${index}`;
    const db = getDatabase();
    const reference = await ref(db, url);
    update(reference, {
      status: status == 'on' ? 'off' : 'on',
    });
  };
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    try {
      const db = getDatabase();
      const reference = await ref(db, `Centres/${id}/marketing`);
      onValue(reference, (snapshot) => {
        setDataDetail(snapshot.val());
      });
    } catch (error) {}
  };
  return (
    <View>
      {dataDetail &&
        dataDetail.map((e, index) => {
          const { name, price, status, description } = e;
          return (
            <Card containerStyle={{ borderRadius: 10 }}>
              <View style={styles.cardTitile}>
                <View style={{ justifyContent: 'center' }}>
                  <View style={styles.row}>
                    <Text style={styles.txtName}>{name}</Text>
                    <TouchableOpacity
                      style={styles.bageIcon}
                      onPress={() => setModalVisible(true)}
                    >
                      <Text style={{ marginTop: -4 }}>i</Text>
                    </TouchableOpacity>
                  </View>

                  <Line height={10} />
                  <Text>
                    <Text style={styles.txtPrice}>${price}</Text>
                    /Per month
                  </Text>
                </View>
                <SwitchToggle
                  switchOn={status == 'on' ? true : false}
                  onPress={() => toggleSwitch(index, status)}
                  containerStyle={styles.swContainerStyle}
                  circleStyle={styles.swCircleStyle}
                  rightContainerStyle={{ margin: 10 }}
                  circleColorOff="white"
                  circleColorOn="white"
                  backgroundColorOn="#DB147F"
                />
              </View>
            </Card>
          );
        })}

      <ModalBottom
        setModalVisible={setModalVisible}
        modalVisible={modalVisible}
        title="Featured Listing"
        closeRightIcon={true}
        height={200}
      >
        <Text style={{ fontSize: 17 }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Commodo erat
          tempor scelerisque sit adipiscing velit. Commodo erat tempor
          scelerisque sit adipiscing velit.
        </Text>
      </ModalBottom>
    </View>
  );
}
const styles = StyleSheet.create({
  card: {
    padding: 20,
  },
  cardTitile: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // marginBottom: 15,
  },
  row: {
    flexDirection: 'row',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 17,
  },
  txtEdit: {
    textAlign: 'center',
    color: '#ffffff',
    fontWeight: 'bold',
  },
  txtDele: {
    textAlign: 'center',
    color: '#CCCCCC',
    fontWeight: 'bold',
  },
  line: {
    marginTop: 10,
  },
  cardContent: {
    alignItems: 'center',
    width: '100%',
  },
  swContainerStyle: {
    width: 35,
    height: 20,
    borderRadius: 25,
    padding: 2,
  },
  swCircleStyle: {
    width: 17,
    height: 17,
    borderRadius: 12,
    backgroundColor: 'white',
  },
  bageIcon: {
    backgroundColor: '#857E7F',
    width: 14,
    height: 14,
    borderRadius: 7,
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: 2,
  },
  txtPrice: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  txtName: {
    fontSize: 17,
    fontWeight: 'bold',
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
export default connect(mapStateToProps, mapDispatchToProps)(Marketing);
