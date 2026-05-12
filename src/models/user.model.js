import { and, asc, eq } from 'drizzle-orm';
import db from '../db/index.js';
import { files, hrPagePermission, personalInfo, projects, users } from '../db/schema.js';

const findUserInfoById = async (id) => {
    const [result] = await db
        .select({
            idUsers: users.idUsers,
            firstName: personalInfo.firstName,
            lastName: personalInfo.lastName,
            email: users.email,
            fileName: files.fileName,
        })
        .from(users)
        .leftJoin(personalInfo, eq(personalInfo.idUsers, users.idUsers))
        .leftJoin(files, eq(files.idUsers, users.idUsers))
        .where(eq(users.idUsers, id))
        .limit(1);

    return result || null;
};

const findProjectListByAccess = async (userId) => {
    const result = await db
        .select({
            idProject: hrPagePermission.idProject,
            projectName: projects.projectName,
        })
        .from(hrPagePermission)
        .leftJoin(projects, eq(projects.idProjects, hrPagePermission.idProject))
        .where(
            and(
                eq(hrPagePermission.idUser, userId),
                eq(hrPagePermission.status, 'active'),
            ),
        )
        .groupBy(hrPagePermission.idProject)
        .orderBy(asc(projects.projectName));

    return result;
};

export default {
    findUserInfoById,
    findProjectListByAccess,
};