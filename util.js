'use strict';

const _ = require('lodash');

module.exports = {
  // 根据配置构建路由 - [{path, method, target, middlewares }]
  buildRoute: (routeArr, router, controller) => {
    if (router && routeArr &&  routeArr.length && controller) {
      _.each(routeArr, (route) => {
        router[route.method](route.path,  route.middlewares || [], (req, res) => {
          return controller[route.target](req, res);
        });
      });
    }
  },

  // rest路由
  restRoute: (path, router, controller) => {
    path = path || '';
    router.get(path+'/', (req, res) => {
      controller.index(req, res);
    }).get(path+'/:id', (req, res) => {
      controller.show(req, res);
    }).post(path+'/', (req, res) => {
      controller.create(req, res);
    }).put(path+'/:id', (req, res) => {
      controller.update(req, res);
    }).delete(path+'/:id', (req, res) => {
      controller.destroy(req, res);
    });
  },

  // 是生产环境
  isProdEnv() {
    return process.env.NODE_ENV === 'production';
  },

  // 非生产环境
  isNotProdEnv() {
    return process.env.NODE_ENV !== 'production';
  },

  // 设置模型通用option
  addModelCommonOptions: (options) => {
    if (options) {
      options.freezeTableName = true;
      options.timestamps = true;
      options.paranoid = true;

      options.charset = options.charset || 'utf8';
      options.collate = options.collate || 'utf8_general_ci';

      options.defaultScope = options.defaultScope || {};
      options.defaultScope.attributes = options.defaultScope.attributes || {};
      options.defaultScope.attributes.exclude = options.defaultScope.attributes.exclude || [];
      options.defaultScope.attributes.exclude.push('deletedAt');
    }
    return options;
  }
};
