import { useNavigation } from '@react-navigation/core';
import * as React from 'react';
import {ScrollView, SafeAreaView, Text} from 'react-native';
import {getPrivacyText} from '../../../service/common';

export function PrivacyScreen({route}) {
  const navigation = useNavigation();
  const params = route.params;
  const [text, setText] = React.useState('');

  React.useEffect(() => {
    getPrivacyText().then(ret => {
      if (ret) setText(ret);
    });
  }, [params]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: params.title,
    });
  });

  return (
    <SafeAreaView>
      <ScrollView>
        <Text>{text}</Text>
      </ScrollView>
    </SafeAreaView>
  );
}
