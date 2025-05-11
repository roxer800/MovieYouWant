import 'dotenv/config';

export default {
  expo: {
    name: "noxxtton-example",
    slug: "noxxtton-example",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/logo.png",
    scheme: "noxxttonexample",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,
    splash: {
      image: "./assets/images/splash-icon.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff"
    },
    ios: {
      supportsTablet: true,
      infoPlist: {
        UIBackgroundModes: ["fetch", "remote-notification"],
        NSLocationWhenInUseUsageDescription: "We need access to your location to show nearby hotels.", 
      },
      icon:"./assets/images/logo.png",
    },
    android: {
      package: "com.roxer800.noxxttonexample",
      adaptiveIcon: {
        foregroundImage: "./assets/images/logo.png",
        backgroundColor: "#ffffff"
      },
      permissions: [
        "NOTIFICATIONS", 
      ],
      edgeToEdgeEnabled: true,
      "notification": {
        "icon": "./assets/images/logo.png",
        "color": "#7950f2"
      }
    },
    web: {
      bundler: "metro",
      output: "static",
      favicon: "./assets/images/favicon.png"
    },
    plugins: [
      "expo-router",
      "expo-font"
    ],
    experiments: {
      typedRoutes: true
    },
    extra: {
      apiUrl: process.env.API_URL,
      apiKey:process.env.API_KEY,
      supabaseUrl:process.env.SUPABASE_URL,
      supabasekey:process.env.SUPABASE_KEY,
      eas: {
        projectId: "ea22e586-04ad-4eba-8e38-bf1024637898",
      },
    },
    
  }
};
