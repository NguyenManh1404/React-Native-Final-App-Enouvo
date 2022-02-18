import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import FeatureItem from '../../components/FeatureItem';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { changeData, changeDetail } from '../../global/actions/centreData';
import { getDatabase, onValue, ref } from 'firebase/database';

const Features = (props) => {
  const { detail: value } = props;
  const id = value.detail;
  const [dataDetail, setDataDetail] = useState(null);
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    try {
      const db = getDatabase();
      const reference = await ref(db, `Centres/${id}`);
      onValue(reference, (snapshot) => {
        setDataDetail(snapshot.val());
      });
    } catch (error) {}
  };
  const featureList = dataDetail ? dataDetail.features : null;
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        {dataDetail ? (
          <FlatList
            data={featureList}
            renderItem={({ item, index }) => (
              <FeatureItem index={index} idCentre={id} data={item} />
            )}
            keyExtractor={(item) => item.id}
          />
        ) : (
          <Text>Loading ...</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: '#E5E5E5',
  },
  card: {
    borderRadius: 12,
    backgroundColor: '#fff',
    padding: 16,
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
export default connect(mapStateToProps, mapDispatchToProps)(Features);
