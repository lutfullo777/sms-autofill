import React, {useState, useEffect} from 'react';
import RNOtpVerify from 'react-native-otp-verify';
import {TextInput} from 'react-native'

// This works only android platform not supported for ios


//SMS format is must be like "<#> Confirmation code is 7555 6YE1NsOkHAl"

const AutoFill = () => {

  const [value,setValue] = useState('')

  useEffect(() => {
    RNOtpVerify.getHash()
      .then((e) => {
        getCode(...e);
      })
      .catch((error) => {
        getCode('');
        console.log('error while getting otp hash key', error)
      })
    startListeningForOtp();
    return () => RNOtpVerify.removeListener();
  }, []);
  
  const getCode = (key) => {
    YourApi.get('/get-code',{ 
              phone: '123456789',
              phone_hash: key,
           })
  }
  
  const startListeningForOtp = () =>
        RNOtpVerify.getOtp()
          .then((p) => RNOtpVerify.addListener(otpHandler))
          .catch((p) => console.log(p))
   

  const otpHandler = (message) => {
    const otp = /(\d{4})/g.exec(message)[1];
    setValue(otp);
    RNOtpVerify.removeListener();
  };
  
  return (
    <TextInput value={value} onChangeText={val=>setValue(val)} placeholder='Input code'/>
  )
}
