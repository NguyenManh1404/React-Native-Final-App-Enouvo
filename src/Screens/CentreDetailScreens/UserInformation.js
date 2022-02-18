import { getDatabase, onValue, ref } from 'firebase/database';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { changeData, changeDetail } from '../../global/actions/centreData';

const UserInformation = (props) => {
  const [dataDetail, setDataDetail] = useState(null);
  const { detail: value } = props;
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
  const { description } = dataDetail ? dataDetail['centre-information'] : {};
  const { LGA, rigion, admin_email } = dataDetail
    ? dataDetail['centre-information'].additional_details
    : {};
  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Centre Description</Text>

        <View style={styles.line} />

        <Text style={styles.text}>
          <Text numberOfLines={3}>
            {description}
            {''}{' '}
          </Text>
          <Text style={[styles.text, styles.seeMoreText]}>See More</Text>
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.title}>Additional Details</Text>

        <View style={styles.line} />

        <View style={styles.row}>
          <Text style={[styles.text, styles.label]}>Admin Email</Text>
          <Text style={[styles.text, styles.detailText]}>{admin_email}</Text>
        </View>

        <View style={styles.row}>
          <Text style={[styles.text, styles.label]}>Region</Text>
          <Text style={[styles.text, styles.detailText]}>{rigion}</Text>
        </View>

        <View style={styles.row}>
          <Text style={[styles.text, styles.label]}>LGA</Text>
          <Text style={[styles.text, styles.detailText]}>{LGA}</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    backgroundColor: '#E5E5E5',
  },
  row: {
    flexDirection: 'row',
    alignContent: 'stretch',
    marginVertical: 5,
    alignItems: 'stretch',
  },
  label: {
    width: '40%',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    borderColor: '#F2F0F0',
    borderWidth: 1,
    padding: 10,
    marginVertical: 10,
  },
  title: {
    color: '#2D1F21',
    fontSize: 16,
    fontWeight: '700',
    marginVertical: 5,
  },
  seeMoreText: {
    color: '#DB147F',
    fontWeight: '700',
  },
  line: {
    height: 1,
    width: '100%',
    backgroundColor: '#F2F0F0',
    marginVertical: 10,
  },
  text: {
    color: '#171725',
    fontSize: 14,
    lineHeight: 24,
    fontWeight: '400',
  },
  detailText: {
    color: '#2D1F21',
    fontWeight: '700',
    width: '60%',
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
export default connect(mapStateToProps, mapDispatchToProps)(UserInformation);
