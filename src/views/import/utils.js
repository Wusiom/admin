/**
 * 导入数据对应表
 */
export const USER_RELATIONS = {
  姓名: 'username',
  联系方式: 'mobile',
  角色: 'role',
  开通时间: 'openTime'
}

/**
 * 解析 excel 导入的时间格式
 */
export const formatDate = (numb) => {
  // Excel的日期起始值是1900年1月1日，序列号为1
  const date = new Date((numb - 25569) * 86400 * 1000)
  // 25569 是 1970-01-01 到 1900-01-01 的天数差
  // 86400 是一天的秒数

  return date.toISOString().split('T')[0]
}
