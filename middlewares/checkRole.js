import jwt from "jsonwebtoken";

export default async (req, res, next) => {
    const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');

    if (token) {
        try {
            const { roles: userRoles } = jwt.verify(token, 'ilovenika');

            if (userRoles.includes('admin')) {
                next()
            } else {
                return res.status(403).json({
                    message: 'No access'
                })
            }

        } catch (err) {
            return res.status(403).json({
                message: 'No access'
            })
        }
    } else {
        return res.status(403).json({
            message: 'No access'
        })
    }
}