import React, { useEffect, useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import { getDatabase, ref, set } from 'firebase/database';
import {
  ref as refStorage,
  getStorage,
  uploadBytes,
  getDownloadURL,
} from 'firebase/storage';
import {
  SafeAreaView,
  TextInput,
  StatusBar,
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  DatePickerAndroid,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { DatePickerIOS } from 'react-native';
import { Formik, ErrorMessage } from 'formik';
import { Button } from 'react-native-paper';
import * as Yup from 'yup';
import { features, hours, marketing, services } from '../global/dataCentre';
import { bindActionCreators } from 'redux';
import { changeDetail } from '../global/actions/centreData';
import { connect } from 'react-redux';

function AddCentreScreen(props) {
  const { route } = props;
  const [selectedKindCare, setSelectedKindCare] = useState();
  const pickImage = async (setImageData) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImageData(
        'image',
        Platform.OS == 'android' ? result.uri : result.path
      );
    }
  };
  const navigationRoute = route.params;
  useEffect(() => {
    navigationRoute
      .getParent()
      ?.setOptions({ tabBarStyle: { display: 'none' } });
    return () =>
      navigationRoute.getParent()?.setOptions({ tabBarStyle: undefined });
  }, [navigationRoute]);

  const validationSchema = Yup.object({
    nameCentre: Yup.string().required('Name is required'),
    address: Yup.string().required('Address is iequired'),
    calendar: Yup.string().required('Calendar is required'),
    children: Yup.string().required('Number children is required'),
    outdoor: Yup.string().required('Outdoor is required'),
    short_description: Yup.string().required('Short description is required'),
    type: Yup.string().required('Type is required'),
    phone: Yup.string().required('Phone is required'),
    link: Yup.string().required('Link is required'),
    LGA: Yup.string().required('LGA is required'),
    rigion: Yup.string().required('Rigion is required'),
    description: Yup.string().required('Description is required'),
    email: Yup.string().email('Invalid Email').required('Email is required'),
    admin_email: Yup.string()
      .email('Invalid Email')
      .required('Amin email is required'),
  });

  const initialValues = {
    nameCentre: '',
    address: '',
    calendar: new Date(),
    children: '',
    image: '',
    outdoor: '',
    short_description: '',
    type: 'KindiCare Basic',
    phone: '',
    email: '',
    link: '',
    LGA: '',
    admin_email: '',
    rigion: '',
    description: '',
  };

  const addCentre = async (data) => {
    const { data: value } = props;
    let url = '';
    const {
      image,
      nameCentre,
      address,
      calendar,
      children,
      outdoor,
      short_description,
      description,
      type,
      phone,
      email,
      link,
      admin_email,
      LGA,
      rigion,
    } = data;
    const arrImg = image.split('/');
    const nameImg = arrImg[arrImg.length - 1];
    const storage = getStorage();
    const refI = refStorage(storage, nameImg);

    const img = await fetch(image);
    const bytes = await img.blob();

    await uploadBytes(refI, bytes).then(async (e) => {
      url = await getDownloadURL(refI);
    });
    const sumary = {
      name: nameCentre,
      address: address,
      calendar: calendar.toString(),
      children: children,
      image: url,
      outdoor: outdoor,
      short_description: short_description,
      type: type,
      contact: {
        phone: phone,
        email: email,
        link: link,
      },
    };
    const centreInfor = {
      additional_details: {
        LGA: LGA,
        admin_email: admin_email,
        rigion: rigion,
      },
      description: description,
    };
    const dataAdd = {
      'centre-information': centreInfor,
      features: features,
      hours: hours,
      marketing: marketing,
      services: services,
      sumary: sumary,
    };
    try {
      const db = getDatabase();
      const reference = await ref(db, `Centres/${value.data.length}`);
      await set(reference, dataAdd);
      navigationRoute.goBack();
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values, formikActions) => {
            setTimeout(() => {
              addCentre(values);
              formikActions.setSubmitting(false);
            }, 500);
          }}
        >
          {(props) => (
            <View>
              <Text style={styles.titleMain}>Main Information:</Text>
              <View style={styles.viewRow}>
                <Text style={styles.text}>Name:</Text>
                <TextInput
                  onChangeText={props.handleChange('nameCentre')}
                  onBlur={props.handleBlur('nameCentre')}
                  value={props.values.nameCentre}
                  autoFocus
                  placeholder="Name"
                  style={styles.textinput}
                ></TextInput>
              </View>
              {props.touched.nameCentre ? (
                <Text style={styles.error}>{props.errors.nameCentre}</Text>
              ) : null}
              <View style={styles.viewRow}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={styles.text}>Image:</Text>
                  <View>
                    <TouchableOpacity
                      style={styles.uploadButton}
                      onPress={() => pickImage(props.setFieldValue)}
                    >
                      <Text style={{ color: 'white' }}>Upload</Text>
                    </TouchableOpacity>
                  </View>
                  {props.values.image != '' && (
                    <Image
                      source={{ uri: props.values.image }}
                      style={styles.imageUpload}
                    />
                  )}
                </View>
              </View>

              <View style={styles.viewRow}>
                <Text style={styles.text}>Address:</Text>
                <TextInput
                  onChangeText={props.handleChange('address')}
                  onBlur={props.handleBlur('address')}
                  value={props.values.address}
                  autoFocus
                  placeholder="Address"
                  style={styles.textinput}
                ></TextInput>
              </View>
              {props.touched.address && props.errors.address ? (
                <Text style={styles.error}>{props.errors.address}</Text>
              ) : null}
              <View style={styles.viewRow}>
                <Text style={styles.text}>Childrens:</Text>
                <TextInput
                  placeholder="Number Childrens"
                  onChangeText={props.handleChange('children')}
                  onBlur={props.handleBlur('children')}
                  value={props.values.children}
                  autoFocus
                  style={styles.textinput}
                ></TextInput>
              </View>
              {props.touched.children && props.errors.children ? (
                <Text style={styles.error}>{props.errors.children}</Text>
              ) : null}
              <View style={styles.viewRow}>
                <Text style={styles.text}>Outdoor:</Text>
                <TextInput
                  placeholder="Outdoor"
                  onChangeText={props.handleChange('outdoor')}
                  onBlur={props.handleBlur('outdoor')}
                  value={props.values.outdoor}
                  autoFocus
                  style={styles.textinput}
                ></TextInput>
              </View>
              {props.touched.outdoor && props.errors.outdoor ? (
                <Text style={styles.error}>{props.errors.outdoor}</Text>
              ) : null}
              <View style={styles.viewRow}>
                <Text style={styles.text}>Short description:</Text>
                <TextInput
                  placeholder="Short description"
                  onChangeText={props.handleChange('short_description')}
                  onBlur={props.handleBlur('short_description')}
                  value={props.values.short_description}
                  autoFocus
                  style={styles.textinput}
                ></TextInput>
              </View>
              {props.touched.short_description &&
              props.errors.short_description ? (
                <Text style={styles.error}>
                  {props.errors.short_description}
                </Text>
              ) : null}
              <View style={styles.viewRow}>
                <Text style={styles.text}>LGA:</Text>
                <TextInput
                  placeholder="LGA"
                  onChangeText={props.handleChange('LGA')}
                  onBlur={props.handleBlur('LGA')}
                  value={props.values.LGA}
                  autoFocus
                  style={styles.textinput}
                ></TextInput>
              </View>
              {props.touched.LGA && props.errors.LGA ? (
                <Text style={styles.error}>{props.errors.LGA}</Text>
              ) : null}
              <View style={styles.viewRow}>
                <Text style={styles.text}>Admin email:</Text>
                <TextInput
                  placeholder="Admin email"
                  onChangeText={props.handleChange('admin_email')}
                  onBlur={props.handleBlur('admin_email')}
                  value={props.values.admin_email}
                  autoFocus
                  style={styles.textinput}
                ></TextInput>
              </View>
              {props.touched.admin_email && props.errors.admin_email ? (
                <Text style={styles.error}>{props.errors.admin_email}</Text>
              ) : null}
              <View style={styles.viewRow}>
                <Text style={styles.text}>Rigion:</Text>
                <TextInput
                  placeholder="Rigion"
                  onChangeText={props.handleChange('rigion')}
                  onBlur={props.handleBlur('rigion')}
                  value={props.values.rigion}
                  autoFocus
                  style={styles.textinput}
                ></TextInput>
              </View>
              {props.touched.rigion && props.errors.rigion ? (
                <Text style={styles.error}>{props.errors.rigion}</Text>
              ) : null}
              <View style={styles.viewRow}>
                <Text style={styles.text}>Description:</Text>
                <TextInput
                  placeholder="Description"
                  numberOfLines={9}
                  onChangeText={props.handleChange('description')}
                  onBlur={props.handleBlur('description')}
                  value={props.values.description}
                  autoFocus
                  style={styles.textinput}
                ></TextInput>
              </View>
              {props.touched.description && props.errors.description ? (
                <Text style={styles.error}>{props.errors.description}</Text>
              ) : null}
              <View style={styles.viewRow}>
                <Text style={styles.text}>Calendar:</Text>
                <TouchableOpacity
                  onPress={async () => {
                    try {
                      const { action, year, month, day } =
                        Platform.OS == 'android'
                          ? await DatePickerAndroid.open({
                              date: new Date(),
                            })
                          : await DatePickerIOS.open({
                              date: new Date(),
                            });
                      if (
                        action !==
                        (Platform.OS == 'android'
                          ? DatePickerAndroid.dismissedAction
                          : DatePickerIOS.dismissedAction)
                      ) {
                        props.setFieldValue(
                          'calendar',
                          new Date(year, month, day)
                        );
                      }
                    } catch ({ code, message }) {}
                  }}
                >
                  <Text style={styles.textinput}>
                    {props.values.calendar.toDateString()}
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={styles.viewRow}>
                <Text style={styles.text}>KindCare:</Text>
                <Picker
                  style={styles.textinput}
                  selectedValue={selectedKindCare}
                  onValueChange={(itemValue, itemIndex) =>
                    props.setFieldValue('type', itemValue)
                  }
                >
                  <Picker.Item
                    label="KindiCare Basic"
                    value="KindiCare Basic"
                  />
                  <Picker.Item
                    label="KindiCare Enterprise"
                    value="KindiCare Enterprise"
                  />
                </Picker>
              </View>
              <Text style={styles.titleMain}>Detail Information:</Text>
              <View>
                <Text style={styles.titleDetail}>Summary:</Text>
                <Text style={styles.textTitleDetail}>Contact Information:</Text>

                <View style={styles.viewRow}>
                  <Text style={styles.text}>Phone:</Text>
                  <TextInput
                    placeholder="Phone"
                    onChangeText={props.handleChange('phone')}
                    onBlur={props.handleBlur('phone')}
                    value={props.values.phone}
                    autoFocus
                    style={styles.textinput}
                  ></TextInput>
                </View>
                {props.touched.phone && props.errors.phone ? (
                  <Text style={styles.error}>{props.errors.phone}</Text>
                ) : null}
                <View style={styles.viewRow}>
                  <Text style={styles.text}>Email:</Text>
                  <TextInput
                    placeholder="Email"
                    onChangeText={props.handleChange('email')}
                    onBlur={props.handleBlur('email')}
                    value={props.values.email}
                    autoFocus
                    style={styles.textinput}
                  ></TextInput>
                </View>
                {props.touched.email && props.errors.email ? (
                  <Text style={styles.error}>{props.errors.email}</Text>
                ) : null}
                <View style={styles.viewRow}>
                  <Text style={styles.text}>Website:</Text>
                  <TextInput
                    placeholder="Website"
                    onChangeText={props.handleChange('link')}
                    onBlur={props.handleBlur('link')}
                    value={props.values.link}
                    autoFocus
                    style={styles.textinput}
                  ></TextInput>
                </View>
                {props.touched.link && props.errors.link ? (
                  <Text style={styles.error}>{props.errors.link}</Text>
                ) : null}
              </View>

              <Button
                onPress={props.handleSubmit}
                color="black"
                mode="contained"
                loading={props.isSubmitting}
                disabled={props.isSubmitting}
                style={{ marginTop: 16 }}
              >
                Submit
              </Button>
            </View>
          )}
        </Formik>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 25,
  },
  viewRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontWeight: 'bold',
    color: 'black',
    width: 80,
  },
  textinput: {
    borderColor: 'grey',
    borderWidth: 0.8,
    flex: 1,
    margin: 10,
    borderRadius: 6,
    paddingLeft: 10,
  },
  uploadButton: {
    backgroundColor: '#DB147F',
    height: 20,
    width: 80,
    marginLeft: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  imageUpload: {
    height: 100,
    width: 100,
    marginLeft: 30,
  },
  titleMain: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#DB147F',
    marginVertical: 10,
  },
  titleDetail: {
    fontWeight: 'bold',
    fontSize: 17,
    color: '#DB147F',
    marginVertical: 5,
  },
  textTitleDetail: {
    fontWeight: 'bold',

    color: 'black',
    marginVertical: 5,
  },
  error: {
    fontSize: 14,
    marginBottom: 10,
    color: 'red',
    fontWeight: 'bold',
  },
});
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
export default connect(mapStateToProps, mapDispatchToProps)(AddCentreScreen);
