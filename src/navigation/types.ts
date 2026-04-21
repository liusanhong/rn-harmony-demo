// src/navigation/types.ts

// Tab 导航类型
export type TabParamList = {
  HomeTab: undefined;
  FindGoodsTab: undefined;
  WaybillTab: undefined;
  MallTab: undefined;
  MineTab: undefined;
};

// 各 Tab 内 Stack 导航类型
export type HomeStackParamList = {
  Home: undefined;
  TestDetail: undefined;
  TestLogPage: undefined;
};

export type FindGoodsStackParamList = {
  FindGoods: undefined;
};

export type WaybillStackParamList = {
  Waybill: undefined;
};

export type MallStackParamList = {
  Mall: undefined;
};

export type MineStackParamList = {
  Mine: undefined;
};

// 全局类型声明（用于 useNavigation 类型推断）
declare global {
  namespace ReactNavigation {
    interface RootParamList extends TabParamList {}
  }
}
