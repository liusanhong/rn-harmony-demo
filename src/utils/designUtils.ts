import moment from 'moment';
import {PixelRatio, Dimensions, StyleSheet, StatusBar} from 'react-native';

var {width, height} = Dimensions.get('window');

export const WINDOW_SIZE = {
    width,
    height,
};

const VW1 = width / 100;
export function vw(num: number) {
    return VW1 * num;
}

/**
 * 设计稿尺寸转px
 * @param dp
 * @returns
 */
export function pd2px(dp: number) {
    return PixelRatio.getPixelSizeForLayoutSize(dp);
}

export function px2dp(px: number) {
    return PixelRatio.roundToNearestPixel(px);
}

/**
 * 系统状态条高度
 */
export const STATUS_BAR_HEIGHT = 44;

/**
 * 设计规范中的颜色常量集合
 */
export const CONSTANT_COLORS = {
    REFUSE: '#F35C4B', // 拒绝
    ALLOW: '#00A796', // 允许
    WAIT: '#F7B500', // 等待
    // 主题色 primary
    PRIMARY: '#00A796',
    PRIMARY_3: '#27CFA7',
    PRIMARY_4: '#DAF5F3',
    PRIMARY_5: '#389E0D',

    BLUE: '#3A86F5', // @ 蓝色
    BLUE_1: '#a7c6f3', // @ 浅蓝色
    BLUE_2: '#e2ecfa',

    BLACK: '#484856', // 文字主题黑
    BLACK_2: '#575764', // 文字主题浅黑黑
    BLACK_3: '#333333', // 文字主题浅黑黑
    BLACK_4: '#222222', // 文字主题浅黑黑
    BLACK_5: '#555555', // 文字主题浅黑黑
    CAPTION: '#959BAE', // 描述文字，浅灰
    CAPTION_2: '#B8BECF', // 描述文字，浅灰
    CAPTION_3: '#ABB2C6', // 描述文字，浅灰
    CAPTION_4: '#999EB1', // 描述文字，浅灰
    TIPS: '#F1F2F6', // 提示边框，超浅灰
    LINE_COLOR: '#F5F5F6',
    BG_COLOR: '#F5F5F6',
    WHITE: '#FFFFFF',
    ORDER_PRIMARY_COLOR: '#00CB8A', //订单主色
    GRAY_1: '#888888',
    MONEY_COLOR: '#EE4127',
};

/**
 * 字体字号
 */
export const CONSTANT_FONT_SIZE = {
    NUMBER: px2dp(40), // 数字
    BIG_LINE: px2dp(30),
    BIG_NUM: px2dp(26),
    MEDIUM_NUM: px2dp(24),
    HEAD_LINE_1: px2dp(20), // 一级标题
    HEAD_LINE_2: px2dp(18), // 二级标题
    HEAD_LINE_3: px2dp(16), // 三级标题
    BODY_1: px2dp(14), // 大部分主体
    CAPTION: px2dp(12), // 解释说明文字
    CAPTION_1: px2dp(10), // 解释说明文字
    CHARTDES: px2dp(8), // 图标标注文字
};
/**
 * 保留两位小数常量
 */
export const DECIMAL_TYPE = {
    ONE: 1,
    TWO: 2,
};

/**
 * 设备可识别最小像素
 */
export const HAIR_LINE_WIDTH = StyleSheet.hairlineWidth;

export const formatDate = (datetime = null as string | null, formation = 'YYYY-MM-DD' as string) => {
    return moment(datetime).locale('zh-cn').format(formation);
};

/**
 * 金额 / 10000 ，进行取整
 * @param str
 * @returns
 */
export const formatMoney = (str, fix = 0) => {
    if (str) {
        return (str / 10000).toFixed(fix);
    }
    return '0';
};

/**
 * 金额 / 10000 / 10000 ，进行取整
 * @param str
 * @returns
 */
export const formatMoneyHundredMillion = (str, fix = 0) => {
    if (str) {
        return (str / 100000000).toFixed(fix);
    }
    return '0';
};

export const getToday = (hanzi = false) => {
    if (hanzi) {
        return moment().locale('zh-cn').format('YYYY年MM月DD日');
    }
    return moment().locale('zh-cn').format('YYYY-MM-DD');
};

/**
 * 返回 YY年MM月
 * @param num 0当月，负数：后面几个月，正数，向前几个月
 * @returns
 */
export const getMonth = (num = 1) => {
    return moment().subtract(num, 'month').format('YY年MM月');
};

export const getCurrentMonth = (time = undefined) => {
    return {
        startDate: moment(time).startOf('month').format('YYYY-MM-DD'),
        endDate: time || getToday(),
    };
};

export const getBetweenDateStr = (time, isStart = false, type = 'month', format = 'YYYY-MM-DD') => {
    return moment(time)[isStart ? 'startOf' : 'endOf']?.(type).format(format);
};

export const getCurrentWeek = (time = undefined) => {
    return {
        startDate: moment(time).startOf('week').format('YYYY-MM-DD'),
        endDate: getToday(),
    };
};

export const getCurrentDay = () => {
    const _day = getToday();
    return {
        startDate: _day,
        endDate: _day,
    };
};

/**
 * 获取离线数据的起始时间
 * 月 month 为 昨天所在月的起始时间
 * 日 day 为昨天开始到昨天结束
 * @param type {'month'} 类型
 * @returns
 */
export const getOfflineDate = (type = 'month') => {
    if (type === 'month') {
        // 获取前一天的月日期 的起始日期和结束日期
        return getCurrentMonth(getYesterdayDate());
    } else {
        // 其他 或者 日 day
        const yesterday = getYesterdayDate();
        return {
            startDate: yesterday,
            endDate: yesterday,
        };
    }
};

