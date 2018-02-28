var config = {
  production: {
    database: {
      host: 'us-cdbr-iron-east-05.cleardb.net',
      name: 'heroku_832a9360454eb01',
      user: 'be24d62f197062',
      password: '6d6adcd1'
    },
    env: {
      ejwt: '4f9LuFZB8YgynuRJ',
      hpkp_sec: 'T~%#A&VAp6a86Mxj',
      hpkp_sec_bckp: 'p))T``GTWDCK(7km',
      cksson1: 'Ppe>Db<mZ4]&k86N',
      cksson2: '5LCd?tt8m>#-pTES',
      salt_pss: '10'
    }
  },
  default: {
    database: {
      host: '127.0.0.1',
      name: 'parkme',
      user: 'root',
      password: 'If01123581321*'
    },
    env: {
      ejwt: '4f9LuFZB8YgynuRJ',
      hpkp_sec: 'T~%#A&VAp6a86Mxj',
      hpkp_sec_bckp: 'p))T``GTWDCK(7km',
      cksson1: 'Ppe>Db<mZ4]&k86N',
      cksson2: '5LCd?tt8m>#-pTES',
      salt_pss: '10'
    }
  }
}

exports.get = function get(env) {
  return config[env] || config.default;
}
