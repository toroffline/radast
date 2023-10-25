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
};

export default CommonUtil;
