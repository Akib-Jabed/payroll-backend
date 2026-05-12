import { STATUS_CODES } from '../config/status.js';
import { userService } from '../services/index.js';
import ApiError from '../utils/ApiError.js';

const getCurrentUserInfo = async (req, res) => {
    const userInfo = await userService.getCurrentUserInfo(req.user.userId);

    if (!userInfo) {
        throw new ApiError(STATUS_CODES.NOT_FOUND, 'User not found');
    }

    res.status(STATUS_CODES.OK).json({ success: true, data: userInfo });
};

const getProjectAccessList = async (req, res) => {
    const projectAccessList = await userService.getProjectAccessList(req.user.userId);

    res.status(STATUS_CODES.OK).json({ success: true, data: projectAccessList });
};

const getPageAccessList = async (req, res) => {
    const pageAccessList = await userService.getPageAccessList(req.user.userId, req.params.projectId);

    res.status(STATUS_CODES.OK).json({ success: true, data: pageAccessList });
};

export default { getCurrentUserInfo, getProjectAccessList, getPageAccessList };