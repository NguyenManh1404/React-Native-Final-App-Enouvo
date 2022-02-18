import { View, StatusBar, StyleSheet, Text, ScrollView } from 'react-native';
import {
  Foundation,
  Entypo,
  Fontisto,
  MaterialIcons,
  Ionicons,
} from '@expo/vector-icons';
import ItemDashboard from '../components/ItemDashboard';
import { TouchableOpacity } from 'react-native';
function Home() {
  return (
    <View style={styles.container}>
      <StatusBar
        translucent
        barStyle="light-content"
        backgroundColor="#DB147F"
      />
      <View style={styles.header}>
        <View style={styles.viewIn}>
          <View style={styles.viewLeft}>
            <Entypo name="shop" size={24} color="white" />
            <TouchableOpacity style={styles.dropView}>
              <Text style={styles.txtHeader}>Goodstart Early Learning ABC</Text>
              <MaterialIcons
                name="keyboard-arrow-down"
                size={24}
                color="white"
              />
            </TouchableOpacity>
          </View>
          <Ionicons name="notifications-outline" size={24} color="white" />
          <View style={styles.numberView}>
            <Text style={styles.numberText}>5</Text>
          </View>
        </View>
      </View>
      <ScrollView style={styles.itemView}>
        <ItemDashboard
          title={'Applications'}
          numberTitle={17}
          itemContentDetailTitle1={'Open Application Value'}
          itemContentDetailNumber1={'116,688,8'}
          itemContentDetailTitle2={'Total Waitlisted'}
          itemContentDetailNumber2={'3'}
          itemContentDetailTitle3={'Waitlist Value'}
          itemContentDetailNumber3={'$29,749 p.a'}
          numberTitleColor={'#FB8429'}
          icon={<Foundation name="page" size={16} color="#FB8429" />}
        />
        <ItemDashboard
          title={'Total Activities'}
          numberTitle={17}
          itemContentDetailTitle1={'Mailbox Received'}
          itemContentDetailNumber1={'342'}
          itemContentDetailTitle2={'Mailbox Awaiting Reply'}
          itemContentDetailNumber2={'6'}
          itemContentDetailTitle3={'Task Overdue'}
          itemContentDetailNumber3={'2'}
          numberTitleColor={'#32A4FC'}
          icon={<Fontisto name="heartbeat-alt" size={16} color="#32A4FC" />}
        />
        <ItemDashboard
          title={'Total Centres'}
          numberTitle={32}
          itemContentDetailTitle1={'Total Places'}
          itemContentDetailNumber1={'160'}
          itemContentDetailTitle2={'Enrolment Coverage'}
          itemContentDetailNumber2={'72%'}
          itemContentDetailTitle3={'Average Enquiry Response Time'}
          itemContentDetailNumber3={'24 hrs 36 mins'}
          numberTitleColor={'#DB147F'}
          icon={<Entypo name="shop" size={16} color="#DB147F" />}
        />
      </ScrollView>
    </View>
  );
}

export default Home;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  itemView: {
    padding: 20,
    borderRadius: 20,
    marginTop: -50,
    zIndex: 1,
    width: '100%',
    marginBottom: 20,
  },
  item: {
    padding: 10,
    marginBottom: 20,
    borderRadius: 20,
    backgroundColor: 'white',
  },
  viewIn: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginLeft: '5%',
    marginRight: '5%',
  },
  viewLeft: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  dropView: {
    marginLeft: 10,
    flexDirection: 'row',
  },
  numberView: {
    backgroundColor: 'red',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 100,
    width: 15,
    height: 15,
    position: 'absolute',
    right: 0,
    alignItems: 'center',
  },
  numberText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 9,
  },
  header: {
    width: '100%',
    height: 120,
    backgroundColor: '#DB147F',
    borderBottomLeftRadius: 15,
    justifyContent: 'center',
    borderBottomRightRadius: 15,
    padding: 20,
  },
  txtHeader: {
    fontSize: 16,
    color: 'white',
  },
});
