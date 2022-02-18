import { getDatabase, onValue, ref } from 'firebase/database';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import HourCard from '../../components/HourCard';
import { changeData, changeDetail } from '../../global/actions/centreData';

const Hours = (props) => {
  const [normal, setNormal] = useState({
    type: 'mon-fri',
    data: null,
  });
  const [term, setTerm] = useState({
    type: 'mon-fri',
    data: null,
  });
  const [holiday, setHoliday] = useState({
    type: 'mon-fri',
    data: null,
  });
  const { detail: value } = props;
  const id = value.detail;
  const [dataDetail, setDataDetail] = useState(null);
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    try {
      const db = getDatabase();
      const reference = await ref(db, `Centres/${id}/hours`);
      onValue(reference, (snapshot) => {
        setDataDetail(snapshot.val());
        setHoliday({
          type: 'mon-fri',
          data: snapshot.val()['school-holidays']['mon-fri'],
        });
        setTerm({
          type: 'mon-fri',
          data: snapshot.val()['scholl-term']['mon-fri'],
        });
        setNormal({
          type: 'mon-fri',
          data: snapshot.val().normal['mon-fri'],
        });
      });
    } catch (error) {}
  };
  const setTypeHour = (type, typeHour) => {
    if (type == 'normal') {
      setNormal({
        type: typeHour,
        data: dataDetail.normal[typeHour],
      });
    }
    if (type == 'term') {
      setTerm({
        type: typeHour,
        data: dataDetail['scholl-term'][typeHour],
      });
    }
    if (type == 'holiday') {
      setHoliday({
        type: typeHour,
        data: dataDetail['school-holidays'][typeHour],
      });
    }
  };
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Normal</Text>
      <HourCard
        type={normal.type}
        setType={setTypeHour}
        typeHour="normal"
        data={normal.data}
      />
      <Text style={styles.title}>School Term</Text>
      <HourCard
        type={term.type}
        setType={setTypeHour}
        typeHour="term"
        data={term.data}
      />
      <Text style={styles.title}>School Holidays</Text>
      <HourCard
        type={holiday.type}
        setType={setTypeHour}
        typeHour="holiday"
        data={holiday.data}
      />
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 5,
    paddingHorizontal: 20,
    backgroundColor: '#E5E5E5',
  },
  title: {
    color: '#2D1F21',
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 24,
    marginVertical: 5,
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
export default connect(mapStateToProps, mapDispatchToProps)(Hours);
