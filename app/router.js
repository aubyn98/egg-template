'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.all('/', controller.index.index);
  router.all('/wechat', controller.index.wechat);
  router.get('/user', controller.record.user.index);
  router.get('/user/add', controller.record.user.add);
  router.get('/user/update', controller.record.user.update);
  router.get('/user/delete', controller.record.user.delete);

  router.get('/customer', controller.record.customer.index);
  router.get('/customer/add', controller.record.customer.add);
  router.get('/customer/update', controller.record.customer.update);
  router.get('/customer/delete', controller.record.customer.delete);

  router.get('/consignee', controller.record.consignee.index);
  router.get('/consignee/add', controller.record.consignee.add);
  router.get('/consignee/update', controller.record.consignee.update);
  router.get('/consignee/delete', controller.record.consignee.delete);

  router.get('/car', controller.record.car.index);
  router.get('/car/add', controller.record.car.add);
  router.get('/car/update', controller.record.car.update);
  router.get('/car/delete', controller.record.car.delete);

  router.get('/unit', controller.record.unit.index);
  router.get('/unit/add', controller.record.unit.add);
  router.get('/unit/update', controller.record.unit.update);
  router.get('/unit/delete', controller.record.unit.delete);
};
