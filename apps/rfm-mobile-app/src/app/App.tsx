import React from 'react';
import { SafeAreaView, Text, View } from 'react-native';

import tw from '../utils/tailwind';

export const App = () => {
  const rootStyle = 'flex-1 bg-white p-4 justify-center overflow-hidden';
  const wrapperStyle = 'bg-gray-400 justify-center p-4';
  const textStyle = 'text-lg text-center';

  return (
    <SafeAreaView style={tw.style(rootStyle)}>
      <View style={tw.style(wrapperStyle)}>
        <Text style={tw.style(textStyle)}>Welcome top the RFM monorepo</Text>
      </View>
    </SafeAreaView>
  );
};

export default App;
