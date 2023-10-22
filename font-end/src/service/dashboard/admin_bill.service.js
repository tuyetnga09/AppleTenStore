import httpClient from "../../api/http-comons";

const config = {
  headers: {
    "Content-Type": "multipart/form-data",
  },
};
export const sumAllBill = () => {
  return httpClient.get(`/admin/bill/sum-all-bill`);
};
//sum bill chưa xác nhận
export const sumBillUnconfimred = () => {
  return httpClient.get(`/admin/bill/unconfimred`);
};

//sum bill đã xác nhận
export const sumBillConfirmed = () => {
  return httpClient.get(`/admin/bill/confimred`);
};

//sum bill đã thanh toán
export const sumBillAreDelivering = () => {
  return httpClient.get(`/admin/bill/are-delivering`);
};

//sum bill đã thanh toán
export const sumBillAlreadyPaid = () => {
  return httpClient.get(`/admin/bill/already-paid`);
};

//sum bill không trả hàng
export const sumBillNoReturn = () => {
  return httpClient.get(`/admin/bill/no-return`);
};

//sum bill  trả hàng
export const sumBillReturns = () => {
  return httpClient.get(`/admin/bill/returns`);
};

//sum bill  trả hàng
export const sumBillCancelOrder = () => {
  return httpClient.get(`/admin/bill/cancel-order`);
};

// money

//lấy ra số tổng tiền trong ngày
export const sumMoneyBill = () => {
  return httpClient.get(`/admin/bill/total-money`);
};

//lấy ra số tổng tiền trong ngày đã trừ đơn huỷ
export const sumMoneyBillNotStatusDaHuy = () => {
  return httpClient.get(`/admin/bill/total-money/not-da-huy`);
};
//sum bill chưa xác nhận
export const sumToTalMoneyBillUnconfimred = () => {
  return httpClient.get(`/admin/bill/total-money/unconfimred`);
};
//sum bill đã xác nhận
export const sumToTalMoneyBillConfirmed = () => {
  return httpClient.get(`/admin/bill/total-money/confimred`);
};

//sum bill đã thanh toán
export const sumToTalMoneyBillAreDelivering = () => {
  return httpClient.get(`/admin/bill/total-money/are-delivering`);
};

//sum bill đã thanh toán
export const sumToTalMoneyBillAlreadyPaid = () => {
  return httpClient.get(`/admin/bill/total-money/already-paid`);
};

//sum bill không trả hàng
export const sumToTalMoneyBillNoReturn = () => {
  return httpClient.get(`/admin/bill/total-money/no-return`);
};

//sum bill  trả hàng
export const sumToTalMoneyBillReturns = () => {
  return httpClient.get(`/admin/bill/total-money/returns`);
};

//sum bill  trả hàng
export const sumToTalMoneyBillCancelOrder = () => {
  return httpClient.get(`/admin/bill/total-money/cancel-order`);
};

//page bill status "CHO_VAN_CHUYEN"
export const viewAllBillsForTheDayWhereStatusChoVanChuyen = (page) => {
  return httpClient.get(`/admin/bill/display?${page}`);
};

//list 8 sp được bán nhiều nhất trong 30 ngày vừa qua lấy ra theo SKU
export const monthlyTrendingMenus = () => {
  return httpClient.get(`/admin/bill/product/monthly-trending`);
};

//doanh thu năm 2023 - "DA_THANH_TOAN"
export const revenue = () => {
  return httpClient.get(`/admin/bill/revenue-year`);
};

//count khách hàng đặt hàng hôm nay
export const countCustomersOrderToday = () => {
  return httpClient.get(`/admin/bill/customer/unconfimred`);
};
//    //số khác hàng đã huỷ đơn hôm nay
export const countCustomersCanceledToday = () => {
  return httpClient.get(`/admin/bill/customer/cancel-order`);
};
//    //số khách hàng đã thanh toán hôm nay
export const countCustomersPaidToday = () => {
  return httpClient.get(`/admin/bill/customer/already-paid`);
};

//    // số khách hàng trả đơn trong hôm nay

export const countCustomersReturnedToday = () => {
  return httpClient.get(`/admin/bill/customer/returns`);
};
