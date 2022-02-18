import { useEffect, useState } from 'react';
import { Image } from 'react-native';
import { View, StyleSheet, Text } from 'react-native';
import React from 'react';
import { ScrollView } from 'react-native';
import AnimatedLoader from 'react-native-animated-loader';
import CentresHeader from '../components/CentresHeader';
import Searchbar from '../components/SearchBar';
import CardCentre from '../components/cards/CardCentre';
import CardTotal from '../components/cards/CardTotal';
import { TouchableNativeFeedback } from 'react-native';
import Line from '../components/Line';
import FilterRow from '../components/FilterRow';
import BottomModal from '../components/BottomModal';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { changeData, changeDetail } from '../global/actions/centreData';
function CentreScreen(props) {
  const { changeDetailCentre } = props.actions;
  const { navigation } = props;
  const [filterData, setFilterData] = useState(null);
  const [data, setData] = useState(null);
  const [valueName, setValueName] = useState('');
  const [valueCentre, setValueCentre] = useState('');
  const [visible, setVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [checked, setChecked] = React.useState('All Centre');
  const toggleBottomNavigationView = () => {
    setModalVisible(!modalVisible);
  };

  const updateSearchName = (value) => {
    setValueName(value);
  };
  const updateSearchCentre = (value) => {
    setValueCentre(value);
  };
  useEffect(async () => {
    setVisible(true);
    setTimeout(() => {
      const { data: value } = props;
      setData(value.data);
    }, 1000);
    setVisible(false);
  }, [navigation]);

  const setFilter = (value) => {
    setModalVisible(false);
    if (value == 'All Centre') {
      setFilterData(null);
    } else {
      setFilterData(value);
    }
  };
  return (
    <View style={styles.container}>
      <AnimatedLoader
        visible={visible}
        overlayColor="rgba(255,255,255,0.75)"
        animationStyle={styles.lottie}
        speed={1}
      ></AnimatedLoader>
      <CentresHeader
        onFilterPress={() => setModalVisible(true)}
        navigation={navigation}
      />
      <View style={styles.totalSlide}>
        <ScrollView
          horizontal
          contentContainerStyle={{
            height: 110,
          }}
          showsHorizontalScrollIndicator={false}
        >
          <CardTotal
            title="Total centres"
            icon="store"
            number={data ? data.length : 0}
          />
          <CardTotal
            title="Total centres"
            icon="store"
            number={data ? data.length : 0}
          />
          <CardTotal
            title="Total centres"
            icon="store"
            number={data ? data.length : 0}
          />
          <CardTotal
            title="Total centres"
            icon="store"
            number={data ? data.length : 0}
          />
        </ScrollView>
      </View>
      <View style={[styles.row, styles.contain]}>
        <Searchbar
          value={valueCentre}
          updateSearch={updateSearchCentre}
          textSearch="Search Centre name"
          style={styles.search}
        />

        <View style={styles.imageView}>
          <Image
            style={{
              width: 30,
            }}
            source={require('../../assets/ic-filter.png')}
          />
        </View>
      </View>
      <Line height={5} />
      <ScrollView contentContainerStyle={styles.contain}>
        {data &&
          filterData == null &&
          data.map((e, index) => {
            if (e.sumary.name.indexOf(valueCentre) > -1)
              return (
                <TouchableNativeFeedback
                  key={index}
                  onPress={async () => {
                    await changeDetailCentre(index);

                    navigation.navigate('CentreDetail');
                  }}
                >
                  <View key={index} style={{ width: '100%' }}>
                    <CardCentre data={e} key={index} />
                  </View>
                </TouchableNativeFeedback>
              );
            if (index == data.length - 1) return <Text>No data found</Text>;
          })}
        {filterData && (
          <TouchableNativeFeedback
            onPress={async () => {
              await changeDetailCentre(filterData.id - 1);
              navigation.navigate('CentreDetail');
            }}
          >
            <View style={{ width: '100%' }}>
              <CardCentre data={filterData} />
            </View>
          </TouchableNativeFeedback>
        )}
      </ScrollView>
      <BottomModal
        visible={modalVisible}
        onBackButtonPress={toggleBottomNavigationView}
        onBackdropPress={toggleBottomNavigationView}
        title="Select Centre"
      >
        <Searchbar
          style={styles.searchbar}
          textSearch="Search centre name"
          updateSearch={updateSearchName}
          value={valueName}
        />

        <ScrollView contentContainerStyle={{ paddingBottom: 60 }}>
          <FilterRow
            image="https://www.goodstart.org.au/getattachment/88459773-12e8-4f2b-918f-a71f11c3e4b2/;.aspx;.jpg"
            checked={checked}
            setChecked={setChecked}
            setFilter={setFilter}
            name="All Centre"
          />
          {data &&
            data.map((e, index) => {
              const { name, image } = e.sumary;
              if (name.indexOf(valueName) > -1)
                return (
                  <FilterRow
                    image={image}
                    checked={checked}
                    setChecked={setChecked}
                    setFilter={setFilter}
                    name={name}
                    key={index}
                    data={e}
                  />
                );
            })}
        </ScrollView>
      </BottomModal>
    </View>
  );
}
const mapStateToProps = (state) => ({
  data: state.data,
  detail: state.detail,
});

const ActionCreators = Object.assign({
  changeDetailCentre: changeDetail,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(ActionCreators, dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(CentreScreen);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#bdc6cf',
    alignItems: 'center',
    marginTop: 20,
  },
  lottie: {
    width: 100,
    height: 100,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  totalSlide: {
    height: 110,
    marginTop: -40,
    marginBottom: 20,
  },
  contain: {
    width: '94%',
    paddingBottom: 10,
  },
  line: {
    marginTop: 30,
  },
  searchbar: {
    borderWidth: 2,
    borderColor: '#D3CCCC',
    borderRadius: 8,
  },
  search: {
    flex: 2,
    marginRight: 10,
  },
  imageView: {
    backgroundColor: 'white',
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
  },
});
