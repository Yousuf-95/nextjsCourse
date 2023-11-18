import { getSession } from 'next-auth/react';
import dbConnect from '@/lib/mongodbUtils';
import UserModel from '@/models/userModel';
import { hashPassword, verifyPassword } from '@/lib/auth';

async function handler(req, res) {
    if (req.method !== 'PATCH') {
        return;
    }

    const session = await getSession({ req: req });

    if (!session) {
        res.status(401).json({ message: 'Unathorized' });
        return;
    }

    const userEmail = session.user.email;
    const oldPassword = req.body.oldPassword;
    const newPassword = req.body.newPassword;

    await dbConnect();

    const user = UserModel.findOne({ email: userEmail }).lean();

    if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
    }

    const currentPassword = user.password;
    const isValid = await verifyPassword(oldPassword, currentPassword);

    if (!isValid) {
        res.status(422).json({ message: 'Current & old passwords donot match' });
        return;
    }

    const newPasswordHashed = await hashPassword(newPassword);

    await UserModel.findOneAndUpdate({ email: userEmail }, { password: newPasswordHashed });

    res.status(200).json({ messages: 'Password updated successfully' });
}

export default handler;