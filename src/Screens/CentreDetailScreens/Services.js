import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';

import ServiceCard from '../../components/ServiceCard';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { changeData, changeDetail } from '../../global/actions/centreData';
import { getDatabase, onValue, ref } from 'firebase/database';
const Services = (props) => {
  const { detail: value } = props;
  const [dataDetail, setDataDetail] = useState(null);
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    const id = value.detail;
    try {
      const db = getDatabase();
      const reference = await ref(db, `Centres/${id}`);
      onValue(reference, (snapshot) => {
        setDataDetail(snapshot.val());
      });
    } catch (error) {}
  };
  const serviceList = dataDetail ? dataDetail.services : null;
  return (
    <View style={styles.container}>
      {dataDetail ? (
        <FlatList
          data={serviceList}
          renderItem={({ item, index }) => (
            <ServiceCard key={index} data={item} />
          )}
          keyExtractor={(item) => item.id}
        />
      ) : (
        <Text>Loading ...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 5,
    paddingHorizontal: 20,
    backgroundColor: '#E5E5E5',
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
export default connect(mapStateToProps, mapDispatchToProps)(Services);
