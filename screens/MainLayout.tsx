import React from 'react';
import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import { Icon } from 'react-native-elements';
import { mainRoutes } from '../routes/main';
import { RequestRouteProps, RootRouteProps } from '../routes';
import { Theme } from '../components/ui/styleUtils';
import { useTranslation } from 'react-i18next';
import { Row } from '../components/ui';
import { Image } from 'react-native';
import { SettingScreen } from './Settings/SettingScreen';
import { HelpScreen } from '../components/HelpScreen';

const { Navigator, Screen } = createBottomTabNavigator();

export const MainLayout: React.FC<RootRouteProps & RequestRouteProps> = (
  props
) => {
  const { t } = useTranslation('MainLayout');

  const options: BottomTabNavigationOptions = {
    headerRight: () => (
      <Row align="space-between">
        <HelpScreen
          triggerComponent={
            <Image
              source={require('../assets/help-icon.png')}
              style={{ width: 36, height: 36 }}
            />
          }
          navigation={undefined}
          route={undefined}
        />

        <SettingScreen
          triggerComponent={
            <Icon
              name="settings"
              type="simple-line-icon"
              size={21}
              style={Theme.Styles.IconContainer}
              color={Theme.Colors.Icon}
            />
          }
          navigation={props.navigation}
          route={undefined}
        />
      </Row>
    ),
    headerTitleStyle: {
      fontFamily: 'Inter_600SemiBold',
      fontSize: 30,
      margin: 8,
    },
    headerRightContainerStyle: { paddingEnd: 13 },
    headerLeftContainerStyle: { paddingEnd: 13 },
    tabBarShowLabel: true,
    tabBarActiveTintColor: Theme.Colors.IconBg,
    tabBarLabelStyle: {
      fontSize: 12,
      fontFamily: 'Inter_600SemiBold',
    },
    tabBarStyle: {
      height: 82,
      paddingHorizontal: 10,
    },
    tabBarItemStyle: {
      height: 83,
      padding: 11,
    },
  };

  return (
    <Navigator initialRouteName={mainRoutes[0].name} screenOptions={options}>
      {mainRoutes.map((route) => (
        <Screen
          key={route.name}
          name={route.name}
          component={route.component}
          options={{
            ...route.options,
            title: t(route.name),
            tabBarIcon: ({ focused }) => (
              <Icon
                name={route.icon}
                color={focused ? Theme.Colors.Icon : Theme.Colors.GrayIcon}
                style={focused ? Theme.Styles.bottomTabIconStyle : null}
              />
            ),
          }}
        />
      ))}
    </Navigator>
  );
};
