import { userModel } from '../models/index.js';

const formatProfileImage = (fileName) => {
    if (!fileName) return 'default.png';
    return fileName.replace('.', '_thumb.');
};

const getCurrentUserInfo = async (userId) => {
    const userInfo = await userModel.findUserInfoById(userId);
    if (!userInfo) return null;

    return {
        idUsers: userInfo.idUsers,
        firstName: userInfo.firstName,
        lastName: userInfo.lastName,
        email: userInfo.email,
        image: formatProfileImage(userInfo.fileName),
    };
};

const getProjectAccessList = async (userId) => {
    const projectAccessList = await userModel.findProjectListByAccess(userId);

    return projectAccessList;
};

export default { getCurrentUserInfo, getProjectAccessList };