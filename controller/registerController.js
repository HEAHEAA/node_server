const pool = require('../db/pool');
const sql = require('../sql/RegisterQuery');
const bcrypt = require('bcryptjs');
const results = require('../config/result');

exports.Register = async (req, res) => {
    const {
        sys_user_sign_id,
        sys_username,
        sys_email,
        sys_password_hash,
        sys_date_of_birth,
        sys_created_at,
        sys_updated_at
    } = req.body;

    //비밀번호 해시
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(sys_password_hash, salt);

    pool.query(sql.registerPost, [
        sys_user_sign_id,
        sys_username,
        sys_email,
        hashedPassword,
        sys_date_of_birth,
        sys_created_at,
        sys_updated_at
    ], (err, data) => {
        if (err) {
            res.status(500).send('Register Error');
            console.error("회원가입 에러 :" , err);
        } else {
            results.results = {
                title: '회원가입 성공',
                success: true,
                message: 'success',
                total: 1
            }
            res.status(201).json(results.results);
        }
    });
}