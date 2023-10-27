const CommonUtil = {
    isFalsyExceptZero: function (value) {
        if (value === 0) {
            return true;
        } else {
            return !!value;
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
};

export default CommonUtil;
