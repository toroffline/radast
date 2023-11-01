import CommonUtil from '../utils/commonUtil';

class UserService {
    async register() {
        await CommonUtil.sleep(2000);
        return { code: 200 };
    }
}

const userService = new UserService();

export default userService;
