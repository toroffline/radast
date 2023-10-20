const CommonUtil = {
    isFalsyExceptZero: function (value) {
        if (value === 0) {
            return true;
        } else {
            return !!value;
        }
    },
};

export default CommonUtil;
