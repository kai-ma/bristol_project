package com.kaixiang.cure.dao;

import com.kaixiang.cure.dataobject.UserPasswordDO;

public interface UserPasswordDOMapper {
    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table user_password
     *
     * @mbg.generated Sun Jun 20 22:30:04 CST 2021
     */
    int deleteByPrimaryKey(Integer id);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table user_password
     *
     * @mbg.generated Sun Jun 20 22:30:04 CST 2021
     */
    int insert(UserPasswordDO record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table user_password
     *
     * @mbg.generated Sun Jun 20 22:30:04 CST 2021
     */
    int insertSelective(UserPasswordDO record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table user_password
     *
     * @mbg.generated Sun Jun 20 22:30:04 CST 2021
     */
    UserPasswordDO selectByPrimaryKey(Integer id);

    UserPasswordDO selectByUserId(Integer id);


    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table user_password
     *
     * @mbg.generated Sun Jun 20 22:30:04 CST 2021
     */
    int updateByPrimaryKeySelective(UserPasswordDO record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table user_password
     *
     * @mbg.generated Sun Jun 20 22:30:04 CST 2021
     */
    int updateByPrimaryKey(UserPasswordDO record);
}