// 获取昨天日期
export const getYesterdayDate = (time = undefined) => {
    return moment(time).subtract(1, 'day').format('YYYY-MM-DD');
};

export const getQuickDate = (type = 'the_month') => {
    switch (type) {
        case 'today':
            return getCurrentDay();
        case 'yesterday':
            const _day = moment().subtract(1, 'day').format('YYYY-MM-DD');
            return {
                startDate: _day,
                endDate: _day,
            };
        case 'the_week':
            return getCurrentWeek();
        case 'last_week':
            return {
                startDate: moment().subtract(1, 'week').startOf('week').format('YYYY-MM-DD'),
                endDate: moment().subtract(1, 'week').endOf('week').format('YYYY-MM-DD'),
            };
        case 'the_month':
            return getCurrentMonth();
        case 'before_month':
            return {
                startDate: moment().subtract(1, 'month').startOf('month').format('YYYY-MM-DD'),
                endDate: moment().subtract(1, 'month').endOf('month').format('YYYY-MM-DD'),
            };
        case 'before_two_month':
            return {
                startDate: moment().subtract(2, 'month').startOf('month').format('YYYY-MM-DD'),
                endDate: moment().subtract(2, 'month').endOf('month').format('YYYY-MM-DD'),
            };
    }
};

/**
 * 对一个引用类型进行深层次取值
 * @param obj 目标对象
 * @param path 取值路径
 * @returns
 */
export const deepPath = (obj, path) => {
    let target = obj;
    if (!Array.isArray(path)) {
        return void 0;
    }
    for (let i = 0, len = path.length; i < len; i++) {
        if (typeof target !== 'undefined') {
            target = target[path[i]];
        } else {
            return void 0;
        }
    }
    return target;
};

export function parseUrlParams(data) {
    try {
        let tempArr = [];
        for (let i in data) {
            let key = encodeURIComponent(i);
            let value = encodeURIComponent(data[i]);
            tempArr.push(key + '=' + value);
        }
        let urlParamsStr = tempArr.join('&');
        return urlParamsStr;
    } catch (err) {
        return '';
    }
}

/**
 * 设置状态条颜色
 * @param light 文字是否为浅色，false:黑色白底
 */
export const setStatusBarStyle = (light = true) => {
    // 'dark-content' 黑底白字
    StatusBar.setBarStyle(light ? 'light-content' : 'dark-content');
};

/**
 * 针对数值处理，>=10取整，>=1且<10保留一位小数，其他保留两位小数
 * @param num 数字
 */
export function formatNumber(num) {
    if (Math.abs(num) >= 10) {
        return Math.round(num);
    } else if (Math.abs(num) >= 1 && Math.abs(num) < 10) {
        return Number(num).toFixed(1);
    } else {
        return Number(num).toFixed(2);
    }
}
/**
 * 获取当月的日期区间(如果为当月1号则展示上月完整日期区间)
 * @param hasToday 值为ture包含当天，false不包含当天
 */
export function getThisMonthDateRange(hasToday = false) {
    const today = moment();
    let start, end;
    // 1号 → 返回上个月整月
    if (today.date() === 1) {
        start = today.clone().subtract(1, 'month').startOf('month').format('MM-DD');
        end = today.clone().subtract(1, 'month').endOf('month').format('MM-DD');
    }
    // 非1号 → 当月区间
    else {
        start = today.clone().startOf('month').format('MM-DD');
        // hasToday为false不包含今天取昨天
        end = hasToday
            ? today.format('MM-DD')
            : today.clone().subtract(1, 'day').format('MM-DD');
    }
    return [start, end];
}
/**
 * 获取参数对应月的完整月份区间
 * @param date
 */
export function getMonthInterval(date) {
    let firstDay = new Date(Date.UTC(date.getFullYear(), date.getMonth(), 1));
    let firstDayStr = firstDay.toISOString().split('T')[0];
    // 获取月份的最后一天
    let lastDay = new Date(Date.UTC(date.getFullYear(), date.getMonth() + 1, 0));
    let lastDayStr = lastDay.toISOString().split('T')[0];
    return [firstDayStr, lastDayStr];
}
export const DEFAULT_USER_AVATAR_IMG = 'http://cfky.oss-cn-zhangjiakou.aliyuncs.com/default/avatar.png';

/**
 * 获取近一周的日期
 *
 */
export function getLastWeek() {
    let today = new Date();
    let lastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);
    let nextWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1);

    let format = function (date) {
        let dd = String(date.getDate()).padStart(2, '0');
        let mm = String(date.getMonth() + 1).padStart(2, '0');
        // let yyyy = date.getFullYear();
        return mm + '-' + dd;
    };

    return [format(lastWeek), format(nextWeek)];
}
/**
 * 获取近7天日期的年份
 * @param date 日期月，日数据
 */
export function getLast7DaysYear(date:[string, string]) {
    const [startMonth] = date[0].split('-').map(Number);
    const [endMonth] = date[1].split('-').map(Number);
    //当年
    const currentYear = new Date().getFullYear();
    //考虑跨年情况
    const startDateYear = (startMonth === 12 && endMonth === 1) ? currentYear - 1 : currentYear;
    return [startDateYear, currentYear];
}

/**
 * 获取当前年到目前为止的日期区间
 */
export function getCusYear() {
    let startOfYear = moment().startOf('year').format('YYYY-MM-DD');
    let today = moment().format('YYYY-MM-DD');
    return [startOfYear, today];
}
