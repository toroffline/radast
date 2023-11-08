const CommonUtil = {
    defaultCompanyLogoSrc: 'building.png',
    isNotFalsyExceptZero: function (value) {
        if (value === 0) {
            return true;
        } else {
            return !value;
        }
    },
    isFalsyIncludeZero: function (value) {
        if (value === 0) {
            return true;
        } else {
            return !value;
        }
    },
    sleep: async function sleep(ms) {
        await new Promise((resolve) => setTimeout(resolve, ms));
    },
    addHttpsPrefix: function (url) {
        if (!url.startsWith('http://') && !url.startsWith('https://')) {
            // TODO: https
            return `http://${url}`;
        }
        return url;
    },
    isObjectEmpty: function (object) {
        return Object.keys(object).length === 0;
    },
};

export default CommonUtil;
